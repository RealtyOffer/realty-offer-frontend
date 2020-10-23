import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import { uniqBy } from 'lodash';
import { Formik, Form, Field } from 'formik';

import {
  ListingCardsLoader,
  ListingCard,
  Column,
  EmptyListingsView,
  Heading,
  Seo,
  Row,
  Input,
} from '../../../../components';

import {
  getNewListings,
  changeCountyFilter,
  toggleSalesAreaFilter,
} from '../../../../redux/ducks/listings';
import { RootState } from '../../../../redux/ducks';
import { getAllCounties } from '../../../../redux/ducks/admin';
import { screenSizes } from '../../../../styles/size';
import useWindowSize from '../../../../utils/useWindowSize';

const NewListings: FunctionComponent<RouteComponentProps> = () => {
  const agent = useSelector((state: RootState) => state.agent);
  const newListings = useSelector((state: RootState) => state.listings.new);
  const listings = useSelector((state: RootState) => state.listings);
  const isLoading = useSelector((state: RootState) => state.listings.isLoading);
  const counties = useSelector((state: RootState) => state.admin.counties);
  const dispatch = useDispatch();

  const size = useWindowSize();
  const isExtraSmallScreen = Boolean(size && size.width && size.width < screenSizes.small);

  useEffect(() => {
    dispatch(getNewListings());
  }, []);

  useEffect(() => {
    if (counties.length === 0) {
      dispatch(getAllCounties());
    }
  }, []);

  const countiesOptions =
    counties &&
    counties.map((county) => {
      const obj = { value: '', label: '' };
      obj.value = String(county.id);
      obj.label = county.name;
      return obj;
    });

  const isFilteredByCounty = listings.countyFilter !== 'All Counties';
  const isFilteredBySalesArea = listings.salesAreaOnly;

  const filteredListings = () => {
    if (isFilteredByCounty) {
      const sellersCityMatchesByCounty = newListings.filter(
        (l) => l.sellersCity?.countyId === Number(listings.countyFilter)
      );
      const buyersCityMatchesByCounty = newListings.filter((l) =>
        l.buyingCities?.some((bc) => bc.countyId === Number(listings.countyFilter))
      );
      return uniqBy(
        [...(sellersCityMatchesByCounty || []), ...(buyersCityMatchesByCounty || [])],
        'id'
      );
    }
    if (isFilteredBySalesArea) {
      const sellersCityMatchesByCity = newListings.filter((l) =>
        agent.cities?.some((c) => c.name === l.sellersCity?.name)
      );
      const buyersCityMatchesByCity = newListings.filter((l) =>
        agent.cities?.some((c) => c.name === l.sellersCity?.name)
      );
      return uniqBy(
        [...(sellersCityMatchesByCity || []), ...(buyersCityMatchesByCity || [])],
        'id'
      );
    }
    return newListings;
  };

  const initialValues = {
    countyFilter: listings.countyFilter || 'All Counties',
    salesAreaOnly: listings.salesAreaOnly || false,
  };

  return (
    <>
      <Seo title="New Listings" />
      <Heading>New Listings</Heading>
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          if (initialValues.countyFilter !== values.countyFilter) {
            dispatch(changeCountyFilter(values.countyFilter));
          }
          if (initialValues.salesAreaOnly === false && values.salesAreaOnly === true) {
            dispatch(changeCountyFilter('All Counties'));
          }
          if (initialValues.salesAreaOnly !== values.salesAreaOnly) {
            dispatch(toggleSalesAreaFilter(values.salesAreaOnly));
          }
          resetForm({
            values: {
              countyFilter: values.salesAreaOnly ? 'All Counties' : values.countyFilter,
              salesAreaOnly: values.salesAreaOnly,
            },
          });
        }}
      >
        {({ handleSubmit, resetForm, ...rest }) => (
          <Form onBlur={() => handleSubmit()} onChange={() => handleSubmit()}>
            <Row>
              <Column sm={6} md={4}>
                <Field
                  type="select"
                  as={Input}
                  name="countyFilter"
                  options={[{ value: 'All Counties', label: 'All Counties' }, ...countiesOptions]}
                  label="Show Listings for..."
                  isMulti={false}
                  {...rest}
                />
              </Column>
              <Column sm={6} md={4} mdOffset={4}>
                <Field
                  type="checkbox"
                  as={Input}
                  name="salesAreaOnly"
                  label="Show Listings for my Sales Area only"
                  alignRight={!isExtraSmallScreen}
                />
              </Column>
            </Row>
            {isLoading && <ListingCardsLoader />}
            {newListings && newListings.length > 0 && !isLoading && (
              <Row>
                {filteredListings()?.map((listing) => (
                  <Column sm={6} lg={4} key={listing.id}>
                    <ListingCard listing={listing} listingType="new" />
                  </Column>
                ))}
              </Row>
            )}
            {isFilteredByCounty && filteredListings()?.length === 0 && !isLoading && (
              <EmptyListingsView
                title="There are no new listings match your current county filter."
                buttonText="Reset Filters"
                onClick={() => {
                  dispatch(changeCountyFilter('All Counties'));
                  resetForm({
                    values: {
                      countyFilter: 'All Counties',
                      salesAreaOnly: false,
                    },
                  });
                }}
              />
            )}
            {!isFilteredByCounty && newListings && newListings.length === 0 && !isLoading && (
              <EmptyListingsView
                title="There are no new listings in your current sales area."
                buttonText="Add More Cities"
                to="/agent/account/billing"
              />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default NewListings;
