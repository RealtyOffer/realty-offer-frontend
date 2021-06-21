import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';
import { PageContainer, Seo, Box, Heading } from '../components';

type PilotTermsProps = {
  title: string;
  content: any;
  contentComponent: typeof HTMLContent;
};

export const PilotTermsTemplate: FunctionComponent<PilotTermsProps> = ({
  title,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <PageContainer>
      <Seo
        title={title}
        description="Terms and conditions on your Pilot usage of Realty Offer services for buying and selling homes in Michigan, United States."
      />
      <Heading id="top">{title}</Heading>
      <Box largePadding>
        <PageContent content={content} />
      </Box>
    </PageContainer>
  );
};

const PilotTerms = ({
  data,
}: {
  data: { markdownRemark: { frontmatter: PilotTermsProps; html: any } };
}) => {
  const { markdownRemark: post } = data;

  return (
    <PilotTermsTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  );
};

export default PilotTerms;

export const PilotTermsQuery = graphql`
  query PilotTerms {
    markdownRemark(frontmatter: { templateKey: { eq: "pilot-terms" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
