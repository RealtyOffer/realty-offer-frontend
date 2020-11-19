import React, { FunctionComponent, useState, useEffect } from 'react';
import { graphql, navigate } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import scrollTo from 'gatsby-plugin-smoothscroll';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import {
  Row,
  Column,
  Box,
  Button,
  FlexContainer,
  HeroImage,
  Heading,
  PageContainer,
  Seo,
  Testimonial,
} from '../components';

import { baseSpacer, doubleSpacer, quadrupleSpacer, breakpoints } from '../styles/size';
import {
  brandPrimary,
  brandPrimaryAccentLight,
  brandTertiaryHover,
  lightestGray,
  textColor,
} from '../styles/color';
import numberWithCommas from '../utils/numberWithCommas';
import { RootState } from '../redux/ducks';

type IndexPageProps = {
  title: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: { childImageSharp: { fluid: FluidObject } };
  consumer: {
    title: string;
    subtitle: string;
    body: any;
  };
  mainpitch: {
    title: string;
    videoUrl: string;
    steps: Array<{
      title: string;
      body: any;
    }>;
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
  background-color: rgba(0, 0, 0, 0.4);
  padding: ${baseSpacer};
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding: ${doubleSpacer};
  }
`;

const SlidderWrapper = styled.div`
  & .rangeslider {
    box-shadow: none;
    background-color: ${brandPrimaryAccentLight};
  }

  & .rangeslider-horizontal .rangeslider__fill {
    background-color: ${brandTertiaryHover};
    box-shadow: none;
  }

  & .rangeslider .rangeslider__handle {
    background: ${brandTertiaryHover};
    border-color: ${brandTertiaryHover};
    box-shadow: none;
    outline: none;
  }

  & .rangeslider-horizontal .rangeslider__handle:after {
    content: none;
  }
`;

const CarouselWrapper = styled.div`
  & .carousel-indicators li {
    background-color: ${textColor};
  }
`;

export const IndexPageTemplate: FunctionComponent<IndexPageProps> = ({
  heroImage,
  title,
  heroHeading,
  heroSubheading,
  consumer,
  mainpitch,
  testimonials,
}) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [sellRange, setSellRange] = useState(250000);
  const [buyRange, setBuyRange] = useState(350000);

  useEffect(() => {
    if (auth.isLoggedIn) {
      if (auth.roles.includes('Agent')) {
        navigate('/agent/listings/new');
      }
      if (auth.roles.includes('Consumer')) {
        navigate('/consumer/listing');
      }
    }
  }, []);

  return (
    <div>
      <Seo title={title} />
      <HeroImage imgSrc={heroImage}>
        <HeroBox>
          <Heading inverse>{heroHeading}</Heading>
          <Heading inverse as="h2">
            {heroSubheading}
          </Heading>
          <Button type="button" onClick={() => scrollTo('#start')}>
            Get Started Now
          </Button>
        </HeroBox>
      </HeroImage>
      <section id="start" style={{ padding: `${doubleSpacer} 0`, textAlign: 'center' }}>
        <PageContainer>
          <Row>
            <Column md={8} mdOffset={2}>
              <Heading as="h3" styledAs="title" align="center">
                {consumer.title}
              </Heading>
              <Heading as="h4" styledAs="subtitle" align="center">
                {consumer.subtitle}
              </Heading>
              <ReactMarkdown source={consumer.body} />
            </Column>
          </Row>
        </PageContainer>
      </section>
      <section style={{ backgroundColor: brandPrimaryAccentLight, padding: `${doubleSpacer} 0` }}>
        <PageContainer>{/* todo: logos */}</PageContainer>
      </section>
      <section style={{ padding: `${doubleSpacer} 0` }}>
        <PageContainer>
          <Heading as="h2" styledAs="title" align="center">
            {mainpitch.title}
          </Heading>
          <Row>
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
            <Column md={6}>
              <FlexContainer height="100%">
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
          </Row>
        </PageContainer>
      </section>
      <section style={{ padding: `${doubleSpacer} 0`, backgroundColor: lightestGray }}>
        <PageContainer>
          <Heading as="h4" styledAs="title" align="center">
            Estimate your savings!
          </Heading>
          <Heading as="h5" styledAs="subtitle" align="center">
            Scroll &amp; see your savings, whether buying, selling, or both...
          </Heading>
          <Row>
            <Column md={6}>
              <Box>
                <Heading as="h4" styledAs="title">
                  Selling Your Home
                </Heading>
                <SlidderWrapper>
                  <p>Select Your Estimated Sale Price: {`$${numberWithCommas(sellRange)}`}</p>
                  <Slider
                    min={100000}
                    max={2000000}
                    step={50000}
                    value={sellRange}
                    tooltip={false}
                    labels={{
                      100000: '$100k',
                      500000: '$500k',
                      1000000: '$1M',
                      1500000: '$1.5M',
                      2000000: '$2M',
                    }}
                    onChange={(value) => setSellRange(value)}
                  />
                </SlidderWrapper>
                <br />
                <Heading as="h4" styledAs="subtitle" noMargin>
                  Your Estimated Savings:{' '}
                  {`$${numberWithCommas(sellRange * 0.02)} - $${numberWithCommas(
                    sellRange * 0.03
                  )}`}
                </Heading>
                <p>
                  <small>Average savings of 2% to 3%</small>
                </p>
              </Box>
            </Column>
            <Column md={6}>
              <Box>
                <Heading as="h4" styledAs="title">
                  Buying Your Home
                </Heading>
                <SlidderWrapper>
                  <p>Select Your Estimated Purchase Price: {`$${numberWithCommas(buyRange)}`}</p>
                  <Slider
                    min={100000}
                    max={2000000}
                    step={50000}
                    value={buyRange}
                    tooltip={false}
                    labels={{
                      100000: '$100k',
                      500000: '$500k',
                      1000000: '$1M',
                      1500000: '$1.5M',
                      2000000: '$2M',
                    }}
                    onChange={(value) => setBuyRange(value)}
                  />
                </SlidderWrapper>
                <br />
                <Heading as="h4" styledAs="subtitle" noMargin>
                  Your Estimated Cash Back:{' '}
                  {`$${numberWithCommas(buyRange * 0.01)} - $${numberWithCommas(buyRange * 0.02)}`}
                </Heading>
                <p>
                  <small>Average cash back towards closings costs of 1% to 2%</small>
                </p>
              </Box>
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
            Same agent, less commission.
          </Heading>
          {/* todo: consumer/start */}
          <Button type="link" to="/consumer-landing" color="tertiary">
            Get Started Now
          </Button>
        </PageContainer>
      </section>
    </div>
  );
};

const IndexPage = ({ data }: { data: { markdownRemark: { frontmatter: IndexPageProps } } }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <IndexPageTemplate
      heroImage={frontmatter.heroImage}
      title={frontmatter.title}
      heroHeading={frontmatter.heroHeading}
      heroSubheading={frontmatter.heroSubheading}
      consumer={frontmatter.consumer}
      mainpitch={frontmatter.mainpitch}
      testimonials={frontmatter.testimonials}
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
          subtitle
          body
        }
        mainpitch {
          title
          videoUrl
          steps {
            title
            body
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
