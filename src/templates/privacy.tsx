import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';
import { PageContainer, Seo, Box, Heading } from '../components';

type PrivacyProps = {
  title: string;
  content: any;
  contentComponent: typeof HTMLContent;
};

export const PrivacyTemplate: FunctionComponent<PrivacyProps> = ({
  title,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <PageContainer>
      <Seo
        title={title}
        description="This Privacy Notice applies to the use of the Realty Offer Services by consumers and professionals acting as real estate agents."
      />
      <Heading>{title}</Heading>
      <Box largePadding>
        <PageContent content={content} />
      </Box>
    </PageContainer>
  );
};

const Privacy = ({
  data,
}: {
  data: { markdownRemark: { frontmatter: PrivacyProps; html: any } };
}) => {
  const { markdownRemark: post } = data;

  return (
    <PrivacyTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  );
};

export default Privacy;

export const privacyQuery = graphql`
  query Privacy {
    markdownRemark(frontmatter: { templateKey: { eq: "privacy" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
