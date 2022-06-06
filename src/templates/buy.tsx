import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import * as FaIcon from 'react-icons/fa';
import { IconType } from 'react-icons';
import { LiteYoutubeEmbed } from 'react-lite-yt-embed';

import {
  Row,
  Column,
  Button,
  HeroImage,
  Heading,
  PageContainer,
  Seo,
  PreviewCompatibleImage,
  SavingsCalculator,
  Avatar,
  Box,
  FlexContainer,
} from '../components';

import { doubleSpacer, decupleSpacer, halfSpacer, tripleSpacer, baseSpacer } from '../styles/size';
import { brandPrimary, lightestGray, white } from '../styles/color';
import useWindowSize from '../utils/useWindowSize';

type BuyPageProps = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: { childImageSharp: { fluid: FluidObject; fixed: FixedObject } };
  mobileHeroImage: { childImageSharp: { fluid: FluidObject } };
  sectionOneHeading: string;
  sectionOneSubheading: string;
  sectionOneImage: { childImageSharp: { fluid: FluidObject } };
  sectionOneContent: string;
  sectionTwoHeading: string;
  sectionTwoSubheading: string;
  sectionTwoImage: { childImageSharp: { fluid: FluidObject } };
  sectionTwoContent: string;
  sectionThreeHeading: string;
  sectionThreeList: Array<{ icon: IconType; text: string }>;
  sectionFourHeading: string;
  sectionFourSubheading: string;
  testimonials: Array<{
    quote: string;
    author: string;
    from: string;
    saved: string;
    avatar: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  }>;
};

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

