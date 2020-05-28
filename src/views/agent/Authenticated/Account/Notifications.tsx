import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';

import {
  Seo,
  FlexContainer,
  Button,
  Row,
  Column,
  Heading,
  Box,
  Input,
} from '../../../../components';
import { requiredEmail, requiredPhoneNumber } from '../../../../utils/validations';
import AutoSave from '../../../../utils/autoSave';
import { RootState } from '../../../../redux/ducks';
import {
  getUserNotificationSettings,
  updateUserNotificationSettings,
  confirmDevice,
  getNotificationTypes,
  getUserNotificationSubscriptions,
} from '../../../../redux/ducks/user';
import { NotificationSettingsType } from '../../../../redux/ducks/user.d';
import { brandSuccess } from '../../../../styles/color';
import { doubleSpacer } from '../../../../styles/size';

import ListingAlerts from './NotificationsForms/ListingAlerts';
import AccountAlerts from './NotificationsForms/AccountAlerts';
import ProductAlerts from './NotificationsForms/ProductAlerts';

type AgentNotificationsProps = {} & RouteComponentProps;

const AgentNotifications: FunctionComponent<AgentNotificationsProps> = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const settingsInitialValues = {
    ...user.notificationSettings,
    emailConfirmationCode: '',
    phoneNumberConfirmationCode: '',
    deviceType: '',
  };

  useEffect(() => {
    dispatch(getUserNotificationSettings());
    dispatch(getNotificationTypes());
    dispatch(getUserNotificationSubscriptions());
  }, []);

  const resendEmailConfirmationCode = (values: NotificationSettingsType) => {
    dispatch(
      updateUserNotificationSettings({
        ...values,
        emailConfirmed: false,
        forceResendEmailCode: true,
      })
    );
  };

  const resendPhoneNumberConfirmationCode = (values: NotificationSettingsType) => {
    dispatch(
      updateUserNotificationSettings({
        ...values,
        phoneNumberConfirmed: false,
        forceResendPhoneCode: true,
      })
    );
  };

  return (
    <>
      <Seo title="Notifications" />
      <Heading>Notifications</Heading>
      <Box>
        <Heading as="h2">Contact Information</Heading>
        {user.isLoading ? (
          <>
            <Skeleton height={doubleSpacer} />
            <br />
            <br />
            <Skeleton count={5} />
          </>
        ) : (
          <Formik
            validateOnMount
            initialValues={settingsInitialValues}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              if (values.emailConfirmationCode) {
                dispatch(
                  confirmDevice({
                    confirmationCode: String(values.emailConfirmationCode),
                    deviceType: 'email',
                  })
                );
              }
              if (values.phoneNumberConfirmationCode) {
                dispatch(
                  confirmDevice({
                    confirmationCode: String(values.phoneNumberConfirmationCode),
                    deviceType: 'phone',
                  })
                );
              }
              if (!values.emailConfirmationCode && !values.phoneNumberConfirmationCode)
                dispatch(updateUserNotificationSettings({ ...values }));
            }}
          >
            {({ values }) => (
              <Form>
                <Field
                  as={Input}
                  type="checkbox"
                  checked={values.enableNotifications}
                  name="enableNotifications"
                  label="Receive Notifications"
                />
                <Row>
                  <Column xs={6} md={4}>
                    <Field
                      as={Input}
                      type="text"
                      name="emailAddress"
                      label="Email Address"
                      validate={requiredEmail}
                    />
                  </Column>
                  <Column xs={6} md={4}>
                    {!values.emailConfirmed ? (
                      <Field
                        as={Input}
                        type="number"
                        name="emailConfirmationCode"
                        label="Confirmation Code"
                      />
                    ) : (
                      <FlexContainer justifyContent="start" height="100%">
                        <div style={{ color: brandSuccess }}>
                          <FaCheck />
                          &nbsp;Confirmed
                        </div>
                      </FlexContainer>
                    )}
                  </Column>
                  {!values.emailConfirmed && (
                    <Column md={4}>
                      <FlexContainer justifyContent="start" height="100%">
                        <p>
                          <small>
                            Didn&apos;t receive a code?{' '}
                            <Button
                              type="button"
                              color="text"
                              onClick={() => resendEmailConfirmationCode(values)}
                            >
                              Resend one now
                            </Button>
                          </small>
                        </p>
                      </FlexContainer>
                    </Column>
                  )}
                </Row>
                <Row>
                  <Column xs={6} md={4}>
                    <Field
                      as={Input}
                      type="tel"
                      name="phoneNumber"
                      label="Phone Number"
                      validate={requiredPhoneNumber}
                    />
                  </Column>
                  <Column xs={6} md={4}>
                    {!values.phoneNumberConfirmed ? (
                      <Field
                        as={Input}
                        type="number"
                        name="phoneNumberConfirmationCode"
                        label="Confirmation Code"
                      />
                    ) : (
                      <FlexContainer justifyContent="start" height="100%">
                        <div style={{ color: brandSuccess }}>
                          <FaCheck />
                          &nbsp;Confirmed
                        </div>
                      </FlexContainer>
                    )}
                  </Column>
                  {!values.phoneNumberConfirmed && (
                    <Column md={4}>
                      <FlexContainer justifyContent="start" height="100%">
                        <small>
                          Didn&apos;t receive a code?{' '}
                          <Button
                            type="button"
                            color="text"
                            onClick={() => resendPhoneNumberConfirmationCode(values)}
                          >
                            Resend one now
                          </Button>
                        </small>
                      </FlexContainer>
                    </Column>
                  )}
                </Row>

                <AutoSave />
              </Form>
            )}
          </Formik>
        )}
      </Box>
      <ListingAlerts user={user} />
      <AccountAlerts user={user} />
      <ProductAlerts user={user} />
    </>
  );
};

export default AgentNotifications;
