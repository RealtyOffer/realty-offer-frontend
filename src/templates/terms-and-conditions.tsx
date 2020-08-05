import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';
import { PageContainer, Seo, Box, Heading } from '../components';

type TermsAndConditionsProps = {
  title: string;
  content: any;
  contentComponent: typeof HTMLContent;
};

export const TermsAndConditionsTemplate: FunctionComponent<TermsAndConditionsProps> = ({
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

const TermsAndConditions = ({
  data,
}: {
  data: { markdownRemark: { frontmatter: TermsAndConditionsProps; html: any } };
}) => {
  const { markdownRemark: post } = data;

  return (
    <TermsAndConditionsTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  );
};

export default TermsAndConditions;

export const termsAndConditionsQuery = graphql`
  query TermsAndConditions {
    markdownRemark(frontmatter: { templateKey: { eq: "terms-and-conditions" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
