import React, { FunctionComponent } from 'react';
import {
  Formik, Field, Form, FormikProps, FieldProps, FieldMetaProps, FormikFormProps,
} from 'formik';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from '@reach/router';

import {
  Button,
  Input,
  Row,
  Column,
  HorizontalRule,
  Card,
} from '../../../components';
import {
  requiredEmail,
  requiredField,
  requiredPhoneNumber,
  requiredPassword,
  passwordRulesString,
} from '../../../utils/validations';
import { createAgent } from '../../../redux/ducks/auth';
import { ActionResponseType } from '../../../redux/constants';

export interface CreateAgentFormValues {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  password: string
}

type Props = {
  actions: {
    createAgent: Function;
  }
} & RouteComponentProps

const CreateAgent: FunctionComponent<Props> = (props) => {
  const initialValues: CreateAgentFormValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  };

  const reformattedPhone = (num: string) => `+${num.replace(/-/g, '')}`;

  return (
    <Card
      cardTitle='Sign Up!'
      cardSubtitle='Tell Us About Yourself'
    >
      <>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            props.actions.createAgent({
              ...values,
              phoneNumber: reformattedPhone(values.phoneNumber),
            }).then((response: ActionResponseType) => {
              setSubmitting(false);
              if (response && !response.error) {
                navigate('/agent/verify-email');
              }
            });
          }}
        >
          {(formikProps: FormikProps<any>) => (
            <Form>
              <Row>
                <Column xs={6}>
                  <Field
                    as={Input}
                    type="text"
                    name="firstName"
                    label="First Name"
                    validate={requiredField}
                  />
                </Column>
                <Column xs={6}>
                  <Field
                    as={Input}
                    type="text"
                    name="lastName"
                    label="Last Name"
                    validate={requiredField}
                  />
                </Column>
              </Row>
              <Field
                as={Input}
                type="tel"
                name="phoneNumber"
                label="Phone Number"
                validate={requiredPhoneNumber}
              />
              <Field
                as={Input}
                type="email"
                name="email"
                label="Email Address"
                validate={requiredEmail}
              />
              <Field
                name="password"
                validate={requiredPassword}
              >
                {({
                  field, form, meta,
                }:{
                  field: FieldProps, form: FormikFormProps, meta: FieldMetaProps<any>,
                }) => (
                  <Input
                    type="password"
                    label="Password"
                    name="password"
                    helpText={passwordRulesString}
                    {...field}
                    {...form}
                    {...meta}
                  />
                )}
              </Field>
              <HorizontalRule />
              <Button type="submit" disabled={formikProps.isSubmitting || !formikProps.isValid} block>
                Create Account
              </Button>
            </Form>
          )}
        </Formik>
        <Button type="link" to="/" color="text" block>
          Cancel
        </Button>
      </>
    </Card>
  );
};

export default connect(
  null,
  (dispatch) => ({
    actions: bindActionCreators({ createAgent }, dispatch),
  }),
)(CreateAgent);
