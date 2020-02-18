import React from 'react';

import {
  Header, Layout, Box, BlogRoll,
} from '../../components';

const BlogIndexPage = () => (
  <Layout>
    <div>
      <Header>
        Latest Stories
      </Header>
    </div>
    <section>
      <Box>
        <BlogRoll />
      </Box>
    </section>
  </Layout>
);

export default BlogIndexPage;
