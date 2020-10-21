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
import { createCity, deleteCityById, updateCity, getAllCounties } from '../../redux/ducks/admin';
import { ActionResponseType } from '../../redux/constants';
import { addAlert } from '../../redux/ducks/globalAlerts';
import { getStatesList } from '../../redux/ducks/dropdowns';
import { requiredField, requiredSelect, requiredDollarAmount } from '../../utils/validations';
import { createOptionsFromManagedDropdownList } from '../../utils/createOptionsFromArray';

type CityDetailsProps = {
  id?: string;
} & RouteComponentProps;

const CityDetails: FunctionComponent<CityDetailsProps> = (props) => {
  const isLoading = useSelector((state: RootState) => state.admin.isLoading);
  const cities = useSelector((state: RootState) => state.admin.cities);
  const counties = useSelector((state: RootState) => state.admin.counties);
  const statesList = useSelector((state: RootState) => state.dropdowns.states.list);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (statesList.length === 0) {
      dispatch(getStatesList());
    }
  }, []);

  useEffect(() => {
    if (counties.length === 0) {
      dispatch(getAllCounties());
    }
  }, []);

  const newCityInitialValues = {
    name: '',
    state: 'MI',
    monthlyPrice: 0,
    countyId: '',
    id: 0,
  };

  const isNewCity = props.id === 'new';
  const matchingCity =
    (cities && cities.find((c) => c.id === Number(props.id))) || newCityInitialValues;

  const activeCity = isNewCity ? newCityInitialValues : { ...matchingCity };

  const countiesOptions =
    counties &&
    counties.map((county) => {
      const obj = { value: '', label: '' };
      obj.value = String(county.id);
      obj.label = county.name;
      return obj;
    });

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
      {statesList.length > 0 && counties.length > 0 ? (
        <Formik
          validateOnMount
          initialValues={{ ...activeCity }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              isNewCity
                ? createCity({ ...values, countyId: Number(values.countyId) })
                : updateCity({ ...values, countyId: Number(values.countyId) })
            ).then((response: ActionResponseType) => {
              if (response && !response.error) {
                dispatch(
                  addAlert({
                    message: `Successfully ${isNewCity ? 'added' : 'edited'} ${values.name}`,
                    type: 'success',
                  })
                );
                setSubmitting(false);
                navigate('/admin/cities');
              }
            });
          }}
        >
          {({ isValid, isSubmitting, ...rest }) => (
            <Form>
              <Row>
                <Column md={3}>
                  <Field
                    as={Input}
                    name="name"
                    type="text"
                    label="City Name"
                    validate={requiredField}
                    required
                  />
                </Column>
                <Column md={3}>
                  <Field
                    as={Input}
                    name="countyId"
                    type="select"
                    options={countiesOptions}
                    label="County"
                    validate={requiredSelect}
                    required
                    {...rest}
                  />
                </Column>
                <Column md={3}>
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
                <Column md={3}>
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
              <FlexContainer justifyContent="space-between">
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  isLoading={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? 'Submitting' : 'Submit'}
                </Button>
                {!isNewCity && (
                  <Button
                    type="button"
                    color="dangerOutline"
                    disabled={isNewCity}
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
      ) : (
        <LoadingPage />
      )}
      <Modal toggleModal={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
        <Heading styledAs="title">Delete {activeCity.name}?</Heading>
        <p>Are you sure you want to delete {activeCity.name}?</p>
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
                if (!isNewCity) {
                  await dispatch(deleteCityById(activeCity.id));
                  dispatch(
                    addAlert({
                      type: 'success',
                      message: `Successfully removed ${activeCity.name}`,
                    })
                  );
                  navigate('/admin/cities');
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
    </>
  );
};

export default CityDetails;
