import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';
import format from 'date-fns/format';

import { Button, FlexContainer, Heading, Input, Row, Column } from '../../components';
import { RootState } from '../../redux/ducks';
import { createSiteBanner, updateSiteBanner } from '../../redux/ducks/admin';
import { BannerType } from '../../redux/ducks/admin.d';
import { ActionResponseType } from '../../redux/constants';
import { addAlert } from '../../redux/ducks/globalAlerts';
import { requiredField, requiredSelect } from '../../utils/validations';

type BannerDetailsProps = {
  id?: string;
} & RouteComponentProps;

const BannerDetails: FunctionComponent<BannerDetailsProps> = (props) => {
  const banners = useSelector((state: RootState) => state.admin.banners);
  const isLoading = useSelector((state: RootState) => state.admin.isLoading);
  const dispatch = useDispatch();

  const stylingOptions = [
    { value: 'success', label: 'success' },
    { value: 'info', label: 'info' },
    { value: 'danger', label: 'danger' },
  ];

  const dismissableOptions = [
    { value: true, label: 'true' },
    { value: false, label: 'false' },
  ];

  const audienceOptions = [
    { value: 'agent', label: 'agent' },
    { value: 'consumer', label: 'consumer' },
    { value: 'both', label: 'both' },
  ];

  const newBannerInitialValues: BannerType = {
    message: '',
    callToActionLink: '',
    callToActionLinkText: '',
    styling: 'info',
    dismissable: false,
    expirationDate: String(format(new Date(), `yyyy-MM-dd'T'HH:mm`)),
    audience: 'agent',
    id: 0,
  };

  const isNewBanner = props.id === 'new';
  const matchingBanner =
    (banners && banners.find((b) => b.id === Number(props.id))) || newBannerInitialValues;

  const activeBanner = isNewBanner
    ? newBannerInitialValues
    : {
        ...matchingBanner,
        expirationDate: String(
          format(new Date(matchingBanner.expirationDate), `yyyy-MM-dd'T'HH:mm`)
        ),
      };

  if (!props.id || !banners || !activeBanner) {
    return null;
  }

  return (
    <>
      <FlexContainer justifyContent="space-between">
        <Heading>{isNewBanner ? 'Add New' : 'Edit'} Banner</Heading>
        <Button type="link" to="/admin/banners" iconLeft={<FaCaretLeft />} color="text">
          Back to All Banners
        </Button>
      </FlexContainer>
      <Formik
        validateOnMount
        initialValues={{ ...activeBanner }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(isNewBanner ? createSiteBanner(values) : updateSiteBanner(values))
            .then((response: ActionResponseType) => {
              if (response && !response.error) {
                dispatch(
                  addAlert({
                    message: `Successfully ${isNewBanner ? 'added' : 'edited'} site banner`,
                    type: 'success',
                  })
                );
                navigate('/admin/banners');
              }
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isValid, isSubmitting, ...rest }) => (
          <Form>
            <Row>
              <Column md={4}>
                <Field
                  as={Input}
                  name="message"
                  type="text"
                  label="Message"
                  validate={requiredField}
                  required
                />
              </Column>
              <Column md={4}>
                <Field
                  as={Input}
                  name="callToActionLink"
                  type="text"
                  label="CTA Link"
                  validate={requiredField}
                  required
                />
              </Column>
              <Column md={4}>
                <Field
                  as={Input}
                  name="callToActionLinkText"
                  type="text"
                  label="CTA Text"
                  validate={requiredField}
                  required
                />
              </Column>
              <Column md={3}>
                <Field
                  as={Input}
                  name="styling"
                  type="select"
                  options={stylingOptions}
                  label="Type"
                  validate={requiredSelect}
                  required
                  {...rest}
                />
              </Column>
              <Column md={3}>
                <Field
                  as={Input}
                  name="dismissable"
                  type="select"
                  options={dismissableOptions}
                  validate={requiredSelect}
                  required
                  label="Dismissable"
                  {...rest}
                />
              </Column>
              <Column md={3}>
                <Field
                  as={Input}
                  name="expirationDate"
                  type="datetime-local"
                  label="Expiration Date"
                  validate={requiredField}
                  required
                />
              </Column>
              <Column md={3}>
                <Field
                  as={Input}
                  name="audience"
                  type="select"
                  options={audienceOptions}
                  label="Audience"
                  {...rest}
                  validate={requiredSelect}
                  required
                />
              </Column>
            </Row>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              isLoading={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? 'Submitting' : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BannerDetails;
