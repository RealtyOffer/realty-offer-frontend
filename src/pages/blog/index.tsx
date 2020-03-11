import React from 'react';

import { Heading, Box } from '../../components';
import BlogRoll from '../../templates/BlogRoll';

const BlogIndexPage = () => (
  <>
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
  </>
);

export default BlogIndexPage;
