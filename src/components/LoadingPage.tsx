import React from 'react';
import Skeleton from 'react-loading-skeleton';

import Box from './Box';

const LoadingPage = () => (
  <>
    <Skeleton width={200} height={40} />
    <br />
    <br />
    <Box>
      <Skeleton count={20} />
    </Box>
  </>
);

export default LoadingPage;
