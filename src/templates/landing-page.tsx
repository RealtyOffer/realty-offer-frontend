import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import {
  Row,
  Column,
  Box,
  Button,
  FlexContainer,
  HeroImage,
  Heading,
  NegativeMarginContainer,
  PageContainer,
  PreviewCompatibleImage,
  Seo,
} from '../components';

type LandingPageProps = {
  title: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: { childImageSharp: { fluid: FluidObject } };
  consumerHeading: string;
  consumerDescription: string;
  consumerCTA: string;
  agentHeading: string;
  agentDescription: string;
  agentCTA: string;
  mainpitch: {
    title: string;
    steps: Array<{
      title: string;
      text: string;
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    }>;
  };
  secondpitch: {
    title: string;
    text: string;
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    link: string;
    linkText: string;
  };
};

export const LandingPageTemplate: FunctionComponent<LandingPageProps> = ({
  heroImage,
  title,
  heroHeading,
  heroSubheading,
  consumerHeading,
  consumerDescription,
  consumerCTA,
  agentHeading,
  agentDescription,
  agentCTA,
  mainpitch,
  secondpitch,
}) => (
  <div>
    <Seo title={title} />
    <HeroImage src={heroImage.childImageSharp.fluid.src}>
      <PageContainer>
        <Box backgroundAccent>
          <Heading styledAs="title">{heroHeading}</Heading>
          <Heading styledAs="subtitle">{heroSubheading}</Heading>
        </Box>
      </PageContainer>
    </HeroImage>
    <PageContainer>
      <section>
        <Row>
          <Column md={6}>
            <Box>
              <Heading as="h2">{consumerHeading}</Heading>
              <p>{consumerDescription}</p>
              <p>{consumerCTA}</p>
            </Box>
          </Column>
          <Column md={6}>
            <Box>
              <Heading as="h2">{agentHeading}</Heading>
              <p>{agentDescription}</p>
              <p>{agentCTA}</p>
            </Box>
          </Column>
        </Row>
      </section>
      <Heading as="h2" styledAs="sectionHeading">
        {mainpitch.title}
      </Heading>
      <Row>
        {mainpitch.steps.map((step) => (
          <Column md={4} key={step.title}>
            <Box>
              <FlexContainer flexDirection="column">
                {step.image && (
                  <NegativeMarginContainer top right left>
                    <PreviewCompatibleImage imageInfo={{ image: step.image }} />
                  </NegativeMarginContainer>
                )}
                <Heading as="h4" styledAs="subtitle">
                  {step.title}
                </Heading>
                <p>{step.text}</p>
              </FlexContainer>
            </Box>
          </Column>
        ))}
      </Row>
      <Row>
        <Column md={8}>
          <Box>
            <Heading as="h4" styledAs="subtitle">
              {secondpitch.title}
            </Heading>
            <p>{secondpitch.text}</p>
            <Button type="link" to={secondpitch.link}>
              {secondpitch.linkText}
            </Button>
          </Box>
        </Column>
        <Column md={4}>
          <Box bgSrc={secondpitch.image}>test</Box>
        </Column>
      </Row>
    </PageContainer>
  </div>
);

const LandingPage = ({ data }: { data: { markdownRemark: { frontmatter: LandingPageProps } } }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <LandingPageTemplate
      heroImage={frontmatter.heroImage}
      title={frontmatter.title}
      heroHeading={frontmatter.heroHeading}
      heroSubheading={frontmatter.heroSubheading}
      consumerHeading={frontmatter.consumerHeading}
      consumerDescription={frontmatter.consumerDescription}
      consumerCTA={frontmatter.consumerCTA}
      agentHeading={frontmatter.agentHeading}
      agentDescription={frontmatter.agentDescription}
      agentCTA={frontmatter.agentCTA}
      mainpitch={frontmatter.mainpitch}
      secondpitch={frontmatter.secondpitch}
    />
  );
};

export default LandingPage;

export const pageQuery = graphql`
  query LandingPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "landing-page" } }) {
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
        consumerHeading
        consumerDescription
        consumerCTA
        agentHeading
        agentDescription
        agentCTA
        mainpitch {
          title
          steps {
            title
            text
            image {
              childImageSharp {
                fluid(maxWidth: 512, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        secondpitch {
          title
          text
          image {
            childImageSharp {
              fluid(maxWidth: 400, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          link
          linkText
        }
      }
    }
  }
`;
