/* eslint-disable dot-notation */
import React, { FunctionComponent, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { RouteComponentProps } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Seo, Heading, Input, LoadingPage } from '../../../components';
import AutoSave from '../../../utils/autoSave';
import { updateConsumerProfile } from '../../../redux/ducks/consumer';
import { RootState } from '../../../redux/ducks';
import { requiredSelect } from '../../../utils/validations';
import { getDropdownListValue } from '../../../utils/dropdownUtils';
import { createOptionsFromManagedDropdownList } from '../../../utils/createOptionsFromArray';
import { getGenderPreferencesList, getAgePreferencesList } from '../../../redux/ducks/dropdowns';

type ConsumerPreferencesProps = {} & RouteComponentProps;

const ConsumerPreferences: FunctionComponent<ConsumerPreferencesProps> = () => {
  const dispatch = useDispatch();
  const consumer = useSelector((state: RootState) => state.consumer);
  const dropdowns = useSelector((state: RootState) => state.dropdowns);

  const initialValues = {
    genderPreferenceId:
      getDropdownListValue(consumer.profile?.genderPreferenceId, 'genderPreferences') || '',
    agePreferenceId:
      getDropdownListValue(consumer.profile?.agePreferenceId, 'agePreferences') || '',
  };

  useEffect(() => {
    if (!dropdowns.genderPreferences || !dropdowns.genderPreferences.list.length) {
      dispatch(getGenderPreferencesList());
    }
  }, []);

  useEffect(() => {
    if (!dropdowns.agePreferences || !dropdowns.agePreferences.list.length) {
      dispatch(getAgePreferencesList());
    }
  }, []);

  const profileComplete = consumer.profile?.agePreferenceId && consumer.profile?.genderPreferenceId;

  return (
    <>
      <Seo title="My Preferences" />
      <Heading as="h2">My Preferences</Heading>
      <Box>
        {!profileComplete && (
          <Heading as="h3">
            Completing the questionnaire below will increase your chances of matching with the best
            agent for you!
          </Heading>
        )}

        <p>
          In the event that multiple agents have the same bid, we will use this information to
          select the right agent for you.
        </p>
        {!dropdowns.agePreferences.list.length || !dropdowns.genderPreferences.list.length ? (
          <LoadingPage />
        ) : (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                updateConsumerProfile({
                  ...consumer.profile,
                  genderPreferenceId: Number(values.genderPreferenceId),
                  agePreferenceId: Number(values.agePreferenceId),
                })
              ).then(() => {
                setSubmitting(false);
              });
            }}
          >
            {({ ...rest }) => (
              <Form>
                <Field
                  as={Input}
                  type="select"
                  name="agePreferenceId"
                  label="Do you have an age preference?"
                  required
                  validate={requiredSelect}
                  options={createOptionsFromManagedDropdownList(dropdowns.agePreferences.list)}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="genderPreferenceId"
                  label="Do you have a preferred gender you'd like to work with?"
                  required
                  validate={requiredSelect}
                  options={createOptionsFromManagedDropdownList(dropdowns.genderPreferences.list)}
                  {...rest}
                />
                <AutoSave />
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </>
  );
};

export default ConsumerPreferences;
