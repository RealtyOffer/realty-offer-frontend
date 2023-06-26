/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
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
  Box,
  FlexContainer,
} from '../components';

import { doubleSpacer, decupleSpacer } from '../styles/size';
import { brandPrimary, lightestGray, white } from '../styles/color';
import useWindowSize from '../utils/useWindowSize';

type IndexPageProps = {
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

export const IndexPageTemplate: FunctionComponent<IndexPageProps> = ({
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
  sectionTwoContent,
  sectionThreeHeading,
  sectionThreeList,
}) => {
  const size = useWindowSize();

  return (
    <div>
      <Seo
        title={metaTitle}
        description={metaDescription}
        meta={[{ name: 'keywords', content: metaKeywords }]}
        image={heroImage.childImageSharp.fixed.src}
        imageWidth={heroImage.childImageSharp.fixed.width}
        imageHeight={heroImage.childImageSharp.fixed.height}
        script={[
          {
            type: 'text/javascript',
            innerHTML: `
            function checkForImg() {
              const ytImg = document.querySelector('img[src="https://i.ytimg.com/vi_webp/USvuAqJF3Is/maxresdefault.webp"]');
              if (ytImg) {
                ytImg.addEventListener('click', function() {
                  gtag('event', 'conversion', {
                    'send_to': 'AW-10961963802/VITvCMqQoNMDEJqWieso'
                  });
                });
              }
            }

            setTimeout(checkForImg, 1000);
            `,
          },
        ]}
      />
      <HeroImage imgSrc={heroImage} mobileImgSrc={mobileHeroImage} hasOverlay>
        <PageContainer>
          <Row>
            <Column lg={7}>
              <Heading styledAs="title">{heroHeading}</Heading>
              <Heading as="h6">
                <ReactMarkdown source={heroSubheading} />
              </Heading>
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
                Get Started
              </Button>
            </Column>
          </Row>
        </PageContainer>
      </HeroImage>
      <section
        style={{
          padding: `${decupleSpacer} 0`,
          backgroundColor: lightestGray,
        }}
      >
        <PageContainer>
          <Row>
            <Column md={5}>
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
            <Column md={6} mdOffset={1}>
              <LiteYoutubeEmbed id="USvuAqJF3Is" isMobile={Boolean(size.isSmallScreen)} lazyImage />
            </Column>
          </Row>
        </PageContainer>
      </section>

      <section style={{ padding: `${decupleSpacer} 0`, backgroundColor: white }}>
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
                  image: sectionOneImage,
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
            <Column md={8} mdOffset={2}>
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
                <br />
                <br />
              </FlexContainer>
            </Column>
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
  query BuyPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
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
