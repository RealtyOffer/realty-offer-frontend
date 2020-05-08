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

import { HTMLContent } from '../components/Content';

type LandingPageProps = {
  title: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: { childImageSharp: { fluid: FluidObject } };
  consumer: {
    title: string;
    cta: string;
    body: any;
  };
  agent: {
    title: string;
    cta: string;
    body: any;
  };
  mainpitch: {
    title: string;
    steps: Array<{
      title: string;
      body: any;
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    }>;
  };
  secondpitch: {
    title: string;
    body: any;
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
  consumer,
  agent,
  mainpitch,
  secondpitch,
}) => (
  <div>
    <Seo title={title} />
    <HeroImage src={heroImage.childImageSharp.fluid.src} height="500px">
      <PageContainer>
        <Box backgroundAccent>
          <Heading styledAs="title">{heroHeading}</Heading>
          <Heading styledAs="subtitle" as="h2">
            {heroSubheading}
          </Heading>
        </Box>
      </PageContainer>
    </HeroImage>
    <PageContainer>
      <section style={{ marginTop: '-100px' }}>
        <Row>
          <Column md={6}>
            <Box>
              <Heading as="h3" styledAs="title" align="center">
                {consumer.title}
              </Heading>
              <HTMLContent content={consumer.body} />
              <p>{consumer.cta}</p>
            </Box>
          </Column>
          <Column md={6}>
            <Box>
              <Heading as="h3" styledAs="title" align="center">
                {agent.title}
              </Heading>
              <HTMLContent content={agent.body} />
              <p>{agent.cta}</p>
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
                <HTMLContent content={step.body} />
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
            <HTMLContent content={secondpitch.body} />
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
      consumer={frontmatter.consumer}
      agent={frontmatter.agent}
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
        consumer {
          title
          body
          cta
        }
        agent {
          title
          body
          cta
        }
        mainpitch {
          title
          steps {
            title
            body
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
          body
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
