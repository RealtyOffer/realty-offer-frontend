import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import * as FaIcon from 'react-icons/fa';
import { LiteYoutubeEmbed } from 'react-lite-yt-embed';

import {
  Row,
  Column,
  Button,
  FlexContainer,
  HeroImage,
  Heading,
  PageContainer,
  Seo,
  PreviewCompatibleImage,
  Box,
  Avatar,
} from '../components';

import { baseSpacer, doubleSpacer, decupleSpacer, halfSpacer, tripleSpacer } from '../styles/size';
import {
  brandDanger,
  brandPrimary,
  brandPrimaryAccentLight,
  brandSuccess,
  brandTertiary,
  headingsColor,
  lightestGray,
  white,
} from '../styles/color';
import appleAppStoreBadge from '../images/apple-app-store-black.svg';
import googlePlayStoreBadge from '../images/google-play-store-black.svg';
import useWindowSize from '../utils/useWindowSize';
import { baseBorderLightStyle } from '../styles/mixins';
import { fontSizeH6 } from '../styles/typography';

type AgentsPageProps = {
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
  sectionTwoSteps: Array<{
    heading: string;
    image: { childImageSharp: { fluid: FluidObject } };
    content: string;
  }>;
  sectionThreeHeading: string;
  sectionThreeContent: string;
  sectionThreeRowOne: string;
  sectionThreeRowTwo: string;
  sectionThreeRowThree: string;
  sectionFourHeading: string;
  sectionFourImage: { childImageSharp: { fluid: FluidObject } };
  sectionFourContent: string;
  sectionFiveHeading: string;
  sectionFiveContent: string;
  sectionFiveBackgroundImage: { childImageSharp: { fluid: FluidObject } };
  sectionSixHeading: string;
  sectionSixSubheading: string;
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

const Badge = styled.div`
  margin-right: ${baseSpacer};
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

const SimpleTable = styled.table`
  table-layout: fixed;
  & th,
  & td {
    border: ${baseBorderLightStyle};
    padding: ${halfSpacer};
    width: 33%;
  }
`;

export const AgentsPageTemplate: FunctionComponent<AgentsPageProps> = ({
  heroImage,
  mobileHeroImage,
  metaTitle,
  metaDescription,
  metaKeywords,
  heroHeading,
  heroSubheading,
  sectionOneHeading,
  sectionOneSubheading,
  sectionOneContent,
  sectionOneImage,
  sectionTwoHeading,
  sectionTwoSteps,
  sectionThreeHeading,
  sectionThreeContent,
  sectionThreeRowOne,
  sectionThreeRowTwo,
  sectionThreeRowThree,
  sectionFourHeading,
  sectionFourContent,
  sectionFourImage,
  sectionFiveHeading,
  sectionFiveContent,
  sectionFiveBackgroundImage,
  sectionSixHeading,
  sectionSixSubheading,
  testimonials,
}) => {
  const size = useWindowSize();

  const chunkedTestimonials = (arr: AgentsPageProps['testimonials']) => {
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
              <Button type="link" to="/agent/sign-up">
                Become an Agent
              </Button>
            </Column>
          </Row>
        </PageContainer>
      </HeroImage>
      <section style={{ padding: `${decupleSpacer} 0`, backgroundColor: brandPrimaryAccentLight }}>
        <PageContainer>
          <Row>
            <Column md={8}>
              <Heading as="h2" styledAs="title">
                {sectionOneHeading}
              </Heading>
              <Heading as="h3" styledAs="subtitle">
                {sectionOneSubheading}
              </Heading>
            </Column>
            <Column md={4}>
              <PreviewCompatibleImage
                imageInfo={{
                  image: sectionOneImage.childImageSharp.fluid.src,
                  alt: '',
                }}
              />
            </Column>
          </Row>
          <div style={{ fontSize: fontSizeH6 }}>
            <ReactMarkdown source={sectionOneContent} />
          </div>
        </PageContainer>
      </section>
      <section
        style={{
          padding: `${decupleSpacer} 0`,
          backgroundColor: lightestGray,
          color: brandTertiary,
        }}
      >
        <PageContainer>
          <Heading as="h2" styledAs="title" align="center">
            {sectionTwoHeading}
          </Heading>
          <br />
          <br />
          <Row>
            {sectionTwoSteps.map((step, index) => (
              <Column key={step.heading} sm={6} md={4}>
                <Box largePadding>
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: step.image.childImageSharp.fluid.src,
                      alt: '',
                    }}
                  />
                  <br />
                  <Heading as="h4">
                    {index + 1}. {step.heading}
                  </Heading>
                  <p>{step.content}</p>
                </Box>
              </Column>
            ))}
          </Row>
        </PageContainer>
      </section>

      <section style={{ padding: `${decupleSpacer} 0`, backgroundColor: white }}>
        <PageContainer>
          <Heading as="h2" styledAs="title">
            {sectionThreeHeading}
          </Heading>
          <ReactMarkdown source={sectionThreeContent} />
          <SimpleTable>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <strong>Free-mium Agent</strong>
                </th>
                <th style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <strong>Monthly Subscription</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <small>{sectionThreeRowOne}</small>
                </td>
                <td align="center">
                  <FaIcon.FaCheck color={brandSuccess} />
                </td>
                <td align="center">
                  <FaIcon.FaCheck color={brandSuccess} />
                </td>
              </tr>
              <tr>
                <td>
                  <small>{sectionThreeRowTwo}</small>
                </td>
                <td align="center">
                  <FaIcon.FaCheck color={brandSuccess} />
                </td>
                <td align="center">
                  <FaIcon.FaTimes color={brandDanger} />
                </td>
              </tr>
              <tr>
                <td>
                  <small>{sectionThreeRowThree}</small>
                </td>
                <td align="center">
                  <FaIcon.FaTimes color={brandDanger} />
                </td>
                <td align="center">
                  <FaIcon.FaCheck color={brandSuccess} />
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td align="center">
                  <Button type="link" to="/agent/sign-up" block>
                    Free-mium Sign Up
                  </Button>
                </td>
                <td align="center">
                  <Button type="link" to="/agent/sign-up" block>
                    Monthly Sign Up
                  </Button>
                </td>
              </tr>
            </tbody>
          </SimpleTable>
        </PageContainer>
      </section>

      <section
        style={{
          padding: `${decupleSpacer} 0`,
          backgroundColor: lightestGray,
          color: brandTertiary,
        }}
      >
        <PageContainer>
          <Row>
            <Column md={5}>
              <PreviewCompatibleImage
                imageInfo={{
                  image: sectionFourImage.childImageSharp.fluid.src,
                  alt: '',
                }}
              />
            </Column>
            <Column md={6} mdOffset={1}>
              <Heading as="h3">{sectionFourHeading}</Heading>
              <ReactMarkdown source={sectionFourContent} />
              <Button type="link" to="/agent/sign-up" block>
                Become a RealtyOffer Agent
              </Button>
            </Column>
          </Row>
        </PageContainer>
      </section>

      <HeroImage imgSrc={sectionFiveBackgroundImage}>
        <section style={{ padding: `${decupleSpacer} 0`, width: '100vw' }}>
          <PageContainer>
            <Row>
              <Column xs={6} xsOffset={6}>
                <Heading as="h2">{sectionFiveHeading}</Heading>
                <div style={{ color: headingsColor }}>{sectionFiveContent}</div>
                <FlexContainer flexDirection="row" justifyContent="flex-start">
                  <Badge>
                    <a href="https://apps.apple.com/us/app/realtyoffer/id1531733131">
                      <img
                        src={appleAppStoreBadge}
                        height={40}
                        width={122}
                        alt="Download on Apple App Store"
                      />
                    </a>
                  </Badge>
                  <Badge>
                    <a href="https://play.google.com/store/apps/details?id=com.realtyoffernative">
                      <img
                        src={googlePlayStoreBadge}
                        height={40}
                        width={122}
                        alt="Download on Google Play Store"
                      />
                    </a>
                  </Badge>
                </FlexContainer>
              </Column>
            </Row>
          </PageContainer>
        </section>
      </HeroImage>

      {/* <section
        style={{
          padding: `${decupleSpacer} 0`,
          backgroundColor: white,
        }}
      >
        <PageContainer>
          <Heading as="h2" styledAs="title" align="center">
            {sectionSixHeading}
          </Heading>
          <Heading as="h3" styledAs="subtitle" align="center">
            {sectionSixSubheading}
          </Heading>
          <br />
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
                          <Column md={4} key={item.author}>
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

                <Button type="link" to="/agent/sign-up" color="tertiary">
                  Get Started Now
                </Button>
                <br />
                <br />
              </FlexContainer>
            </Column>
            <Column md={6}>
              <LiteYoutubeEmbed id="R9jCqtpG770" isMobile={Boolean(size.isSmallScreen)} lazyImage />
            </Column>
          </Row>
        </PageContainer>
      </section>
    </div>
  );
};

const AgentsPage = ({ data }: { data: { markdownRemark: { frontmatter: AgentsPageProps } } }) => {
  const { frontmatter } = data.markdownRemark;

  return <AgentsPageTemplate {...frontmatter} />;
};

export default AgentsPage;

export const pageQuery = graphql`
  query AgentsPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "agents" } }) {
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
            fluid(maxWidth: 512, quality: 40) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        sectionOneContent
        sectionTwoHeading
        sectionTwoSteps {
          heading
          image {
            childImageSharp {
              fluid(maxWidth: 512, quality: 40) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          content
        }
        sectionThreeHeading
        sectionThreeContent
        sectionThreeRowOne
        sectionThreeRowTwo
        sectionThreeRowThree
        sectionFourHeading
        sectionFourImage {
          childImageSharp {
            fluid(maxWidth: 512, quality: 40) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        sectionFourContent
        sectionFiveHeading
        sectionFiveContent
        sectionFiveBackgroundImage {
          childImageSharp {
            fluid(maxWidth: 2400, quality: 60) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sectionSixHeading
        sectionSixSubheading
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
