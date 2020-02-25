import React from 'react';

import { Header, Layout, Box } from '../../components';
import BlogRoll from '../../templates/BlogRoll';

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
