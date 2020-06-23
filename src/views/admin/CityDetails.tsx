import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';

import { Button, FlexContainer, Heading, Input, Row, Column, LoadingPage } from '../../components';
import { RootState } from '../../redux/ducks';
import { createCity, updateCity } from '../../redux/ducks/admin';
import { ActionResponseType } from '../../redux/constants';
import { addAlert } from '../../redux/ducks/globalAlerts';
import { getStatesList } from '../../redux/ducks/dropdowns';
import { requiredField, requiredSelect, requiredDollarAmount } from '../../utils/validations';
import { createOptionsFromManagedDropdownList } from '../../utils/createOptionsFromArray';

type CityDetailsProps = {
  id?: string;
} & RouteComponentProps;

const CityDetails: FunctionComponent<CityDetailsProps> = (props) => {
  const cities = useSelector((state: RootState) => state.admin.cities);
  const statesList = useSelector((state: RootState) => state.dropdowns.states.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (statesList.length === 0) {
      dispatch(getStatesList());
    }
  }, []);

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
      {statesList.length > 0 ? (
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
                    required
                  />
                </Column>
                <Column md={4}>
                  <Field
                    as={Input}
                    name="state"
                    type="select"
                    options={createOptionsFromManagedDropdownList(statesList)}
                    label="State"
                    disabled
                    validate={requiredSelect}
                    required
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
                    required
                  />
                </Column>
              </Row>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default CityDetails;