export const BuyPageTemplate: FunctionComponent<BuyPageProps> = ({
  heroImage,
  mobileHeroImage,
  metaTitle,
  metaDescription,
  metaKeywords,
  heroHeading,
  heroSubheading,
  sectionOneHeading,
  sectionOneSubheading,
  sectionOneImage,
  sectionOneContent,
  sectionTwoHeading,
  sectionTwoSubheading,
  sectionTwoImage,
  sectionTwoContent,
  sectionThreeHeading,
  sectionThreeList,
  sectionFourHeading,
  sectionFourSubheading,
  testimonials,
}) => {
  const size = useWindowSize();

  const chunkedTestimonials = (arr: BuyPageProps['testimonials']) => {
    const chunkSize = size.isSmallScreen ? 1 : 3;
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

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
            </Column>
          </Row>
        </PageContainer>
      </HeroImage>
      <section style={{ padding: `${decupleSpacer} 0`, backgroundColor: lightestGray }}>
        <PageContainer>
          <Row>
            <Column sm={8}>
              <Heading as="h2" styledAs="title">
                {sectionOneHeading}
              </Heading>
              <Heading as="h3" styledAs="subtitle">
                {sectionOneSubheading}
              </Heading>
              <ReactMarkdown source={sectionOneContent} />
            </Column>
            <Column xs={8} xsOffset={2} sm={4}>
              <PreviewCompatibleImage
                imageInfo={{
                  image: sectionOneImage.childImageSharp.fluid.src,
                  alt: '',
                }}
              />
              <br />
              <br />
            </Column>
          </Row>

          <Box>
            <SavingsCalculator type="buying" />
          </Box>
        </PageContainer>
      </section>
      <section
        style={{
          padding: `${decupleSpacer} 0`,
          backgroundColor: white,
        }}
      >
        <PageContainer>
          <Row>
            <Column md={8}>
              <Heading as="h2" styledAs="title">
                {sectionTwoHeading}
              </Heading>
              <Heading as="h3" styledAs="subtitle">
                {sectionTwoSubheading}
              </Heading>
              <ReactMarkdown source={sectionTwoContent} />
              <Button type="link" to="/consumer/start">
                Find your RealtyOffer&trade; Agent
              </Button>
            </Column>
            <Column md={4}>
              <PreviewCompatibleImage
                imageInfo={{
                  image: sectionTwoImage.childImageSharp.fluid.src,
                  alt: '',
                }}
              />
            </Column>
          </Row>
        </PageContainer>
      </section>

      <section style={{ padding: `${decupleSpacer} 0`, backgroundColor: lightestGray }}>
        <PageContainer>
          <Heading as="h2" align="center">
            {sectionThreeHeading}
          </Heading>
          <br />
          <br />
          <Row>
            {sectionThreeList.map((item) => {
              const Icon = FaIcon[item.icon];
              return (
                <Column sm={6} key={item.text}>
                  <Row>
                    <Column xs={2} md={1}>
                      <Icon size={doubleSpacer} />
                    </Column>
                    <Column xs={9} md={10}>
                      <p>{item.text}</p>
                    </Column>
                  </Row>
                  <br />
                </Column>
              );
            })}
          </Row>
          <br />
          <br />
          <Heading as="h3" align="center">
            Questions?
          </Heading>
          <p style={{ textAlign: 'center' }}>
            Chat with one of our live consultants to get answers, or call us at{' '}
            <a href="tel:+12489152654">(248) 915-2654</a>.
          </p>
          <br />
          <br />
        </PageContainer>
      </section>

      {/* <section
        style={{
          padding: `${decupleSpacer} 0`,
          backgroundColor: white,
        }}
      >
        <PageContainer>
          <Heading as="h2" styledAs="title" align="center">
            {sectionFourHeading}
          </Heading>
          <Heading as="h3" styledAs="subtitle" align="center">
            {sectionFourSubheading}
          </Heading>
          <br />
          <SectionCarouselWrapper>
            <Carousel
              nextIcon={<FaIcon.FaChevronRight color={brandPrimary} size={doubleSpacer} />}
              prevIcon={<FaIcon.FaChevronLeft color={brandPrimary} size={doubleSpacer} />}
            >
              {chunkedTestimonials(testimonials).map((arr, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Carousel.Item key={`carousel-logo+${index}`}>
                  <Row>
                    <Column xs={8} xsOffset={2} sm={8} smOffset={2}>
                      <Row>
                        {arr.map((item) => (
                          <Column xs={4} key={item.author}>
                            <Box>
                              <FlexContainer justifyContent="flex-start">
                                <Avatar
                                  src={item.avatar.childImageSharp.fluid.src}
                                  bottomMargin
                                  gravatarEmail=""
                                />
                                <div style={{ flex: 1, marginLeft: baseSpacer }}>
                                  <Heading as="h6" noMargin>
                                    {item.author}
                                  </Heading>
                                  <p>
                                    <small>{item.from}</small>
                                  </p>
                                </div>
                              </FlexContainer>
                              <p>
                                <FaIcon.FaQuoteLeft color={lightestGray} />
                                <br />
                                <em>{item.quote}</em>
                                <br />
                                <FaIcon.FaQuoteRight
                                  style={{ float: 'right' }}
                                  color={lightestGray}
                                />
                              </p>
                              <br />
                              <Heading as="h5">SAVED {item.saved}</Heading>
                            </Box>
                          </Column>
                        ))}
                      </Row>
                    </Column>
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </SectionCarouselWrapper>
        </PageContainer>
      </section> */}

      <section
        style={{
          padding: `${decupleSpacer} 0`,
          textAlign: 'center',
          backgroundColor: brandPrimary,
          marginBottom: `-${doubleSpacer}`,
        }}
      >
        <PageContainer>
          <Row>
            <Column md={6}>
              <FlexContainer
                height="100%"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Heading as="h2" align="center" inverse>
                  Welcome to RealtyOffer
                </Heading>
                <Heading as="h6" align="center" inverse>
                  Ready to get paid to Buy or Sell your home?
                </Heading>
                <Button type="link" to="/consumer/start" color="tertiary">
                  Get Started Now
                </Button>
                <br />
                <br />
              </FlexContainer>
            </Column>
            <Column md={6}>
              <LiteYoutubeEmbed id="USvuAqJF3Is" isMobile={Boolean(size.isSmallScreen)} lazyImage />
            </Column>
          </Row>
        </PageContainer>
      </section>
    </div>
  );
};

const BuyPage = ({ data }: { data: { markdownRemark: { frontmatter: BuyPageProps } } }) => {
  const { frontmatter } = data.markdownRemark;

  return <BuyPageTemplate {...frontmatter} />;
};

export default BuyPage;

export const pageQuery = graphql`
  query BuyPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "buy" } }) {
      frontmatter {
        title
        metaTitle
        metaDescription
        metaKeywords
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
        sectionOneHeading
        sectionOneSubheading
        sectionOneImage {
          childImageSharp {
            fluid(maxWidth: 512, quality: 60) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        sectionOneContent
        sectionTwoHeading
        sectionTwoImage {
          childImageSharp {
            fluid(maxWidth: 512, quality: 60) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        sectionTwoSubheading
        sectionTwoContent
        sectionThreeHeading
        sectionThreeList {
          text
          icon
        }
        sectionFourHeading
        sectionFourSubheading
        testimonials {
          quote
          author
          from
          saved
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
