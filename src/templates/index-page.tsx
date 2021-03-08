import React, { FunctionComponent, useEffect } from 'react';
import { graphql, navigate } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import scrollTo from 'gatsby-plugin-smoothscroll';
import 'react-rangeslider/lib/index.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { LiteYoutubeEmbed } from 'react-lite-yt-embed';
import Loadable from '@loadable/component';

import {
  Row,
  Column,
  Button,
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
import { RootState } from '../redux/ducks';
import useWindowSize from '../utils/useWindowSize';

type IndexPageProps = {
  title: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: { childImageSharp: { fluid: FluidObject } };
  mobileHeroImage: { childImageSharp: { fluid: FluidObject } };
  consumer: {
    title: string;
    subtitle: string;
    body: any;
  };
  mainpitch: {
    title: string;
    youtubeVideoId: string;
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

const CarouselWrapper = styled.div`
  & .carousel-indicators li {
    background-color: ${textColor};
  }
`;

const EstimatedSalePriceSlider = Loadable(() => import('../components/EstimatedSalePrice'));
const EstimatedBuyPriceSlider = Loadable(() => import('../components/EstimatedBuyPrice'));

export const IndexPageTemplate: FunctionComponent<IndexPageProps> = ({
  heroImage,
  mobileHeroImage,
  title,
  heroHeading,
  heroSubheading,
  consumer,
  mainpitch,
  testimonials,
}) => {
  const auth = useSelector((state: RootState) => state.auth);

  const size = useWindowSize();

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
      <HeroImage imgSrc={heroImage} mobileImgSrc={mobileHeroImage}>
        <HeroBox>
          <Heading inverse>{heroHeading}</Heading>
          <Heading inverse as="h2">
            {heroSubheading}
          </Heading>
          <Button type="link" to="/consumer/start" rightspacer>
            Get Started Now
          </Button>
          <Button type="button" onClick={() => scrollTo('#start')} color="primaryOutline">
            Learn More
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
              <div style={{ marginTop: doubleSpacer }}>
                <LiteYoutubeEmbed
                  id={mainpitch.youtubeVideoId}
                  isMobile={Boolean(size.isSmallScreen)}
                  lazyImage
                />
              </div>
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
              <EstimatedSalePriceSlider />
            </Column>
            <Column md={6}>
              <EstimatedBuyPriceSlider />
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
            Same Agent, Less Commission.
          </Heading>
          {/* todo: consumer/start */}
          <Button type="link" to="/consumer/start" color="tertiary">
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
      mobileHeroImage={frontmatter.mobileHeroImage}
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
            fluid(maxWidth: 2048, quality: 60) {
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
        consumer {
          title
          subtitle
          body
        }
        mainpitch {
          title
          youtubeVideoId
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
