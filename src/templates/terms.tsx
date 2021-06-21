import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';
import { PageContainer, Seo, Box, Heading } from '../components';

type TermsProps = {
  title: string;
  content: any;
  contentComponent: typeof HTMLContent;
};

export const TermsTemplate: FunctionComponent<TermsProps> = ({
  title,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <PageContainer>
      <Seo
        title={title}
        description="Terms and conditions on your usage of Realty Offer services for buying and selling homes in Michigan, United States."
      />
      <Heading id="top">{title}</Heading>
      <Box largePadding>
        <PageContent content={content} />
      </Box>
    </PageContainer>
  );
};

const Terms = ({ data }: { data: { markdownRemark: { frontmatter: TermsProps; html: any } } }) => {
  const { markdownRemark: post } = data;

  return (
    <TermsTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  );
};

export default Terms;

export const TermsQuery = graphql`
  query Terms {
    markdownRemark(frontmatter: { templateKey: { eq: "terms" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
