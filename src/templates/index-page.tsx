import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { FaArrowCircleRight } from 'react-icons/fa';

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

import { baseSpacer, doubleSpacer } from '../styles/size';
import { lightestGray } from '../styles/color';

type IndexPageProps = {
  title: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: { childImageSharp: { fluid: FluidObject } };
  consumer: {
    title: string;
    cta: string;
    body: any;
    icon: {
      publicURL: string;
    };
  };
  agent: {
    title: string;
    cta: string;
    body: any;
    icon: {
      publicURL: string;
    };
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

const HeroBox = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  padding: ${doubleSpacer};
`;

export const IndexPageTemplate: FunctionComponent<IndexPageProps> = ({
  heroImage,
  title,
  heroHeading,
  heroSubheading,
  consumer,
  mainpitch,
  secondpitch,
}) => (
  <div>
    <Seo title={title} />
    <HeroImage src={heroImage.childImageSharp.fluid.src} height="500px">
      <PageContainer>
        <FlexContainer justifyContent="start">
          <HeroBox>
            <Heading inverse>{heroHeading}</Heading>
            <Heading inverse as="h2">
              {heroSubheading}
            </Heading>
            <Button type="button" onClick={() => scrollTo('#start')}>
              Get Started
            </Button>
          </HeroBox>
        </FlexContainer>
      </PageContainer>
    </HeroImage>
    <section style={{ marginTop: '-100px', marginBottom: 50 }} id="start">
      <PageContainer>
        <Row>
          <Column md={8} mdOffset={2}>
            <Box textAlign="center">
              <img src={consumer.icon.publicURL} alt="" style={{ margin: baseSpacer }} />
              <Heading as="h3" styledAs="title" align="center">
                {consumer.title}
              </Heading>
              <ReactMarkdown source={consumer.body} />
              <Button
                type="link"
                to="/consumer/start"
                color="tertiary"
                iconRight={<FaArrowCircleRight />}
              >
                {consumer.cta}
              </Button>
            </Box>
          </Column>
        </Row>
      </PageContainer>
    </section>
    <section style={{ backgroundColor: lightestGray, padding: `${doubleSpacer} 0` }}>
      <PageContainer>
        <Heading as="h2" styledAs="title" align="center">
          {mainpitch.title}
        </Heading>
        {mainpitch.steps.map((step, index) => (
          <Box key={step.title}>
            <Row>
              <Column sm={6} smOrder={index === 1 ? 2 : 1} xsSpacer>
                <PreviewCompatibleImage imageInfo={{ image: step.image }} />
              </Column>
              <Column sm={6} smOrder={index === 1 ? 1 : 2}>
                <Heading as="h4" styledAs="title">
                  {step.title}
                </Heading>
                <ReactMarkdown source={step.body} />
              </Column>
            </Row>
          </Box>
        ))}
      </PageContainer>
    </section>
    <section style={{ padding: `${doubleSpacer} 0` }}>
      <PageContainer>
        <Box>
          <FlexContainer flexDirection="column">
            <NegativeMarginContainer top right left>
              <PreviewCompatibleImage imageInfo={{ image: secondpitch.image }} />
            </NegativeMarginContainer>
            <Heading as="h4" styledAs="title">
              {secondpitch.title}
            </Heading>
            <ReactMarkdown source={secondpitch.body} />
            <Button type="link" to={secondpitch.link}>
              {secondpitch.linkText}
            </Button>
          </FlexContainer>
        </Box>
      </PageContainer>
    </section>
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
      consumer={frontmatter.consumer}
      agent={frontmatter.agent}
      mainpitch={frontmatter.mainpitch}
      secondpitch={frontmatter.secondpitch}
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
        consumer {
          title
          body
          cta
          icon {
            publicURL
          }
        }
        agent {
          title
          body
          cta
          icon {
            publicURL
          }
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
              fluid(maxWidth: 1200, quality: 100) {
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
