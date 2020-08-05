import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';
import { PageContainer, Seo, Box, Heading } from '../components';

type PrivacyPolicyProps = {
  title: string;
  content: any;
  contentComponent: typeof HTMLContent;
};

export const PrivacyPolicyTemplate: FunctionComponent<PrivacyPolicyProps> = ({
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

const PrivacyPolicy = ({
  data,
}: {
  data: { markdownRemark: { frontmatter: PrivacyPolicyProps; html: any } };
}) => {
  const { markdownRemark: post } = data;

  return (
    <PrivacyPolicyTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  );
};

export default PrivacyPolicy;

export const privacyPolicyQuery = graphql`
  query PrivacyPolicy {
    markdownRemark(frontmatter: { templateKey: { eq: "privacy-policy" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
