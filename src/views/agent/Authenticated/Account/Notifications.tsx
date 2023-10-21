import React, { FunctionComponent, useEffect, useState } from 'react';
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
import {
  requiredEmail,
  requiredPhoneNumber,
  requiredConfirmationCode,
} from '../../../../utils/validations';
import { RootState } from '../../../../redux/ducks';
import {
  getUserNotificationSettings,
  getNotificationTypes,
  updateUserNotificationSettings,
  confirmDevice,
  getUserNotificationSubscriptions,
} from '../../../../redux/ducks/user';
import { NotificationSettingsType } from '../../../../redux/ducks/user.d';
import { brandSuccess } from '../../../../styles/color';
import { doubleSpacer } from '../../../../styles/size';
import { ActionResponseType } from '../../../../redux/constants';

import ListingAlerts from './NotificationsForms/ListingAlerts';
import AccountAlerts from './NotificationsForms/AccountAlerts';
import ProductAlerts from './NotificationsForms/ProductAlerts';
import trackEvent from '../../../../utils/analytics';

type AgentNotificationsProps = {} & RouteComponentProps;

const AgentNotifications: FunctionComponent<AgentNotificationsProps> = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);

  const settingsInitialValues = {
    enableNotifications: user.notificationSettings.enableNotifications,
    emailAddress: user.notificationSettings.emailAddress,
    emailConfirmed: user.notificationSettings.emailConfirmed,
    phoneNumber: user.notificationSettings.phoneNumber,
    phoneNumberConfirmed: user.notificationSettings.phoneNumberConfirmed,
    forceResendEmailCode: user.notificationSettings.forceResendEmailCode,
    forceResendPhoneCode: user.notificationSettings.forceResendPhoneCode,
    emailConfirmationCode: '',
    phoneNumberConfirmationCode: '',
    deviceType: '',
  } as {
    enableNotifications: boolean;
    emailAddress: string;
    emailConfirmed: boolean;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    forceResendPhoneCode: boolean;
    forceResendEmailCode: boolean;
    emailConfirmationCode: string;
    phoneNumberConfirmationCode: string;
    deviceType: string;
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

    trackEvent('Agent requested new email confirmation code', {});

    setEmailCodeSent(true);
    setTimeout(() => {
      setEmailCodeSent(false);
    }, 5000);
  };

  const resendPhoneNumberConfirmationCode = (values: NotificationSettingsType) => {
    dispatch(
      updateUserNotificationSettings({
        ...values,
        phoneNumberConfirmed: false,
        forceResendPhoneCode: true,
      })
    );

    trackEvent('Agent requested new phone confirmation code', values);

    setPhoneCodeSent(true);
    setTimeout(() => {
      setPhoneCodeSent(false);
    }, 5000);
  };

  return (
    <>
      <Seo title="Notifications" />
      <Heading>Notifications</Heading>
      <Box>
        <Heading as="h2">Contact Information</Heading>
        {user.isLoading || !user.notificationSettings.emailAddress ? (
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
            onSubmit={(values, { setSubmitting, resetForm }) => {
              if (settingsInitialValues.emailAddress !== values.emailAddress) {
                return resendEmailConfirmationCode(values);
              }
              if (settingsInitialValues.phoneNumber !== values.phoneNumber) {
                return resendPhoneNumberConfirmationCode(values);
              }
              if (values.emailConfirmationCode) {
                return dispatch(
                  confirmDevice({
                    confirmationCode: String(values.emailConfirmationCode),
                    deviceType: 'email',
                  })
                ).then(
                  (
                    response:
                      | ActionResponseType
                      | { error: boolean; payload: NotificationSettingsType }
                  ) => {
                    if (response && !response.error) {
                      trackEvent('Agent confirmed new email address', values);

                      setSubmitting(false);
                      resetForm({
                        values: { ...(response.payload as typeof settingsInitialValues) },
                      });
                    }
                  }
                );
              }
              if (values.phoneNumberConfirmationCode) {
                return dispatch(
                  confirmDevice({
                    confirmationCode: String(values.phoneNumberConfirmationCode),
                    deviceType: 'phone',
                  })
                ).then(
                  (
                    response:
                      | ActionResponseType
                      | { error: boolean; payload: NotificationSettingsType }
                  ) => {
                    if (response && !response.error) {
                      trackEvent('Agent confirmed new phone number', {});

                      setSubmitting(false);
                      resetForm({
                        values: { ...(response.payload as typeof settingsInitialValues) },
                      });
                    }
                  }
                );
              }
              if (!values.emailConfirmationCode && !values.phoneNumberConfirmationCode)
                return dispatch(updateUserNotificationSettings({ ...values })).then(
                  (
                    response:
                      | ActionResponseType
                      | { error: boolean; payload: NotificationSettingsType }
                  ) => {
                    if (response && !response.error) {
                      setSubmitting(false);
                      resetForm({ values });
                    }
                  }
                );
            }}
          >
            {({ values, isValid, isSubmitting, initialValues }) => (
              <Form>
                <Field
                  as={Input}
                  type="toggle"
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
                      required
                    />
                  </Column>
                  <Column xs={6} md={4}>
                    {settingsInitialValues.emailAddress &&
                      !settingsInitialValues.emailConfirmed && (
                        <Field
                          as={Input}
                          type="number"
                          name="emailConfirmationCode"
                          label="Confirmation Code"
                          validate={requiredConfirmationCode}
                          required
                        />
                      )}
                    {settingsInitialValues.emailAddress && settingsInitialValues.emailConfirmed && (
                      <FlexContainer justifyContent="start" height="100%">
                        <div style={{ color: brandSuccess }}>
                          <FaCheck />
                          &nbsp;Confirmed
                        </div>
                      </FlexContainer>
                    )}
                  </Column>
                  {!settingsInitialValues.emailConfirmed && settingsInitialValues.emailAddress && (
                    <Column md={4}>
                      <FlexContainer justifyContent="start" height="100%">
                        <p>
                          <small>
                            {emailCodeSent ? (
                              'Code sent'
                            ) : (
                              <>
                                Didn&apos;t receive a code?{' '}
                                <Button
                                  type="button"
                                  color="text"
                                  onClick={() => resendEmailConfirmationCode(values)}
                                  isLoading={user.isLoading}
                                >
                                  Resend one now
                                </Button>
                              </>
                            )}
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
                      required
                      placeholder="XXX-XXX-XXXX"
                    />
                  </Column>
                  <Column xs={6} md={4}>
                    {settingsInitialValues.phoneNumber &&
                      !settingsInitialValues.phoneNumberConfirmed && (
                        <Field
                          as={Input}
                          type="number"
                          name="phoneNumberConfirmationCode"
                          label="Confirmation Code"
                          validate={requiredConfirmationCode}
                          required
                        />
                      )}
                    {settingsInitialValues.phoneNumber &&
                      settingsInitialValues.phoneNumberConfirmed && (
                        <FlexContainer justifyContent="start" height="100%">
                          <div style={{ color: brandSuccess }}>
                            <FaCheck />
                            &nbsp;Confirmed
                          </div>
                        </FlexContainer>
                      )}
                  </Column>
                  {!settingsInitialValues.phoneNumberConfirmed &&
                    settingsInitialValues.phoneNumber && (
                      <Column md={4}>
                        <FlexContainer justifyContent="start" height="100%">
                          <small>
                            {phoneCodeSent ? (
                              'Code sent'
                            ) : (
                              <>
                                Didn&apos;t receive a code?{' '}
                                <Button
                                  type="button"
                                  color="text"
                                  onClick={() => resendPhoneNumberConfirmationCode(values)}
                                  isLoading={user.isLoading}
                                >
                                  Resend one now
                                </Button>
                              </>
                            )}
                          </small>
                        </FlexContainer>
                      </Column>
                    )}
                </Row>
                <Button
                  type="submit"
                  disabled={user.isLoading || !isValid || isSubmitting || initialValues === values}
                  isLoading={user.isLoading}
                >
                  Save
                </Button>
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
