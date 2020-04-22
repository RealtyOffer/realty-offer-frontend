import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';

import { Button, FlexContainer, Heading, Input, Row, Column } from '../../components';
import { RootState } from '../../redux/ducks';
import { createCity, updateCity } from '../../redux/ducks/admin';
import { ActionResponseType } from '../../redux/constants';
import { addAlert } from '../../redux/ducks/globalAlerts';
import { requiredField, requiredSelect, requiredDollarAmount } from '../../utils/validations';
import statesList from '../../utils/statesList';

type CityDetailsProps = {
  id?: string;
} & RouteComponentProps;

const CityDetails: FunctionComponent<CityDetailsProps> = (props) => {
  const cities = useSelector((state: RootState) => state.admin.cities);
  const dispatch = useDispatch();

  const newCityInitialValues = {
    name: '',
    state: 'MI',
    monthlyPrice: 0,
    id: 0,
  };

  const isNewCity = props.id === 'new';
  const matchingCity =
    (cities && cities.find((c) => c.id === Number(props.id))) || newCityInitialValues;

  const activeCity = isNewCity ? newCityInitialValues : { ...matchingCity };

  if (!props.id || !cities || !activeCity) {
    return null;
  }

  return (
    <>
      <FlexContainer justifyContent="space-between">
        <Heading>{isNewCity ? 'Add New' : 'Edit'} City</Heading>
        <Button type="link" to="/admin/cities" iconLeft={<FaCaretLeft />} color="text">
          Back to All Cities
        </Button>
      </FlexContainer>
      <Formik
        validateOnMount
        initialValues={{ ...activeCity }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(isNewCity ? createCity(values) : updateCity(values)).then(
            (response: ActionResponseType) => {
              if (response && !response.error) {
                dispatch(
                  addAlert({
                    message: `Successfully ${isNewCity ? 'added' : 'edited'} city`,
                    type: 'success',
                  })
                );
                setSubmitting(false);
                navigate('/admin/cities');
              }
            }
          );
        }}
      >
        {({ isValid, isSubmitting, ...rest }) => (
          <Form>
            <Row>
              <Column md={4}>
                <Field
                  as={Input}
                  name="name"
                  type="text"
                  label="City Name"
                  validate={requiredField}
                />
              </Column>
              <Column md={4}>
                <Field
                  as={Input}
                  name="state"
                  type="select"
                  options={statesList}
                  label="State"
                  disabled
                  validate={requiredSelect}
                  {...rest}
                />
              </Column>
              <Column md={4}>
                <Field
                  as={Input}
                  name="monthlyPrice"
                  type="number"
                  label="Monthly Price"
                  validate={requiredDollarAmount}
                />
              </Column>
            </Row>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CityDetails;
