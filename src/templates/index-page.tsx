import { Link } from '@reach/router';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { graphql, navigate } from 'gatsby';
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
} from '../components';

import {
  baseSpacer,
  breakpoints,
  doubleSpacer,
  halfSpacer,
  decupleSpacer,
  tripleSpacer,
} from '../styles/size';
import {
  brandPrimary,
  brandTertiary,
  lightestGray,
  lightGray,
  textColor,
  white,
} from '../styles/color';
import { RootState } from '../redux/ducks';
import { z1Shadow } from '../styles/mixins';
import { fontSizeSmall } from '../styles/typography';

type CarouselItemType = {
  heroImage: { childImageSharp: { fluid: FluidObject; fixed: FixedObject } };
  heroHeading: string;
  heroContent: string;
  heroCTA: string;
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
  heroCarousel: CarouselItemType[];
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

const CarouselContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const CarouselWrapper = styled.div`
  isolation: isolate;
  margin-top: -${baseSpacer};
  @media only screen and (min-width: ${breakpoints.sm}) {
    margin-top: -${doubleSpacer};
  }
`;

const CarouselBackground = styled.div`
  height: 400px;
  background-image: ${(props: { imgSrc: CarouselItemType['heroImage'] }) =>
    `url('${props.imgSrc.childImageSharp.fluid.src}')`};
  background-repeat: no-repeat;
  background-size: 100%;
`;

const GradientOverlay = styled.div`
  background: rgb(255, 255, 255);
  background: linear-gradient(90deg, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 80%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const CarouselNavigationBackground = styled.div`
  background: ${lightestGray};
  box-shadow: ${z1Shadow};
`;

const CarouselNavigation = styled.div`
  display: flex;
  justify-content: center;
`;

const CarouselNavigationItem = styled.div<{ active: boolean }>`
  padding: ${baseSpacer};
  text-align: center;
  background: ${(props) => (props.active ? brandTertiary : 'inherit')};
  color: ${(props) => (props.active ? white : 'inherit')};
  border-right: 1px solid ${lightGray};
  flex: 1;
  &:first-of-type {
    border-left: 1px solid ${lightGray};
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
  heroCarousel,
  sectionOneHeading,
  sectionOne,
  sectionTwoHeading,
  sectionTwoContent,
  sectionTwoListHeading,
  sectionTwoListItems,
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

  const [activeCarouselItem, setActiveCarouselItem] = useState(0);
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
        image={heroCarousel[0].heroImage.childImageSharp.fixed.src}
        imageWidth={heroCarousel[0].heroImage.childImageSharp.fixed.width}
        imageHeight={heroCarousel[0].heroImage.childImageSharp.fixed.height}
      />
      <CarouselWrapper>
        <Carousel fade indicators={false} controls={false} activeIndex={activeCarouselItem}>
          {heroCarousel.map((heroItem) => (
            <Carousel.Item key={heroItem.heroHeading}>
              <CarouselBackground imgSrc={heroItem.heroImage} />
              <GradientOverlay />
              <CarouselContent>
                <FlexContainer justifyContent="center" alignItems="center" height="100%">
                  <PageContainer>
                    <Row>
                      <Column xs={8} sm={6}>
                        <Heading styledAs="title">{heroItem.heroHeading}</Heading>
                        <Heading as="h6">{heroItem.heroContent}</Heading>
                        <Button type="link" to={heroItem.heroLink} rightspacer>
                          {heroItem.heroCTA}
                        </Button>
                      </Column>
                    </Row>
                  </PageContainer>
                </FlexContainer>
              </CarouselContent>
            </Carousel.Item>
          ))}
        </Carousel>
      </CarouselWrapper>
      <CarouselNavigationBackground>
        <PageContainer>
          <CarouselNavigation>
            {heroCarousel.map((heroItem, index) => {
              const Icon = FaIcon[heroItem.heroNavIcon];
              return (
                <CarouselNavigationItem
                  role="button"
                  tabIndex={0}
                  key={heroItem.heroNavText}
                  onClick={() => setActiveCarouselItem(index)}
                  onKeyPress={() => setActiveCarouselItem(index)}
                  active={activeCarouselItem === index}
                >
                  <Icon size={doubleSpacer} style={{ margin: halfSpacer }} />
                  <br />
                  {heroItem.heroNavText}
                </CarouselNavigationItem>
              );
            })}
          </CarouselNavigation>
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
        </PageContainer>

        <SectionCarouselWrapper>
          <Carousel
            nextIcon={<FaChevronRight color={brandPrimary} size={doubleSpacer} />}
            prevIcon={<FaChevronLeft color={brandPrimary} size={doubleSpacer} />}
          >
            {sectionOne.map((item) => (
              <Carousel.Item key={item.heading}>
                <Row>
                  <Column xs={8} xsOffset={2} sm={8} smOffset={2}>
                    <Row>
                      <Column md={6}>
                        <FlexContainer justifyContent="center" alignItems="center" height="100%">
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: item.mainImage.childImageSharp.fluid.src,
                              alt: '',
                            }}
                          />
                        </FlexContainer>
                      </Column>
                      <Column md={6}>
                        <FlexContainer
                          justifyContent="center"
                          alignItems="center"
                          height="100%"
                          flexWrap="nowrap"
                          flexDirection="column"
                        >
                          <div style={{ height: 200, width: 200, margin: '0 auto' }}>
                            <PreviewCompatibleImage
                              imageInfo={{
                                image: item.secondaryImage.childImageSharp.fluid.src,
                                alt: '',
                              }}
                            />
                          </div>
                          <Heading as="h2" styledAs="subtitle">
                            {item.heading}
                          </Heading>

                          <ReactMarkdown source={item.content} />

                          <Button type="link" to={item.callToActionLink} block color="tertiary">
                            {item.callToActionText}
                          </Button>
                        </FlexContainer>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </SectionCarouselWrapper>
      </section>

      <section style={{ padding: `${decupleSpacer} 0` }}>
        <PageContainer>
          <Heading as="h2" styledAs="title" align="center">
            {sectionTwoHeading}
          </Heading>
          <Row>
            <Column lg={10} lgOffset={1}>
              <div style={{ textAlign: 'center' }}>
                <p>{sectionTwoContent}</p>
                <p>{sectionTwoListHeading}</p>
                <ul style={{ marginBottom: tripleSpacer }}>
                  {sectionTwoListItems.map((item) => (
                    <li key={item.item} style={{ display: 'inline-block', padding: baseSpacer }}>
                      <FaIcon.FaCircle
                        color={brandPrimary}
                        style={{ verticalAlign: 'initial', marginRight: halfSpacer }}
                        size={fontSizeSmall}
                      />{' '}
                      {item.item}
                    </li>
                  ))}
                </ul>
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
          <p style={{ textAlign: 'center', opacity: 0.8 }}>
            <small>
              <em>
                * The above averages are based on our current customer deals. These numbers can be
                lower, and or higher depending on the listing. The average Selling commission for a
                home listed at $200,000 will be a lot higher than that of a home listed for
                $1,000,000.
              </em>
            </small>
          </p>
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
        <SectionCarouselWrapper>
          <Carousel
            nextIcon={<FaChevronRight color={brandPrimary} size={doubleSpacer} />}
            prevIcon={<FaChevronLeft color={brandPrimary} size={doubleSpacer} />}
          >
            {logosArray.map((logos, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Carousel.Item key={`carousel-logo+${index}`}>
                <Row>
                  <Column xs={8} xsOffset={2} sm={8} smOffset={2}>
                    <Row>
                      {logos.map((item, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Column xs={3} key={item.logo.childImageSharp.fixed.src + i}>
                          <PreviewCompatibleImage
                            imageInfo={{ image: item.logo.childImageSharp.fixed.src, alt: '' }}
                          />
                        </Column>
                      ))}
                    </Row>
                  </Column>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </SectionCarouselWrapper>
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
          <Button type="link" to="/consumer/start" color="tertiary">
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
              <Column xs={6} md={3} key={card.heading}>
                <Box>
                  <FlexContainer
                    justifyContent="space-between"
                    flexDirection="column"
                    height="100%"
                    alignItems="flex-start"
                  >
                    <div style={{ height: 350 }}>
                      <PreviewCompatibleImage
                        imageInfo={{ image: card.image.childImageSharp.fixed.src, alt: '' }}
                      />
                      <br />
                      <br />
                      <Heading as="h6">{card.heading}</Heading>
                      <p>{card.content}</p>
                    </div>
                    <Link to={card.callToActionLink}>{card.callToActionText} &rarr;</Link>
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
        heroCarousel {
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
          heroHeading
          heroContent
          heroCTA
          heroLink
          heroNavText
          heroNavIcon
        }
        sectionOneHeading
        sectionOne {
          mainImage {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 60) {
                ...GatsbyImageSharpFluid
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
              fixed(width: 300, quality: 60) {
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
              fixed(width: 300, quality: 60) {
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
