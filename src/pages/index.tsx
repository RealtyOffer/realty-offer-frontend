import React from 'react';
import { FaHandPaper, FaChevronRight, FaUserPlus } from 'react-icons/fa';

import {
  Box, Button, Header, Layout, Seo,
} from '../components';

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Box zindex={1}>
      <Header>H1</Header>
      <Button type="link" to="/agent/create-agent" iconLeft={<FaHandPaper />} rightspacer>Hello</Button>
      <Button type="link" to="/agent" color="primaryOutline" iconLeft={<FaHandPaper />} rightspacer>Hello</Button>
      <Button type="button" color="success" iconLeft={<FaHandPaper />} rightspacer />
      <Button type="button" color="successOutline" iconLeft={<FaChevronRight />} rightspacer />
      <Button type="button" color="danger" rightspacer>Danger</Button>
      <Button type="button" color="dangerOutline" rightspacer>Danger Outline</Button>
      <Button type="button" color="text" iconLeft={<FaUserPlus />} rightspacer>Add friend</Button>
    </Box>
    <Box zindex={2}>
      <Header as="h2">H2</Header>
    </Box>
    <Box zindex={3}>
      <Header as="h3">H3</Header>
    </Box>
    <Box zindex={4}>
      <Header as="h4">H4</Header>
    </Box>
    <Box>
      <Header as="h5">H5</Header>
    </Box>
    <Box>
      <Header as="h6">H6</Header>
    </Box>
  </Layout>
);

export default IndexPage;
