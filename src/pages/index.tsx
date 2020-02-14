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
      <Button disabled type="link" to="blog" iconLeft={<FaHandPaper />} rightSpacer>Hello</Button>
      <Button disabled type="button" onClick={() => window.alert('clicked')} color="primaryOutline" iconLeft={<FaHandPaper />} rightSpacer>Hello</Button>
      <Button disabled type="button" color="success" iconLeft={<FaHandPaper />} rightSpacer />
      <Button disabled type="button" color="successOutline" iconLeft={<FaChevronRight />} rightSpacer />
      <Button disabled type="button" color="danger" rightSpacer>Danger</Button>
      <Button disabled type="button" color="dangerOutline" rightSpacer>Danger Outline</Button>
      <Button disabled type="button" color="text" iconLeft={<FaUserPlus />} rightSpacer>Add friend</Button>
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
