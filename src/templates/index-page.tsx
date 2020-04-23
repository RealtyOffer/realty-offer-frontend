import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import BlogRoll from './BlogRoll';
import { Box, Button, HeroImage, Heading, PageContainer, Seo } from '../components';

type IndexPageProps = {
  title: string;
  heroHeading: string;
  heroSubheading: string;
  heroCTALink: string;
  heroCTAText: string;
  mainpitch: {
    title: string;
    description: string;
  };
  heroImage: { childImageSharp: { fluid: FluidObject } };
};

export const IndexPageTemplate: FunctionComponent<IndexPageProps> = ({
  heroImage,
  title,
  heroHeading,
  heroSubheading,
  heroCTALink,
  heroCTAText,
  mainpitch,
}) => (
  <div>
    <Seo title={title} />
    <HeroImage src={heroImage.childImageSharp.fluid.src}>
      <PageContainer>
        <Box backgroundAccent>
          <Heading styledAs="title">{heroHeading}</Heading>
          <Heading styledAs="subtitle">{heroSubheading}</Heading>
          <Button type="link" to={heroCTALink}>
            {heroCTAText}
          </Button>
        </Box>
      </PageContainer>
    </HeroImage>
    <PageContainer>
      <Box>
        <Heading as="h2">{mainpitch.title}</Heading>
        <p>{mainpitch.description}</p>
      </Box>
      <Heading as="h3">Latest stories</Heading>
      <BlogRoll />
    </PageContainer>
  </div>
);

const IndexPage = ({ data }: { data: { markdownRemark: { frontmatter: IndexPageProps } } }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <IndexPageTemplate
      heroImage={frontmatter.heroImage}
      title={frontmatter.title}
      heroHeading={frontmatter.heroHeading}
      heroSubheading={frontmatter.heroSubheading}
      heroCTALink={frontmatter.heroCTALink}
      heroCTAText={frontmatter.heroCTAText}
      mainpitch={frontmatter.mainpitch}
    />
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heroHeading
        heroSubheading
        heroCTALink
        heroCTAText
        mainpitch {
          title
          description
        }
      }
    }
  }
`;
