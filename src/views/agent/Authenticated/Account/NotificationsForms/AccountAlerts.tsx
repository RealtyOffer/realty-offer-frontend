/* eslint-disable dot-notation */
import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { isEqual } from 'lodash';

import { Row, Column, IconCheckbox, Heading, Box, HorizontalRule } from '../../../../../components';
import AutoSave from '../../../../../utils/autoSave';
import { UserStoreType } from '../../../../../redux/ducks/user.d';
import { updateUserNotificationSubscriptions } from '../../../../../redux/ducks/user';
import { ActionResponseType } from '../../../../../redux/constants';

type AccountAlertsProps = {
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

const AccountAlertsForm: FunctionComponent<AccountAlertsProps> = ({ user }) => {
  const dispatch = useDispatch();
  const accountAlerts = user.notificationTypes
    .filter((type) => type.type === 'myAccount')
    .sort((a, b) => a.id - b.id);

  const initialValues = {} as InitialValuesType;

  if (
    !user.isLoading &&
    user.userNotificationSubscriptions.length &&
    user.notificationSettings.emailAddress
  ) {
    accountAlerts.forEach((item) => {
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
      <Heading as="h2">Account Alerts</Heading>
      {user.isLoading ||
      !user.userNotificationSubscriptions.length ||
      !user.notificationSettings.emailAddress ? (
        <Skeleton count={5} />
      ) : (
        <>
          <Row>
            <Column md={6}>
              <strong>Notify me when...</strong>
            </Column>
            <Column md={1}>
              <strong>Email</strong>
            </Column>
            <Column md={1}>
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
                  dispatch(updateUserNotificationSubscriptions({ ...values[key] })).then(
                    (response: ActionResponseType) => {
                      if (response && !response.error) {
                        setSubmitting(false);
                        resetForm({ values });
                      }
                    }
                  );
                }
              });
            }}
          >
            {({ values }) => (
              <Form>
                {initialValues &&
                  accountAlerts &&
                  accountAlerts.map((accountAlert) => (
                    <Row key={accountAlert.id}>
                      <Column md={6}>{accountAlert.description}</Column>
                      <Column md={1}>
                        <Field
                          as={IconCheckbox}
                          icon="email"
                          checked={values[accountAlert.notificationName]?.email ?? false}
                          name={`${accountAlert.notificationName}.email`}
                        />
                      </Column>
                      <Column md={1}>
                        <Field
                          as={IconCheckbox}
                          icon="sms"
                          checked={values[accountAlert.notificationName]?.sms ?? false}
                          name={`${accountAlert.notificationName}.sms`}
                        />
                      </Column>
                    </Row>
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

export default AccountAlertsForm;
