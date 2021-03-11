/* eslint-disable dot-notation */
import React, { FunctionComponent, Fragment } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { isEqual } from 'lodash';
import Skeleton from 'react-loading-skeleton';

import {
  Row,
  Column,
  IconCheckbox,
  Input,
  Heading,
  Box,
  HorizontalRule,
} from '../../../../../components';
import AutoSave from '../../../../../utils/autoSave';
import { UserStoreType } from '../../../../../redux/ducks/user.d';
import { requiredSelect } from '../../../../../utils/validations';
import { updateUserNotificationSubscriptions } from '../../../../../redux/ducks/user';
import { ActionResponseType } from '../../../../../redux/constants';
import { addAlert } from '../../../../../redux/ducks/globalAlerts';

type ListingAlertsProps = {
  user: UserStoreType;
};

type InitialValuesType = {
  [key: string]: {
    sms: boolean;
    email: boolean;
    desktop: boolean;
    inAppPush: boolean;
    notificationId: number;
    notificationFrequency: 'realTime' | 'hourly' | 'oncePerDay';
  };
};

const ListingAlertsForm: FunctionComponent<ListingAlertsProps> = ({ user }) => {
  const dispatch = useDispatch();
  const listingAlerts = user.notificationTypes
    .filter((type) => type.type === 'listingAlerts')
    .sort((a, b) => a.id - b.id);

  const initialValues = {} as InitialValuesType;

  const notificationFrequencyOptions = [
    { value: 'realTime', label: 'Real Time' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'oncePerDay', label: 'Once per day' },
  ];

  if (
    !user.isLoading &&
    user.userNotificationSubscriptions.length &&
    user.notificationSettings.emailAddress
  ) {
    listingAlerts.forEach((item) => {
      initialValues[item.notificationName] = {
        email:
          user.userNotificationSubscriptions?.find((x) => x.notificationId === item.id)?.email ??
          false,
        sms:
          user.userNotificationSubscriptions?.find((x) => x.notificationId === item.id)?.sms ??
          false,
        desktop: true,
        inAppPush:
          user.userNotificationSubscriptions?.find((x) => x.notificationId === item.id)
            ?.inAppPush ?? false,
        notificationId: item.id,
        notificationFrequency:
          user.userNotificationSubscriptions?.find((x) => x.notificationId === item.id)
            ?.notificationFrequency ?? 'realTime',
      };
    });
  }

  return (
    <Box>
      <Heading as="h2">Listing Alerts</Heading>
      {user.isLoading ||
      !user.userNotificationSubscriptions.length ||
      !user.notificationSettings.emailAddress ? (
        <Skeleton count={5} />
      ) : (
        <>
          <Row>
            <Column xs={6}>
              <strong>Notify me when...</strong>
            </Column>
            <Column xs={3} md={1}>
              <strong>Email</strong>
            </Column>
            <Column xs={3} md={1}>
              <strong>SMS</strong>
            </Column>
          </Row>
          <HorizontalRule />
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              Object.keys(values).forEach((key) => {
                if (!isEqual(initialValues[key], values[key])) {
                  if (values[key].sms && !user.notificationSettings.phoneNumberConfirmed) {
                    dispatch(
                      addAlert({
                        type: 'danger',
                        message:
                          'You must first confirm your phone number before enabling SMS notifications',
                      })
                    );
                    setSubmitting(false);
                    resetForm();
                  } else {
                    dispatch(updateUserNotificationSubscriptions({ ...values[key] })).then(
                      (response: ActionResponseType) => {
                        if (response && !response.error) {
                          setSubmitting(false);
                          resetForm({ values });
                        }
                      }
                    );
                  }
                }
              });
            }}
          >
            {({ values, ...rest }) => (
              <Form>
                {initialValues &&
                  listingAlerts &&
                  listingAlerts.map((listingAlert) => (
                    <Fragment key={listingAlert.id}>
                      <Row>
                        <Column xs={6}>{listingAlert.description}</Column>
                        <Column xs={3} md={1}>
                          <Field
                            as={IconCheckbox}
                            icon="email"
                            checked={values[listingAlert.notificationName]?.email ?? false}
                            name={`${listingAlert.notificationName}.email`}
                          />
                        </Column>
                        <Column xs={3} md={1}>
                          <Field
                            as={IconCheckbox}
                            icon="sms"
                            checked={values[listingAlert.notificationName]?.sms ?? false}
                            name={`${listingAlert.notificationName}.sms`}
                          />
                        </Column>
                        {listingAlert.description === 'there are new listings in my sales area' && (
                          <Column md={3}>
                            <Field
                              as={Input}
                              type="select"
                              name={`${listingAlert.notificationName}.notificationFrequency`}
                              label=""
                              options={notificationFrequencyOptions}
                              validate={requiredSelect}
                              required
                              {...rest}
                            />
                          </Column>
                        )}
                      </Row>
                      <HorizontalRule />
                    </Fragment>
                  ))}
                <AutoSave />
              </Form>
            )}
          </Formik>
        </>
      )}
    </Box>
  );
};

export default ListingAlertsForm;
