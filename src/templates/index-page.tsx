/* eslint-disable @typescript-eslint/camelcase */
import { Link } from '@reach/router';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { graphql, navigate } from 'gatsby';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { FixedObject, FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import * as FaIcon from 'react-icons/fa';
import { IconType } from 'react-icons';

import {
  Row,
  Column,
  Box,
  Button,
  Heading,
  PageContainer,
  Seo,
  Testimonial,
  FlexContainer,
  PreviewCompatibleImage,
  SavingsCalculator,
  HeroImage,
  ClientOnly,
} from '../components';

import {
  baseSpacer,
  breakpoints,
  doubleSpacer,
  halfSpacer,
  decupleSpacer,
  tripleSpacer,
  quadrupleSpacer,
} from '../styles/size';
import {
  brandPrimary,
  brandTertiary,
  brandTertiaryHover,
  lightestGray,
  lightGray,
  offWhite,
  textColor,
  white,
} from '../styles/color';
import { RootState } from '../redux/ducks';
import { z1Shadow } from '../styles/mixins';

type HeroNavItemType = {
  heroLink: string;
  heroNavText: string;
  heroNavIcon: IconType;
};

type SectionOneType = {
  mainImage: { childImageSharp: { fluid: FluidObject } };
  secondaryImage: { childImageSharp: { fluid: FluidObject } };
  heading: string;
  content: string;
  callToActionText: string;
  callToActionLink: string;
};

type IndexPageProps = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  title: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: { childImageSharp: { fluid: FluidObject; fixed: FixedObject } };
  mobileHeroImage: { childImageSharp: { fluid: FluidObject } };
  heroCTA: string;
  heroNav: HeroNavItemType[];
  sectionOneHeading: string;
  sectionOne: SectionOneType[];
  sectionTwoHeading: string;
  sectionTwoContent: string;
  sectionTwoListHeading: string;
  sectionTwoListItems: Array<{ item: string }>;
  sectionThreeHeading: string;
  sectionThreeContent: string;
  sectionFourHeading: string;
  sectionFourContent: string;
  sectionFourLogosHeading: string;
  sectionFourLogos: Array<{
    logo: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
  }>;
  sectionFiveHeading: string;
  sectionFiveContent: string;
  sectionFiveCards: Array<{
    image: { childImageSharp: { fixed: FixedObject } };
    heading: string;
    content: string;
    callToActionText: string;
    callToActionLink: string;
  }>;
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

const CarouselWrapper = styled.div`
  isolation: isolate;
  margin-top: -${baseSpacer};
  @media only screen and (min-width: ${breakpoints.sm}) {
    margin-top: -${doubleSpacer};
  }
`;

const CarouselNavigationBackground = styled.div`
  background: ${lightestGray};
  box-shadow: ${z1Shadow};

  & > div > div > div:first-of-type {
    border-left: 1px solid ${lightGray};
  }
  & > div > div > div {
    border-right: 1px solid ${lightGray};
    border-bottom: 1px solid ${lightGray};
    &:hover,
    &:focus {
      background: ${offWhite};
    }
  }
`;

const CarouselNavigationItem = styled(Link)`
  padding: ${baseSpacer};
  text-align: center;
  color: ${brandTertiary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus {
    color: ${brandTertiaryHover};
  }
`;

const SectionCarouselWrapper = styled.div`
  isolation: isolate;
  & .carousel-indicators {
    bottom: -${tripleSpacer};
    & li {
      margin: ${halfSpacer};
      border: 1px solid ${brandPrimary};
      width: ${halfSpacer};
      height: ${halfSpacer};
      border-radius: ${halfSpacer};
      &.active {
        background-color: ${brandPrimary};
      }
    }
  }
`;

export const IndexPageTemplate: FunctionComponent<IndexPageProps> = ({
  metaTitle,
  metaDescription,
  metaKeywords,
  heroImage,
  mobileHeroImage,
  heroHeading,
  heroSubheading,
  heroCTA,
  heroNav,
  sectionOneHeading,
  sectionOne,
  sectionTwoHeading,
  sectionTwoContent,
  sectionThreeHeading,
  sectionThreeContent,
  sectionFourHeading,
  sectionFourContent,
  sectionFourLogosHeading,
  sectionFourLogos,
  sectionFiveHeading,
  sectionFiveContent,
  sectionFiveCards,
  testimonials,
}) => {
  const auth = useSelector((state: RootState) => state.auth);

  const [activeCalculator, setActiveCalculator] = useState(0);

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

  const numberOfLogosPerSlide = 4;
  const logosArray = new Array(Math.ceil(sectionFourLogos.length / numberOfLogosPerSlide))
    .fill([])
    .map(() => sectionFourLogos.splice(0, numberOfLogosPerSlide));

  return (
    <div>
      <Seo
        title={metaTitle}
        description={metaDescription}
        meta={[{ name: 'keywords', content: metaKeywords }]}
        image={heroImage.childImageSharp.fixed.src}
        imageWidth={heroImage.childImageSharp.fixed.width}
        imageHeight={heroImage.childImageSharp.fixed.height}
      />
      <HeroImage imgSrc={heroImage} mobileImgSrc={mobileHeroImage} hasOverlay>
        <PageContainer>
          <Row>
            <Column md={7}>
              <Heading styledAs="title">{heroHeading}</Heading>
              <Heading as="h6">
                <ReactMarkdown source={heroSubheading} />
              </Heading>
              <Button type="button" onClick={() => scrollTo('#start')} color="tertiary" rightspacer>
                {heroCTA}
              </Button>
              <Button
                type="link"
                to="/consumer/start"
                color="primary"
                onClick={() =>
                  window.gtag('event', 'conversion', {
                    send_to: 'AW-10961963802/9iBfCO-v6YUYEJqWieso',
                  })
                }
              >
                Get Started
              </Button>
            </Column>
          </Row>
        </PageContainer>
      </HeroImage>

      <CarouselNavigationBackground>
        <PageContainer>
          <Row>
            {heroNav.map((heroItem) => {
              const Icon = FaIcon[heroItem.heroNavIcon];
              return (
                <Column key={heroItem.heroNavText} xs={6} sm={3}>
                  <CarouselNavigationItem to={heroItem.heroLink}>
                    <Icon size={doubleSpacer} style={{ margin: halfSpacer }} />
                    <br />
                    {heroItem.heroNavText}
                    <br />
                    <small>
                      Learn more <FaChevronRight />
                    </small>
                  </CarouselNavigationItem>
                </Column>
              );
            })}
          </Row>
        </PageContainer>
      </CarouselNavigationBackground>
      <section
        id="start"
        style={{ padding: `${decupleSpacer} 0`, background: white, marginBottom: doubleSpacer }}
      >
        <PageContainer>
          <Heading as="h3" styledAs="title" align="center">
            {sectionOneHeading}
          </Heading>
          {sectionOne.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Row key={item.callToActionLink + index} style={{ marginTop: quadrupleSpacer }}>
              <Column md={6} xsOrder={index % 2 === 0 ? 2 : 1} mdOrder={index % 2 === 0 ? 1 : 2}>
                <FlexContainer
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  style={{ padding: tripleSpacer }}
                >
                  <PreviewCompatibleImage
                    width="400px"
                    height="452px"
                    imageInfo={{
                      image: item.mainImage,
                      alt: '',
                    }}
                  />
                </FlexContainer>
              </Column>
              <Column
                md={4}
                mdOffset={index % 2 === 0 ? 1 : 2}
                xsOrder={index % 2 === 0 ? 2 : 1}
                mdOrder={index % 2 === 0 ? 2 : 1}
              >
                <FlexContainer
                  height="100%"
                  flexWrap="nowrap"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Heading as="h2" styledAs="subtitle">
                    {item.heading}
                  </Heading>

                  <ReactMarkdown source={item.content} />

                  {index === 2 && (
                    <Button type="link" to={item.callToActionLink} color="primary" onClick={() =>
                  window.gtag('event', 'conversion', {
                    send_to: 'AW-10961963802/9iBfCO-v6YUYEJqWieso',
                  })
                }>
                      {item.callToActionText}
                    </Button>
                  )}
                </FlexContainer>
              </Column>
            </Row>
          ))}{' '}
        </PageContainer>
      </section>

      <section style={{ padding: `${decupleSpacer} 0`, backgroundColor: brandTertiary }}>
        <PageContainer>
          <Row>
            <Column md={8} mdOffset={2}>
              <div style={{ textAlign: 'center' }}>
                <Heading as="h2" align="center" inverse>
                  {sectionTwoHeading}
                </Heading>
                <p style={{ color: white }}>{sectionTwoContent}</p>
              </div>
            </Column>
          </Row>
        </PageContainer>
      </section>

      <section style={{ padding: `${decupleSpacer} 0` }}>
        <PageContainer>
          <Row>
            <Column md={8} mdOffset={2}>
              <div style={{ textAlign: 'center' }}>
                <Heading as="h2" styledAs="subtitle" align="center">
                  {sectionThreeHeading}
                </Heading>
                <p>{sectionThreeContent}</p>
                <p>
                  <Button
                    type="button"
                    onClick={() => setActiveCalculator(0)}
                    color={activeCalculator === 0 ? 'tertiary' : 'primaryOutline'}
                    rightspacer
                  >
                    Buy
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveCalculator(1)}
                    color={activeCalculator === 1 ? 'tertiary' : 'primaryOutline'}
                  >
                    Sell
                  </Button>
                </p>
              </div>
            </Column>
          </Row>
          <Box>
            <SavingsCalculator type={activeCalculator === 0 ? 'buying' : 'selling'} />
          </Box>
          <Row>
            <Column md={8} mdOffset={2}>
              <p style={{ textAlign: 'center', opacity: 0.8 }}>
                <small>
                  <em>
                    * The above averages are based on our current customer deals. These numbers can
                    be lower, and or higher depending on the listing. The average Selling commission
                    for a home listed at $200,000 will be a lot higher than that of a home listed
                    for $1,000,000.
                  </em>
                </small>
              </p>
            </Column>
          </Row>
        </PageContainer>
      </section>
      <section
        style={{ padding: `${decupleSpacer} 0`, backgroundColor: white, textAlign: 'center' }}
      >
        <PageContainer>
          <Heading as="h4" styledAs="title" align="center">
            {sectionFourHeading}
          </Heading>
          <Heading as="h5" styledAs="subtitle" align="center">
            {sectionFourContent}
          </Heading>
          <p>{sectionFourLogosHeading}</p>
        </PageContainer>
        <ClientOnly>
          <SectionCarouselWrapper>
            <Carousel slide controls={false}>
              {logosArray.map((logos, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Carousel.Item key={`carousel-logo+${index}`}>
                  <div>
                    <Row>
                      {logos.map((item, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Column xs={6} md={3} key={item.logo.childImageSharp.fixed.src + i}>
                          <div>
                            <PreviewCompatibleImage
                              width="100px"
                              height="100px"
                              imageInfo={{
                                image: item.logo,
                                alt: '',
                              }}
                            />
                          </div>
                        </Column>
                      ))}
                    </Row>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </SectionCarouselWrapper>
        </ClientOnly>
      </section>
      {false && ( // TODO: testimonials
        <section style={{ padding: `${decupleSpacer} 0` }}>
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
          padding: `${decupleSpacer} 0`,
          textAlign: 'center',
          backgroundColor: brandPrimary,
          marginBottom: `-${doubleSpacer}`,
        }}
      >
        <PageContainer>
          <Heading as="h2" align="center" inverse>
            Welcome to RealtyOffer&trade;
          </Heading>
          <p style={{ color: white }}>Ready to get paid to Buy or Sell your home?</p>
          <Button
            type="link"
            to="/consumer/start"
            color="tertiary"
            onClick={() =>
              window.gtag('event', 'conversion', {
                send_to: 'AW-10961963802/9iBfCO-v6YUYEJqWieso',
              })
            }
          >
            Get Started Now
          </Button>
        </PageContainer>
      </section>
      <section
        style={{
          padding: `${decupleSpacer} 0`,
          backgroundColor: lightestGray,
          marginBottom: `-${doubleSpacer}`,
        }}
      >
        <PageContainer>
          <Heading as="h2" align="center" styledAs="title">
            {sectionFiveHeading}
          </Heading>
          <Heading as="h6" align="center">
            {sectionFiveContent}
          </Heading>
          <br />
          <Row>
            {sectionFiveCards.map((card) => (
              <Column sm={6} lg={3} key={card.heading}>
                <Box>
                  <FlexContainer
                    justifyContent="space-between"
                    flexDirection="column"
                    height="100%"
                    alignItems="flex-start"
                  >
                    <div style={{ width: '100%' }}>
                      <div style={{ margin: '0 auto', textAlign: 'center', width: '100%' }}>
                        <PreviewCompatibleImage
                          width="200px"
                          height="148px"
                          imageInfo={{ image: card.image, alt: '' }}
                        />
                      </div>
                      <br />
                      <br />
                      <Heading as="h6">{card.heading}</Heading>
                      <p>{card.content}</p>
                    </div>
                    <Link to={card.callToActionLink} onClick={() =>
                  window.gtag('event', 'conversion', {
                    send_to: 'AW-10961963802/9iBfCO-v6YUYEJqWieso',
                  })
                }>{card.callToActionText} &rarr;</Link>
                  </FlexContainer>
                </Box>
              </Column>
            ))}
          </Row>
        </PageContainer>
      </section>
    </div>
  );
};

const IndexPage = ({ data }: { data: { markdownRemark: { frontmatter: IndexPageProps } } }) => {
  const { frontmatter } = data.markdownRemark;

  return <IndexPageTemplate {...frontmatter} />;
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        metaTitle
        metaDescription
        metaKeywords
        title
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2400, quality: 60) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1080, quality: 60) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        mobileHeroImage {
          childImageSharp {
            fluid(maxWidth: 512, quality: 40) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        heroHeading
        heroSubheading
        heroCTA
        heroNav {
          heroLink
          heroNavText
          heroNavIcon
        }
        sectionOneHeading
        sectionOne {
          mainImage {
            childImageSharp {
              fixed(width: 800, quality: 60) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          secondaryImage {
            childImageSharp {
              fluid(maxWidth: 600, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          heading
          content
          callToActionLink
          callToActionText
        }
        sectionTwoHeading
        sectionTwoContent
        sectionTwoListHeading
        sectionTwoListItems {
          item
        }
        sectionThreeHeading
        sectionThreeContent
        sectionFourHeading
        sectionFourContent
        sectionFourLogosHeading
        sectionFourLogos {
          logo {
            childImageSharp {
              fixed(width: 200, quality: 60) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        sectionFiveHeading
        sectionFiveContent
        sectionFiveCards {
          image {
            childImageSharp {
              fixed(width: 400, quality: 60) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          heading
          content
          callToActionText
          callToActionLink
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
