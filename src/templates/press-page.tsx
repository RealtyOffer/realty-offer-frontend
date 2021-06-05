import React, { FunctionComponent } from 'react';
import { graphql, Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import styled from 'styled-components';
import {
  FaLinkedin,
  FaYoutubeSquare,
  FaInstagram,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa';

import {
  baseSpacer,
  doubleSpacer,
  breakpoints,
  baseSpacerUnit,
  borderRadius,
  baseAndAHalfSpacer,
} from '../styles/size';
import {
  HeroImage,
  PageContainer,
  Seo,
  Box,
  Heading,
  Column,
  Row,
  HorizontalRule,
  Button,
} from '../components';
import { brandPrimary } from '../styles/color';

type PressPageProps = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  title: string;
  heroImage: { childImageSharp: { fluid: FluidObject } };
  mobileHeroImage: { childImageSharp: { fluid: FluidObject } };
  pressItems: Array<{
    title: string;
    date: string;
    excerpt: string;
    link: string;
  }>;
};

const HeroBox = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  padding: ${baseSpacer};
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding: ${doubleSpacer};
  }
`;

const Swatch = styled.span`
  width: ${baseAndAHalfSpacer};
  height: ${baseAndAHalfSpacer};
  background-color: ${brandPrimary};
  display: inline-block;
  margin-right: ${baseSpacer};
  border-radius: ${borderRadius};
  vertical-align: middle;
`;

export const PressPageTemplate: FunctionComponent<PressPageProps> = (props) => {
  return (
    <>
      <Seo
        title={props.metaTitle}
        description={props.metaDescription}
        meta={[{ name: 'keywords', content: props.metaKeywords }]}
      />
      <HeroImage imgSrc={props.heroImage} mobileImgSrc={props.mobileHeroImage}>
        <PageContainer>
          <Row>
            <Column md={6} mdOffset={3}>
              <HeroBox>
                <small>PRESS</small>
                <Heading inverse>{props.title}</Heading>
              </HeroBox>
            </Column>
          </Row>
        </PageContainer>
      </HeroImage>
      <section style={{ padding: `${doubleSpacer} 0` }}>
        <PageContainer>
          <Row>
            <Column md={7} lg={8}>
              <Heading as="h2" styledAs="title">
                Recent News
              </Heading>
              <HorizontalRule />
              {props.pressItems.map((item) => (
                <article key={item.link}>
                  <Row>
                    <Column xs={8}>
                      <Heading as="h3" styledAs="subtitle">
                        {item.title}
                      </Heading>
                    </Column>
                    <Column xs={4}>
                      <p style={{ textAlign: 'right' }}>{item.date}</p>
                    </Column>
                  </Row>
                  <p>{item.excerpt}</p>
                  <p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  </p>
                  <HorizontalRule />
                </article>
              ))}
            </Column>
            <Column md={4} lg={3} mdOffset={1} lgOffset={1}>
              <div>
                <Box>
                  <Heading as="h3">Contact</Heading>
                  <HorizontalRule />
                  <Heading as="h4">Have a question?</Heading>
                  <p>
                    <strong>Email:</strong>
                    <br />
                    <a href="mailto:info@realtyoffer.com">info@realtyoffer.com</a>
                  </p>
                  <p>
                    <strong>Get in touch:</strong>
                    <br />
                    <Link to="/contact">Send us a message</Link>
                  </p>
                  <br />
                  <br />
                  <br />
                  <Heading as="h3">Media Kit</Heading>
                  <HorizontalRule />
                  <Heading as="h4">In print - &quot;RealtyOffer&quot;</Heading>
                  <p>One word, capital R, capital O</p>
                  <HorizontalRule />
                  <Heading as="h4">Brand Color</Heading>
                  <p>
                    <Swatch /> #0077CC
                  </p>
                  <HorizontalRule />
                  <Heading as="h4">Logo</Heading>
                  <div style={{ textAlign: 'center' }}>
                    <p>
                      <img
                        src="/img/logo-blue-with-white.png"
                        alt=""
                        style={{ width: '100%', maxWidth: 200 }}
                      />
                    </p>
                    <p>
                      <Button type="link" to="/img/logo-blue-with-white.png" color="text">
                        Download
                      </Button>
                    </p>
                    <p>
                      <img
                        src="/img/logo-white-with-blue.png"
                        alt=""
                        style={{ width: '100%', maxWidth: 200 }}
                      />
                    </p>
                    <p>
                      <Button type="link" to="/img/logo-white-with-blue.png" color="text">
                        Download
                      </Button>
                    </p>
                    <p>
                      <Button type="link" to="/img/logo.eps" color="primaryOutline">
                        Download .eps version
                      </Button>
                    </p>
                  </div>
                  <HorizontalRule />
                  <Heading as="h4">About Us</Heading>
                  <p>
                    Learn more about our <Link to="/about">mission and objectives</Link>
                  </p>
                  <HorizontalRule />
                  <Heading as="h4">Follow Us</Heading>
                  <p>
                    <a
                      href="https://www.facebook.com/RealtyOffer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookSquare style={{ marginRight: baseSpacerUnit }} />
                      Facebook
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://www.linkedin.com/company/realtyoffer/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin style={{ marginRight: baseSpacerUnit }} />
                      LinkedIn
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://www.youtube.com/channel/UCA2Lxd_nxREIZ7ruAzq18Ag"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaYoutubeSquare style={{ marginRight: baseSpacerUnit }} />
                      Youtube
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://www.instagram.com/realtyofferus/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram style={{ marginRight: baseSpacerUnit }} />
                      Instagram
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://twitter.com/realtyoffer1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitterSquare style={{ marginRight: baseSpacerUnit }} />
                      Twitter
                    </a>
                  </p>
                </Box>
              </div>
            </Column>
          </Row>
        </PageContainer>
      </section>
    </>
  );
};

const PressPage = ({
  data,
}: {
  data: { markdownRemark: { frontmatter: PressPageProps; html: any } };
}) => {
  const { markdownRemark: post } = data;

  return (
    <PressPageTemplate
      metaTitle={post.frontmatter.metaTitle}
      metaDescription={post.frontmatter.metaDescription}
      metaKeywords={post.frontmatter.metaKeywords}
      title={post.frontmatter.title}
      heroImage={post.frontmatter.heroImage}
      mobileHeroImage={post.frontmatter.mobileHeroImage}
      pressItems={post.frontmatter.pressItems}
    />
  );
};

export default PressPage;

export const pressPageQuery = graphql`
  query PressPage {
    markdownRemark(frontmatter: { templateKey: { eq: "press-page" } }) {
      html
      frontmatter {
        metaTitle
        metaDescription
        metaKeywords
        title
        pressItems {
          title
          date
          excerpt
          link
        }
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 60) {
              ...GatsbyImageSharpFluid
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
      }
    }
  }
`;
