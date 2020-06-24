/* eslint-disable dot-notation */
import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import { RouteComponentProps } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { Row, Column, IconCheckbox, Box } from '../../../components';
import AutoSave from '../../../utils/autoSave';
import { RootState } from '../../../redux/ducks';

type ConsumerNotificationsProps = {} & RouteComponentProps;

type InitialValuesType = {
  [key: string]: {
    sms: boolean;
    email: boolean;
    desktop: boolean;
    inAppPush: boolean;
    id: number;
    notificationFrequency: string;
  };
};

const ConsumerNotifications: FunctionComponent<ConsumerNotificationsProps> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const accountAlerts = user.notificationTypes
    .filter((type) => type.type === 'myAccount')
    .sort((a, b) => a.id - b.id);

  const initialValues = {} as InitialValuesType;

  accountAlerts.forEach((item) => {
    initialValues[item.notificationName] = {
      email:
        user.userNotificationSubscriptions?.find((x) => x.notificationId === item.id)?.email ??
        false,
      sms:
        user.userNotificationSubscriptions?.find((x) => x.notificationId === item.id)?.sms ?? false,
      desktop: true,
      inAppPush:
        user.userNotificationSubscriptions?.find((x) => x.notificationId === item.id)?.inAppPush ??
        false,
      id: item.id,
      notificationFrequency: '',
    };
  });

  return (
    <Box>
      {user.isLoading ? (
        <Skeleton count={5} />
      ) : (
        <>
          <Row>
            <Column md={6}>
              <strong>Notify me when...</strong>
            </Column>
            <Column md={1}>
              <strong>Push</strong>
            </Column>
            <Column md={1}>
              <strong>Email</strong>
            </Column>
            <Column md={1}>
              <strong>SMS</strong>
            </Column>
          </Row>
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              // dispatch(updateUserNotificationSettings({ ...values }));
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
                          icon="desktop"
                          checked={values[accountAlert.notificationName]?.desktop ?? false}
                          name={`${accountAlert.notificationName}.desktop`}
                        />
                      </Column>
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

export default ConsumerNotifications;
