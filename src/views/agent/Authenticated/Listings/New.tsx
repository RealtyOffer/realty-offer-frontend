import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import addHours from 'date-fns/addHours';
import { FaFrown } from 'react-icons/fa';

import {
  Box,
  Button,
  BidCard,
  Column,
  Heading,
  Seo,
  Row,
  FlexContainer,
} from '../../../../components';
import { doubleSpacer } from '../../../../styles/size';

const NewListings: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="New Listings" />
    <Heading>New Listings</Heading>
    {true && ( // TODO: look at new listings length to show this dynamically
      <Box>
        <FlexContainer height="500px" flexDirection="column">
          <FaFrown fontSize={64} style={{ margin: doubleSpacer }} />
          <Heading styledAs="title" align="center">
            There are no new bids in your current sales area.
          </Heading>
          <Button type="link" to="/agent/account/settings">
            Add More Cities
          </Button>
        </FlexContainer>
      </Box>
    )}
    <Row>
      <Column sm={6} lg={4}>
        <BidCard
          priceRange="$350-375k"
          type="selling"
          location="48178"
          expiresAt={addHours(new Date(), 22)}
        />
      </Column>
      <Column sm={6} lg={4}>
        <BidCard
          priceRange="$350-375k"
          type="buying"
          location={['48170', '48152']}
          expiresAt={addHours(new Date(), 1)}
        />
      </Column>
    </Row>
  </>
);

export default NewListings;
