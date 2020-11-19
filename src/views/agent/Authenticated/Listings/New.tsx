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
import { getUserCounties } from '../../../../redux/ducks/user';
import { screenSizes } from '../../../../styles/size';
import useWindowSize from '../../../../utils/useWindowSize';

const NewListings: FunctionComponent<RouteComponentProps> = () => {
  const agent = useSelector((state: RootState) => state.agent);
  const listings = useSelector((state: RootState) => state.listings);
  const { isLoading, new: newListings, hiddenListingIds } = listings;
  const counties = useSelector((state: RootState) => state.user.counties);
  const dispatch = useDispatch();

  const size = useWindowSize();
  const isExtraSmallScreen = Boolean(size && size.width && size.width < screenSizes.small);

  useEffect(() => {
    dispatch(getNewListings());
  }, []);

  useEffect(() => {
    if (!counties || (counties && counties.length === 0)) {
      dispatch(getUserCounties());
    }
  }, []);

  const countiesOptions =
    counties && counties.length > 0
      ? counties.map((county) => {
          const obj = { value: '', label: '' };
          obj.value = String(county.id);
          obj.label = county.name;
          return obj;
        })
      : [];

  const isFilteredByCounty =
    listings.countyFilter !== 'All Counties' && listings.countyFilter !== '';
  const isFilteredBySalesArea = listings.salesAreaOnly;

  let listingsToShow = newListings;

  // Remove listings hidden by the user
  listingsToShow = listingsToShow.filter(({ id }) => id != null && !hiddenListingIds.includes(id));

  const filteredListings = () => {
    if (isFilteredByCounty) {
      const sellersCityMatchesByCounty = listingsToShow.filter(
        (l) => l.sellersCity?.countyId === Number(listings.countyFilter)
      );
      const buyersCityMatchesByCounty = listingsToShow.filter((l) =>
        l.buyingCities?.some((bc) => bc.countyId === Number(listings.countyFilter))
      );
      return uniqBy(
        [...(sellersCityMatchesByCounty || []), ...(buyersCityMatchesByCounty || [])],
        'id'
      );
    }
    if (isFilteredBySalesArea) {
      const sellersCityMatchesByCity = listingsToShow.filter((l) =>
        agent.cities?.some((c) => c.name === l.sellersCity?.name)
      );
      const buyersCityMatchesByCity = listingsToShow.filter((l) =>
        agent.cities?.some((c) => l.buyingCities?.some((b) => c.name === b?.name))
      );
      return uniqBy(
        [...(sellersCityMatchesByCity || []), ...(buyersCityMatchesByCity || [])],
        'id'
      );
    }
    return listingsToShow;
  };

  const initialValues = {
    countyFilter: listings.countyFilter === '' ? 'All Counties' : listings.countyFilter,
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
              countyFilter: values.salesAreaOnly
                ? 'All Counties'
                : values.countyFilter || 'All Counties',
              salesAreaOnly: values.salesAreaOnly,
            },
          });
        }}
      >
        {({ handleSubmit, values, resetForm, ...rest }) => (
          <Form onBlur={() => handleSubmit()} onChange={() => handleSubmit()}>
            {counties && counties.length > 0 && (
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
                {agent && !agent.isPilotUser && (
                  <Column sm={6} md={4} mdOffset={4}>
                    <Field
                      type="toggle"
                      as={Input}
                      name="salesAreaOnly"
                      checked={values.salesAreaOnly}
                      label="Show Listings for my Sales Area only"
                      alignRight={!isExtraSmallScreen}
                    />
                  </Column>
                )}
              </Row>
            )}
            {isLoading && <ListingCardsLoader />}
            {listingsToShow && listingsToShow.length > 0 && !isLoading && (
              <Row>
                {filteredListings()?.map((listing) => (
                  <Column md={6} lg={4} key={listing.id}>
                    <ListingCard listing={listing} listingType="new" isHideable />
                  </Column>
                ))}
              </Row>
            )}
            {isFilteredByCounty && filteredListings().length === 0 && !isLoading && (
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
            {!isFilteredByCounty && filteredListings().length === 0 && !isLoading && (
              <EmptyListingsView
                title="There are no new listings at this time."
                buttonText="Refresh New Listings"
                onClick={() => dispatch(getNewListings())}
              />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default NewListings;
