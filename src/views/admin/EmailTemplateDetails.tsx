import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';

import {
  Button,
  FlexContainer,
  Heading,
  Input,
  Row,
  Column,
  LoadingPage,
  Modal,
} from '../../components';
import { RootState } from '../../redux/ducks';
import {
  createEmailTemplate,
  deleteEmailTemplate,
  getAllEmailTemplates,
  getEmailTemplateByName,
  updateEmailTemplate,
} from '../../redux/ducks/admin';
import { ActionResponseType } from '../../redux/constants';
import { addAlert } from '../../redux/ducks/globalAlerts';
import { requiredField } from '../../utils/validations';

type EmailTemplateDetailsProps = {
  name?: string;
} & RouteComponentProps;

const EmailTemplateDetails: FunctionComponent<EmailTemplateDetailsProps> = (props) => {
  const isLoading = useSelector((state: RootState) => state.admin.isLoading);
  const admin = useSelector((state: RootState) => state.admin);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (admin.emailTemplates.length === 0) {
      dispatch(getAllEmailTemplates());
    }
  }, []);

  useEffect(() => {
    if (props.name && props.name !== 'new') {
      dispatch(getEmailTemplateByName(props.name));
    }
  }, []);

  const newEmailTemplateInitialValues = {
    name: '',
    subject: '',
    bodyHtml: '',
    bodyText: '',
  };

  const isNewEmailTemplate = props.name === 'new';

  if (!props.name || !admin.emailTemplates) {
    return null;
  }

  return (
    <>
      <FlexContainer justifyContent="space-between">
        <Heading>{isNewEmailTemplate ? 'Add New' : 'Edit'} Email Template</Heading>
        <Button type="link" to="/admin/email-templates" iconLeft={<FaCaretLeft />} color="text">
          Back to All Email Templates
        </Button>
      </FlexContainer>
      {!isLoading ? (
        <>
          <Formik
            validateOnMount
            initialValues={
              isNewEmailTemplate
                ? newEmailTemplateInitialValues
                : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  admin.activeEmailTemplate!
            }
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                isNewEmailTemplate ? createEmailTemplate(values) : updateEmailTemplate(values)
              ).then((response: ActionResponseType) => {
                if (response && !response.error) {
                  dispatch(
                    addAlert({
                      message: `Successfully ${isNewEmailTemplate ? 'added' : 'edited'} ${
                        values.name
                      }`,
                      type: 'success',
                    })
                  );
                  setSubmitting(false);
                  navigate('/admin/email-templates');
                }
              });
            }}
          >
            {({ isValid, isSubmitting }) => (
              <Form>
                <Field
                  as={Input}
                  name="name"
                  type="text"
                  label="Email Template Name"
                  validate={requiredField}
                  required
                />

                <Field
                  as={Input}
                  name="subject"
                  type="text"
                  label="Subject"
                  validate={requiredField}
                  required
                />

                <Field
                  as={Input}
                  name="bodyHtml"
                  type="textarea"
                  label="Body HTML"
                  validate={requiredField}
                  required
                />

                <Field
                  as={Input}
                  name="bodyText"
                  type="textarea"
                  label="Body Text"
                  validate={requiredField}
                  required
                />

                <FlexContainer justifyContent="space-between">
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    isLoading={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? 'Submitting' : 'Submit'}
                  </Button>
                  {!isNewEmailTemplate && (
                    <Button
                      type="button"
                      color="dangerOutline"
                      disabled={isNewEmailTemplate}
                      rightspacer
                      onClick={() => setModalIsOpen(true)}
                    >
                      Delete
                    </Button>
                  )}
                </FlexContainer>
              </Form>
            )}
          </Formik>
          {admin.activeEmailTemplate && (
            <Modal toggleModal={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
              <Heading styledAs="title">Delete {admin.activeEmailTemplate.name}?</Heading>
              <p>Are you sure you want to delete {admin.activeEmailTemplate.name}?</p>
              <Row>
                <Column xs={6}>
                  <Button
                    type="button"
                    onClick={() => setModalIsOpen(false)}
                    color="primaryOutline"
                    block
                  >
                    Cancel
                  </Button>
                </Column>
                <Column xs={6}>
                  <Button
                    type="button"
                    onClick={async () => {
                      if (!isNewEmailTemplate && admin.activeEmailTemplate) {
                        await dispatch(deleteEmailTemplate(admin.activeEmailTemplate.name));
                        dispatch(
                          addAlert({
                            type: 'success',
                            message: `Successfully removed ${admin.activeEmailTemplate.name}`,
                          })
                        );
                        navigate('/admin/email-templates');
                      }
                    }}
                    block
                    color="danger"
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    Delete
                  </Button>
                </Column>
              </Row>
            </Modal>
          )}
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default EmailTemplateDetails;
