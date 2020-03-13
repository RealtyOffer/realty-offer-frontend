import React, { FunctionComponent } from 'react';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from '@reach/router';

import {
  Button,
  FlexContainer,
  Heading,
  Row,
  Column,
  Seo,
  Input,
  Row,
  Card,
  Column,
  HorizontalRule,
} from '../../../components';

import {
  requiredEmail,
  requiredField,
  requiredPhoneNumber,
  requiredPassword,
  passwordRulesString,
} from '../../../utils/validations';
import { createUser, CreateUserFormValues } from '../../../redux/ducks/auth';
import { ActionResponseType } from '../../../redux/constants';
import { captureConsumerData } from '../../../redux/ducks/consumer';

type CreateConsumerProps = {
  actions: {
    createUser: Function;
    captureConsumerData: Function;
  }
} & RouteComponentProps

const CreateConsumer: FunctionComponent<CreateConsumerProps> = (props) => {
  const initialValues: CreateUserFormValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  };

  const reformattedPhone = (num: string) => `+${num.replace(/-/g, '')}`;

const CreateConsumer: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="Ready to buy or sell a home?" />
    <Row>
      <Column md={6} mdOffset={3}>
        <div>
          <Box backgroundAccent>
            <FlexContainer flexDirection="column">
              <Heading align="center" styledAs="title">Ready to buy or sell a home?</Heading>
              <Heading as="h2" align="center" styledAs="subtitle">No contracts, no obligation, no awkward negotiations</Heading>
            </FlexContainer>
            <Box>
              <Heading as="h3" styledAs="subtitle">Sell My Home</Heading>
              <p>
                Within 24 hours, multiple agents will offer less than commission to sell your home,
                in order to win your business!
              </p>
              <Button
                type="link"
                to="/sell"
                block
                iconRight={<FaChevronRight />}
              >
                Sell Your Home
              </Button>
            </Box>
            <Box>
              <Heading as="h3" styledAs="subtitle">Buy A Home</Heading>
              <p>
                Within 24 hours, multiple agents will offer part of their commission in order to pay
                for your closing costs, in order to win your business!
              </p>
              <Button
                type="link"
                to="/sell"
                block
                iconRight={<FaChevronRight />}
              >
                Buy A Home
              </Button>
            </Box>
            <Box>
              <Heading as="h3" styledAs="subtitle">Buy &amp; Sell A Home</Heading>
              <p>
                Within 24 hours, multiple agents will offer less commission to sell your home,
                or part of their commission to find you a home!
              </p>
              <Button
                type="link"
                to="/sell"
                block
                iconRight={<FaChevronRight />}
              >
                Buy &amp; Sell A Home
              </Button>
            </Box>
          </Box>
        </div>
      </Column>
    </Row>
  </>
);
  return (
    <Card
      cardTitle="Create Account"
      cardSubtitle="Tell Us About Yourself"
    >
      <>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            props.actions.captureConsumerData(values);
            props.actions.createUser({
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
                as={Input}
                name="password"
                type="password"
                label="Password"
                helpText={passwordRulesString}
                validate={requiredPassword}
              />
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
    actions: bindActionCreators({ createUser, captureConsumerData }, dispatch),
  }),
)(CreateConsumer);
