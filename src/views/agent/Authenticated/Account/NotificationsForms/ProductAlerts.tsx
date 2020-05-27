/* eslint-disable dot-notation */
import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
// import { useDispatch } from 'react-redux';

import { Row, Column, IconCheckbox, Heading, Box } from '../../../../../components';
import AutoSave from '../../../../../utils/autoSave';
import { UserStoreType } from '../../../../../redux/ducks/user.d';

type ProductAlertsProps = {
  user: UserStoreType;
};

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

const ProductAlertsForm: FunctionComponent<ProductAlertsProps> = ({ user }) => {
  // const dispatch = useDispatch();
  const productAlerts = user.notificationTypes
    .filter((type) => type.type === 'productUpdates')
    .sort((a, b) => a.id - b.id);

  const initialValues = {} as InitialValuesType;

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
      id: item.id,
      notificationFrequency: '',
    };
  });

  return (
    <Box>
      {user.isLoading ? (
        'Loading'
      ) : (
        <>
          <Heading as="h2">Product Alerts</Heading>
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
                  productAlerts &&
                  productAlerts.map((productAlert) => (
                    <Row key={productAlert.id}>
                      <Column md={6}>{productAlert.description}</Column>
                      <Column md={1}>
                        <Field
                          as={IconCheckbox}
                          icon="desktop"
                          checked={values[productAlert.notificationName]?.desktop ?? false}
                          name={`${productAlert.notificationName}.desktop`}
                        />
                      </Column>
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
  );
};

export default ProductAlertsForm;
