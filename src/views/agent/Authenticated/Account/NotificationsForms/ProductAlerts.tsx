/* eslint-disable dot-notation */
import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { isEqual } from 'lodash';

import { Row, Column, IconCheckbox, Heading, Box } from '../../../../../components';
import AutoSave from '../../../../../utils/autoSave';
import { UserStoreType } from '../../../../../redux/ducks/user.d';
import { updateUserNotificationSubscriptions } from '../../../../../redux/ducks/user';

type ProductAlertsProps = {
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

const ProductAlertsForm: FunctionComponent<ProductAlertsProps> = ({ user }) => {
  const dispatch = useDispatch();
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
      notificationId: item.id,
      notificationFrequency: 'realTime',
    };
  });

  return (
    <Box>
      <Heading as="h2">Product Alerts</Heading>
      {user.isLoading || !user.userNotificationSubscriptions.length ? (
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
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              Object.keys(values).forEach((key) => {
                if (!isEqual(initialValues[key], values[key])) {
                  dispatch(updateUserNotificationSubscriptions({ ...values[key] }));
                }
              });
              setSubmitting(false);
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
