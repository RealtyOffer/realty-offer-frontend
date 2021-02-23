/* eslint-disable dot-notation */
import React, { FunctionComponent, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { RouteComponentProps } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { isEqual } from 'lodash';
import { FaCheck } from 'react-icons/fa';

import {
  Row,
  Column,
  Input,
  IconCheckbox,
  Box,
  Seo,
  Heading,
  HorizontalRule,
  FlexContainer,
  Button,
} from '../../../components';
import AutoSave from '../../../utils/autoSave';
import {
  requiredEmail,
  requiredPhoneNumber,
  requiredConfirmationCode,
} from '../../../utils/validations';
import { RootState } from '../../../redux/ducks';
import {
  updateUserNotificationSubscriptions,
  updateUserNotificationSettings,
  confirmDevice,
} from '../../../redux/ducks/user';
import { NotificationSettingsType } from '../../../redux/ducks/user.d';
import { brandSuccess } from '../../../styles/color';
import { doubleSpacer } from '../../../styles/size';
import { ActionResponseType } from '../../../redux/constants';

type ConsumerNotificationsProps = {} & RouteComponentProps;

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

const ConsumerNotifications: FunctionComponent<ConsumerNotificationsProps> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);

  const consumerAlerts = user.notificationTypes
    .filter((type) => type.type === 'consumerAlerts')
    .sort((a, b) => a.id - b.id);
  const productAlerts = user.notificationTypes
    .filter((type) => type.type === 'productUpdates')
    .sort((a, b) => a.id - b.id);

  const initialValues = {} as InitialValuesType;

  consumerAlerts.forEach((item) => {
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
      notificationId: item.id,
      notificationFrequency: 'realTime',
    };
  });

  productAlerts.forEach((item) => {
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
      notificationId: item.id,
      notificationFrequency: 'realTime',
    };
  });

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

  const resendEmailConfirmationCode = (values: NotificationSettingsType) => {
    dispatch(
      updateUserNotificationSettings({
        ...values,
        emailConfirmed: false,
        forceResendEmailCode: true,
      })
    );
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
    setPhoneCodeSent(true);
    setTimeout(() => {
      setPhoneCodeSent(false);
    }, 5000);
  };

  return (
    <>
      <Seo title="My Notification Preferences" />
      <Heading as="h2">My Notification Preferences</Heading>
      <Box>
        <Heading as="h2">Contact Information</Heading>
        {user.isLoading || !user.notificationSettings.emailConfirmed ? (
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
                      setSubmitting(false);
                      resetForm({
                        values: { ...(response.payload as NotificationSettingsType) },
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
                      | { error: boolean; payload: { response: NotificationSettingsType } }
                  ) => {
                    if (response && !response.error) {
                      setSubmitting(false);
                      resetForm({
                        values: { ...(response.payload.response as NotificationSettingsType) },
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
            {({ values }) => (
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

                <AutoSave />
              </Form>
            )}
          </Formik>
        )}
      </Box>
      <Box>
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
                    consumerAlerts &&
                    consumerAlerts.map((consumerAlert) => (
                      <Row key={consumerAlert.id}>
                        <Column md={6}>{consumerAlert.description}</Column>
                        <Column md={1}>
                          <Field
                            as={IconCheckbox}
                            icon="email"
                            checked={values[consumerAlert.notificationName]?.email ?? false}
                            name={`${consumerAlert.notificationName}.email`}
                          />
                        </Column>
                        <Column md={1}>
                          <Field
                            as={IconCheckbox}
                            icon="sms"
                            checked={values[consumerAlert.notificationName]?.sms ?? false}
                            name={`${consumerAlert.notificationName}.sms`}
                          />
                        </Column>
                      </Row>
                    ))}
                  {initialValues &&
                    productAlerts &&
                    productAlerts.map((productAlert) => (
                      <Row key={productAlert.id}>
                        <Column md={6}>{productAlert.description}</Column>
                        <Column md={1}>
                          <Field
                            as={IconCheckbox}
                            icon="email"
                            checked={values[productAlert.notificationName]?.email ?? false}
                            name={`${productAlert.notificationName}.email`}
                          />
                        </Column>
                        <Column md={1}>
                          <Field
                            as={IconCheckbox}
                            icon="sms"
                            checked={values[productAlert.notificationName]?.sms ?? false}
                            name={`${productAlert.notificationName}.sms`}
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
    </>
  );
};

export default ConsumerNotifications;
