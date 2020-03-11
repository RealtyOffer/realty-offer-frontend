import React from 'react';

import { Heading, Layout, Box } from '../../components';
import BlogRoll from '../../templates/BlogRoll';

const BlogIndexPage = () => (
  <Layout>
    <div>
      <Heading>
        Latest Stories
      </Heading>
    </div>
    <section>
      <Box largePadding>
        <BlogRoll />
      </Box>
    </section>
  </Layout>
);

export default BlogIndexPage;
