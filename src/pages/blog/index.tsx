import React from 'react';

import { Header, Box } from '../../components';
import BlogRoll from '../../templates/BlogRoll';

const BlogIndexPage = () => (
  <>
    <div>
      <Header>
        Latest Stories
      </Header>
    </div>
    <section>
      <Box largePadding>
        <BlogRoll />
      </Box>
    </section>
  </>
);

export default BlogIndexPage;
