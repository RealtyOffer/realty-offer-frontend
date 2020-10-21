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
import { createCounty, deleteCountyById, updateCounty } from '../../redux/ducks/admin';
import { ActionResponseType } from '../../redux/constants';
import { addAlert } from '../../redux/ducks/globalAlerts';
import { getStatesList } from '../../redux/ducks/dropdowns';
import { requiredField, requiredSelect, requiredDollarAmount } from '../../utils/validations';
import { createOptionsFromManagedDropdownList } from '../../utils/createOptionsFromArray';

type CountyDetailsProps = {
  id?: string;
} & RouteComponentProps;

const CountyDetails: FunctionComponent<CountyDetailsProps> = (props) => {
  const isLoading = useSelector((state: RootState) => state.admin.isLoading);
  const counties = useSelector((state: RootState) => state.admin.counties);
  const statesList = useSelector((state: RootState) => state.dropdowns.states.list);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (statesList.length === 0) {
      dispatch(getStatesList());
    }
  }, []);

  const newCountyInitialValues = {
    name: '',
    state: 'MI',
    monthlyPrice: 0,
    id: 0,
  };

  const isNewCounty = props.id === 'new';
  const matchingCounty =
    (counties && counties.find((c) => c.id === Number(props.id))) || newCountyInitialValues;

  const activeCounty = isNewCounty ? newCountyInitialValues : { ...matchingCounty };

  if (!props.id || !counties || !activeCounty) {
    return null;
  }

  return (
    <>
      <FlexContainer justifyContent="space-between">
        <Heading>{isNewCounty ? 'Add New' : 'Edit'} County</Heading>
        <Button type="link" to="/admin/counties" iconLeft={<FaCaretLeft />} color="text">
          Back to All Counties
        </Button>
      </FlexContainer>
      {statesList.length > 0 ? (
        <Formik
          validateOnMount
          initialValues={{ ...activeCounty }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(isNewCounty ? createCounty(values) : updateCounty(values)).then(
              (response: ActionResponseType) => {
                if (response && !response.error) {
                  dispatch(
                    addAlert({
                      message: `Successfully ${isNewCounty ? 'added' : 'edited'} county`,
                      type: 'success',
                    })
                  );
                  setSubmitting(false);
                  navigate('/admin/counties');
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
                    label="County Name"
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
              <FlexContainer justifyContent="space-between">
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  isLoading={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? 'Submitting' : 'Submit'}
                </Button>
                {!isNewCounty && (
                  <Button
                    type="button"
                    color="dangerOutline"
                    disabled={isNewCounty}
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
        <Heading styledAs="title">Delete {activeCounty.name}?</Heading>
        <p>Are you sure you want to delete {activeCounty.name}?</p>
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
                if (!isNewCounty) {
                  await dispatch(deleteCountyById(activeCounty.id));
                  dispatch(
                    addAlert({
                      type: 'success',
                      message: `Successfully removed ${activeCounty.name}`,
                    })
                  );
                  navigate('/admin/counties');
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

export default CountyDetails;
