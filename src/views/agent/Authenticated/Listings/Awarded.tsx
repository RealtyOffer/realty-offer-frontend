import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { FaRegFrown } from 'react-icons/fa';

import { Box, Button, Heading, Seo, FlexContainer } from '../../../../components';
import { doubleSpacer } from '../../../../styles/size';

const AwardedListings: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="Awarded Listings" />
    <Heading>Awarded Listings</Heading>
    {true && ( // TODO: look at awarded listings length to show this dynamically
      <Box>
        <FlexContainer height="500px" flexDirection="column">
          <FaRegFrown fontSize={64} style={{ margin: doubleSpacer }} />
          <Heading styledAs="title" align="center">
            You have not won any bids at this time.
          </Heading>
          <Button type="link" to="/agent/listings/new">
            See New Listings
          </Button>
        </FlexContainer>
      </Box>
    )}
  </>
);

export default AwardedListings;
