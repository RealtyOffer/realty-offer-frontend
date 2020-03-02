import React from 'react';

import {
  Box, Button, Layout, Seo,
} from '../components';

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Box>
      <Button type="link" to="/agent" rightspacer>Agent</Button>
      <Button type="link" to="/login" color="primaryOutline">Consumer</Button>
    </Box>
  </Layout>
);

export default IndexPage;
