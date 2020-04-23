import React from 'react';

import { Seo, PageContainer, Heading, Box } from '../../components';
import BlogRoll from '../../templates/BlogRoll';

const BlogIndexPage = () => (
  <PageContainer>
    <Seo title="Latest Stories" />
    <div>
      <Heading>Latest Stories</Heading>
    </div>
    <section>
      <Box>
        <BlogRoll />
      </Box>
    </section>
  </PageContainer>
);

export default BlogIndexPage;
