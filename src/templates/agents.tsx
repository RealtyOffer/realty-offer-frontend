import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import {
  Row,
  Column,
  Button,
  FlexContainer,
  HeroImage,
  Heading,
  PageContainer,
  Seo,
  Testimonial,
  PreviewCompatibleImage,
} from '../components';

import { baseSpacer, doubleSpacer, quadrupleSpacer, breakpoints } from '../styles/size';
import { brandPrimary, brandTertiaryHover, lightestGray, textColor, white } from '../styles/color';
import appleAppStoreBadge from '../images/apple-app-store-black.svg';
import googlePlayStoreBadge from '../images/google-play-store-black.svg';

type AgentsPageProps = {
  title: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: { childImageSharp: { fluid: FluidObject } };
  mobileHeroImage: { childImageSharp: { fluid: FluidObject } };
  mainpitch: {
    title: string;
    description: string;
    ctaText: string;
    videoUrl: string;
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    steps: Array<{
      title: string;
      body: any;
    }>;
  };
  secondpitch: {
    title: string;
    description: string;
    videoUrl: string;
    ctaText: string;
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
  thirdpitch: {
    title: string;
    description: string;
    videoUrl: string;
    ctaText: string;
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
  testimonials: Array<{
    quote: string;
    author: string;
    avatar: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  }>;
};

const HeroBox = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  padding: ${baseSpacer};
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding: ${doubleSpacer};
  }
`;

const CarouselWrapper = styled.div`
  & .carousel-indicators li {
    background-color: ${textColor};
  }
`;

const Badge = styled.div`
  margin-right: ${baseSpacer};
`;

const SectionImageWrapper = styled.div`
  max-width: 250px;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: ${doubleSpacer};

  @media only screen and (min-width: ${breakpoints.md}) {
    max-width: initial;
  }
`;

export const AgentsPageTemplate: FunctionComponent<AgentsPageProps> = ({
  heroImage,
  mobileHeroImage,
  title,
  heroHeading,
  heroSubheading,
  mainpitch,
  secondpitch,
  thirdpitch,
  testimonials,
}) => {
  return (
    <div>
      <Seo title={title} />
      <HeroImage imgSrc={heroImage} mobileImgSrc={mobileHeroImage}>
        <PageContainer>
          <Row>
            <Column lg={5} lgOffset={7}>
              <HeroBox>
                <Heading inverse as="h1">
                  {heroHeading}
                </Heading>
                <p>{heroSubheading}</p>

                <p>
                  Welcome to RealtyOffer!
                  <br />
                  The one-stop sho for the buyer, seller, and agent.
                </p>
                {/* TODO for prod
                <Button type="link" to="/agent/sign-up" block>
                  Create Account
                </Button> */}
              </HeroBox>
              <br />
              <FlexContainer flexDirection="row">
                <Badge>
                  <a href="https://apps.apple.com/us/app/realtyoffer/id1531733131">
                    <img src={appleAppStoreBadge} height={40} alt="Download on Apple App Store" />
                  </a>
                </Badge>
                <Badge>
                  <a href="https://apps.apple.com/us/app/realtyoffer/id1531733131">
                    <img
                      src={googlePlayStoreBadge}
                      height={40}
                      alt="Download on Google Play Store"
                    />
                  </a>
                </Badge>
              </FlexContainer>
            </Column>
          </Row>
        </PageContainer>
      </HeroImage>
      <section style={{ padding: `${doubleSpacer} 0`, backgroundColor: lightestGray }}>
        <PageContainer>
          <Row>
            <Column md={8} mdOffset={2}>
              <Heading as="h2" styledAs="title" align="center">
                {mainpitch.title}
              </Heading>
              <div style={{ textAlign: 'center' }}>
                <ReactMarkdown source={mainpitch.description} />
              </div>
            </Column>
          </Row>
          <Row>
            <Column md={6}>
              <FlexContainer>
                <iframe
                  width="560"
                  height="315"
                  src={mainpitch.videoUrl}
                  frameBorder="0"
                  allowFullScreen
                  title="RealtyOffer Consumer Video"
                />
              </FlexContainer>
            </Column>
            <Column md={6}>
              {mainpitch.steps.map((step, index) => (
                <div
                  key={step.title}
                  style={{
                    marginLeft: doubleSpacer,
                    paddingLeft: doubleSpacer,
                    paddingBottom: baseSpacer,
                    borderLeft: `2px solid ${brandTertiaryHover}`,
                  }}
                >
                  <Heading as="h3" styledAs="subtitle" beforeContent={index + 1}>
                    {step.title}
                  </Heading>
                  <ReactMarkdown source={step.body} />
                </div>
              ))}
            </Column>
          </Row>
          <div style={{ textAlign: 'center' }}>
            <br />
            <br />
            <Button type="link" to="/agents">
              {mainpitch.ctaText}
            </Button>
          </div>
        </PageContainer>
      </section>

      <section style={{ padding: `${doubleSpacer} 0`, backgroundColor: white }}>
        <PageContainer>
          <Row>
            <Column md={8}>
              <Heading as="h2" styledAs="title">
                {secondpitch.title}
              </Heading>
              <ReactMarkdown source={secondpitch.description} />
              <Button type="link" to="/agents">
                {secondpitch.ctaText}
              </Button>
              <br />
              <br />
            </Column>
            <Column md={4}>
              <SectionImageWrapper>
                <PreviewCompatibleImage
                  imageInfo={{
                    image: secondpitch.image,
                    alt: '',
                  }}
                />
              </SectionImageWrapper>
            </Column>
          </Row>
        </PageContainer>
      </section>

      <section style={{ padding: `${doubleSpacer} 0`, backgroundColor: lightestGray }}>
        <PageContainer>
          <Row>
            <Column md={4} xsOrder={2} mdOrder={1}>
              <SectionImageWrapper>
                <PreviewCompatibleImage
                  imageInfo={{
                    image: thirdpitch.image,
                    alt: '',
                  }}
                />
              </SectionImageWrapper>
            </Column>
            <Column md={8} xsOrder={1} mdOrder={2}>
              <Heading as="h2" styledAs="title">
                {thirdpitch.title}
              </Heading>
              <ReactMarkdown source={thirdpitch.description} />
              <Button type="link" to="/agent/sign-up">
                {thirdpitch.ctaText}
              </Button>
              <br />
              <br />
            </Column>
          </Row>
        </PageContainer>
      </section>

      {false && ( // TODO: testimonials
        <section style={{ padding: `${doubleSpacer} 0` }}>
          <PageContainer>
            <Heading as="h4" styledAs="title" align="center">
              Testimonials
            </Heading>
            <CarouselWrapper>
              <Carousel
                fade
                nextIcon={<FaChevronRight color={textColor} />}
                prevIcon={<FaChevronLeft color={textColor} />}
              >
                {testimonials.map((testimonial) => (
                  <Carousel.Item key={testimonial.author}>
                    <Testimonial testimonial={testimonial} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </CarouselWrapper>
          </PageContainer>
        </section>
      )}
      <section
        style={{
          padding: `${quadrupleSpacer} 0`,
          textAlign: 'center',
          backgroundColor: brandPrimary,
          marginBottom: `-${doubleSpacer}`,
        }}
      >
        <PageContainer>
          <Heading as="h2" align="center" inverse>
            Welcome to RealtyOffer
          </Heading>
          <Heading as="h3" align="center" inverse>
            Same agent, less commission. <br />
          </Heading>
          {/* todo: consumer/start */}
          <Button type="link" to="/agent/sign-up" color="tertiary">
            Get Started Now
          </Button>
        </PageContainer>
      </section>
    </div>
  );
};

const AgentsPage = ({ data }: { data: { markdownRemark: { frontmatter: AgentsPageProps } } }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <AgentsPageTemplate
      heroImage={frontmatter.heroImage}
      mobileHeroImage={frontmatter.mobileHeroImage}
      title={frontmatter.title}
      heroHeading={frontmatter.heroHeading}
      heroSubheading={frontmatter.heroSubheading}
      mainpitch={frontmatter.mainpitch}
      secondpitch={frontmatter.secondpitch}
      thirdpitch={frontmatter.thirdpitch}
      testimonials={frontmatter.testimonials}
    />
  );
};

export default AgentsPage;

export const pageQuery = graphql`
  query AgentsPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "agents" } }) {
      frontmatter {
        title
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mobileHeroImage {
          childImageSharp {
            fluid(maxWidth: 768, quality: 60) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        heroHeading
        heroSubheading
        mainpitch {
          title
          videoUrl
          description
          ctaText
          image {
            childImageSharp {
              fluid(maxWidth: 300, quality: 60) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          steps {
            title
            body
          }
        }
        secondpitch {
          title
          videoUrl
          description
          ctaText
          image {
            childImageSharp {
              fluid(maxWidth: 300, quality: 60) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        thirdpitch {
          title
          videoUrl
          description
          ctaText
          image {
            childImageSharp {
              fluid(maxWidth: 300, quality: 60) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        testimonials {
          quote
          author
          avatar {
            childImageSharp {
              fluid(maxWidth: 300, quality: 60) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;