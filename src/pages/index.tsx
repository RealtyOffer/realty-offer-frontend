import React from 'react';

import { Box, Button, Seo } from '../components';

const IndexPage = () => (
  <>
    <Seo title="Home" />
    <Box>
      <Button type="link" to="/agent" color="primaryOutline" rightspacer>
        Agent
      </Button>
      <Button type="link" to="/consumer" color="primaryOutline" rightspacer>
        Consumer
      </Button>
    </Box>
  </>
);

export default IndexPage;
