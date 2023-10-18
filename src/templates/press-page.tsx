import React, { FunctionComponent, useState } from 'react';
import { graphql, Link } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';
import styled from 'styled-components';
import {
  FaLinkedin,
  FaYoutubeSquare,
  FaInstagram,
  FaTwitterSquare,
  FaFacebookSquare,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

import {
  baseSpacer,
  decupleSpacer,
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
  FlexContainer,
} from '../components';
import { brandPrimary, lightestGray, textColor } from '../styles/color';

type PressPageProps = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  title: string;
  heroImage: { childImageSharp: { fluid: FluidObject; fixed: FixedObject } };
  mobileHeroImage: { childImageSharp: { fluid: FluidObject } };
  pressItems: Array<{
    title: string;
    date: string;
    excerpt: string;
    link: string;
  }>;
};

const Swatch = styled.span`
  width: ${baseAndAHalfSpacer};
  height: ${baseAndAHalfSpacer};
  background-color: ${brandPrimary};
  display: inline-block;
  margin-right: ${baseSpacer};
  border-radius: ${borderRadius};
  vertical-align: middle;
`;

const PageButton = styled.div<{ disabled: boolean }>`
  padding: 0 ${baseSpacer};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.disabled ? lightestGray : textColor)};
`;

export const PressPageTemplate: FunctionComponent<PressPageProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalCount = props.pressItems.length;
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const canGoPrevious = currentPage >= 2;
  const canGoNext = currentPage < totalPageCount;

  const onPrevious = () => {
    if (canGoPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNext = () => {
    if (canGoNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPagination = () => (
    <FlexContainer justifyContent="flex-end">
      Viewing {currentPage === 1 ? currentPage : pageSize * (currentPage - 1) + 1} -{' '}
      {currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize} of {totalCount}
      <PageButton onClick={onPrevious} disabled={!canGoPrevious}>
        <FaChevronLeft />
      </PageButton>
      <PageButton onClick={onNext} disabled={!canGoNext}>
        <FaChevronRight />
      </PageButton>
    </FlexContainer>
  );

  return (
    <>
      <Seo
        title={props.metaTitle}
        description={props.metaDescription}
        meta={[{ name: 'keywords', content: props.metaKeywords }]}
        image={props.heroImage.childImageSharp.fixed.src}
        imageWidth={props.heroImage.childImageSharp.fixed.width}
        imageHeight={props.heroImage.childImageSharp.fixed.height}
      />
      <HeroImage imgSrc={props.heroImage} mobileImgSrc={props.mobileHeroImage} />
      <section style={{ padding: `${decupleSpacer} 0` }}>
        <PageContainer>
          <Row>
            <Column md={7} lg={8}>
              <Heading as="h1" styledAs="title">
                Press Releases
              </Heading>
              <Heading as="h5">{props.title}</Heading>
              {renderPagination()}
              <HorizontalRule />
              {props.pressItems
                .slice(
                  currentPage === 1 ? 0 : pageSize * (currentPage - 1),
                  currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize
                )
                .map((item) => (
                  <article key={item.link}>
                    <p>
                      <small>{item.date}</small>
                    </p>
                    <Heading as="h3" styledAs="subtitle">
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </Heading>

                    <p>{item.excerpt}</p>
                    <HorizontalRule />
                  </article>
                ))}
              {renderPagination()}
              <br />
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
                    <br />
                    <a href="tel:+12489152654">(248) 915-2654</a>
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
                      <a href="/img/logo-blue-with-white.png">Download</a>
                    </p>
                    <p>
                      <img
                        src="/img/logo-white-with-blue.png"
                        alt=""
                        style={{ width: '100%', maxWidth: 200 }}
                      />
                    </p>
                    <p>
                      <a href="/img/logo-white-with-blue.png">Download</a>
                    </p>
                    <p>
                      <a href="/img/logo.eps" download rel="nofollow">
                        Download .eps version
                      </a>
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
      }
    }
  }
`;
