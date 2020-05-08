import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';
import { PageContainer, Seo, Box, Heading } from '../components';

type AboutPageProps = {
  title: string;
  content: any;
  contentComponent: typeof HTMLContent;
};

export const AboutPageTemplate: FunctionComponent<AboutPageProps> = ({
  title,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <PageContainer>
      <Seo title={title} />
      <Heading>{title}</Heading>
      <Box>
        <PageContent content={content} />
      </Box>
    </PageContainer>
  );
};

const AboutPage = ({
  data,
}: {
  data: { markdownRemark: { frontmatter: AboutPageProps; html: any } };
}) => {
  const { markdownRemark: post } = data;

  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  );
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
