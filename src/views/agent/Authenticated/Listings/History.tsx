import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { FaFrown } from 'react-icons/fa';

import { Box, Button, Heading, Seo, FlexContainer } from '../../../../components';
import { doubleSpacer } from '../../../../styles/size';

const ListingHistory: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="Listing History" />
    <Heading>Listing History</Heading>
    {true && ( // TODO: look at listing history length to show this dynamically
      <Box>
        <FlexContainer height="500px" flexDirection="column">
          <FaFrown fontSize={64} style={{ margin: doubleSpacer }} />
          <Heading styledAs="title" align="center">
            You have not bid on any listings yet!
          </Heading>
          <Button type="link" to="/agent/listings/new">
            See New Listings
          </Button>
        </FlexContainer>
      </Box>
    )}
  </>
);

export default ListingHistory;
