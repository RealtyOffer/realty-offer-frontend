import React from 'react';
import Skeleton from 'react-loading-skeleton';

import Box from './Box';
import Column from './Column';
import Row from './Row';
import HorizontalRule from './HorizontalRule';

const ListingCardsLoader = () => (
  <Row>
    {['', '', '', '', '', ''].map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Column sm={6} lg={4} key={index}>
        <Box>
          <Skeleton height={24} />
          <HorizontalRule compact />
          <Skeleton count={4} />
          <HorizontalRule compact />
          <Skeleton height={24} />
        </Box>
      </Column>
    ))}
  </Row>
);

export default ListingCardsLoader;
