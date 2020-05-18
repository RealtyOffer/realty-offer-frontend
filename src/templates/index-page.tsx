import React, { FunctionComponent } from 'react';
import { graphql, navigate } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import BlogRoll from './BlogRoll';
import {
  Row,
  Column,
  Box,
  Button,
  FlexContainer,
  HeroImage,
  Heading,
  NegativeMarginContainer,
  PageContainer,
  PreviewCompatibleImage,
  Seo,
} from '../components';

type IndexPageProps = {
  title: string;
  heroHeading: string;
  heroSubheading: string;
  heroCTALink: string;
  heroCTAText: string;
  heroImage: { childImageSharp: { fluid: FluidObject } };
  mainpitch: {
    title: string;
    cards: Array<{
      title: string;
      text: string;
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
      icon?: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
      link: string;
      linkText: string;
      linkType: 'button' | 'link';
    }>;
  };
  secondpitch: {
    title: string;
    text: string;
    caption: string;
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    link: string;
    linkText: string;
    linkType: 'button' | 'link';
  };
  thirdpitch: {
    title: string;
    text: string;
    caption: string;
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    link: string;
    linkText: string;
    linkType: 'button' | 'link';
  };
};

export const IndexPageTemplate: FunctionComponent<IndexPageProps> = ({
  heroImage,
  title,
  heroHeading,
  heroSubheading,
  heroCTALink,
  heroCTAText,
  mainpitch,
  secondpitch,
  thirdpitch,
}) => (
  <div>
    <Seo title={title} />
    <HeroImage src={heroImage.childImageSharp.fluid.src}>
      <PageContainer>
        <Box backgroundAccent>
          <Heading styledAs="title">{heroHeading}</Heading>
          <Heading styledAs="subtitle">{heroSubheading}</Heading>
          <Button type="link" to={heroCTALink}>
            {heroCTAText}
          </Button>
        </Box>
      </PageContainer>
    </HeroImage>
    <PageContainer>
      <Heading as="h2" styledAs="sectionHeading">
        {mainpitch.title}
      </Heading>
      <Row>
        {mainpitch.cards.map((card) => (
          <Column md={4} key={card.title}>
            <Box>
              <FlexContainer flexDirection="column">
                {card.image && (
                  <NegativeMarginContainer top right left>
                    <PreviewCompatibleImage imageInfo={{ image: card.image }} />
                  </NegativeMarginContainer>
                )}
                {card.icon && (
                  <div style={{ width: '100%', maxWidth: 200, marginBottom: 16 }}>
                    <PreviewCompatibleImage imageInfo={{ image: card.icon }} />
                  </div>
                )}
                <Heading as="h4" styledAs="subtitle">
                  {card.title}
                </Heading>
                <p>{card.text}</p>
                <Button
                  type="link"
                  block
                  to={card.link}
                  color={card.linkType === 'button' ? 'primary' : 'text'}
                >
                  {card.linkText}
                </Button>
              </FlexContainer>
            </Box>
          </Column>
        ))}
      </Row>
      <Row>
        <Column md={8}>
          <Box>
            <Heading as="h4" styledAs="subtitle">
              {secondpitch.title}
            </Heading>
            <p>{secondpitch.text}</p>
            <Button
              type="link"
              to={secondpitch.link}
              color={secondpitch.linkType === 'button' ? 'primary' : 'text'}
            >
              {secondpitch.linkText}
            </Button>
          </Box>
        </Column>
        <Column md={4}>
          <Box bgSrc={secondpitch.image}>
            <Heading as="h4" styledAs="title" align="center">
              {secondpitch.caption}
            </Heading>
          </Box>
        </Column>
      </Row>
      <Box>
        <Row>
          <Column xs={6} md={8}>
            <NegativeMarginContainer top bottom left>
              <PreviewCompatibleImage imageInfo={{ image: thirdpitch.image }} />
            </NegativeMarginContainer>
          </Column>
          <Column xs={6} md={4}>
            <Heading as="h4" styledAs="subtitle">
              {thirdpitch.title}
            </Heading>
            <p>{thirdpitch.text}</p>
            <Button
              type="link"
              to={thirdpitch.link}
              color={thirdpitch.linkType === 'button' ? 'primary' : 'text'}
            >
              {thirdpitch.linkText}
            </Button>
          </Column>
        </Row>
      </Box>
      <Heading as="h3" styledAs="sectionHeading">
        Latest Stories
      </Heading>
      <BlogRoll />
    </PageContainer>
  </div>
);

const IndexPage = ({ data }: { data: { markdownRemark: { frontmatter: IndexPageProps } } }) => {
  const { frontmatter } = data.markdownRemark;

  if (process.env.GATSBY_ENVIRONMENT === 'PRODUCTION') {
    navigate('/landing');
    return null;
  }

  return (
    <IndexPageTemplate
      heroImage={frontmatter.heroImage}
      title={frontmatter.title}
      heroHeading={frontmatter.heroHeading}
      heroSubheading={frontmatter.heroSubheading}
      heroCTALink={frontmatter.heroCTALink}
      heroCTAText={frontmatter.heroCTAText}
      mainpitch={frontmatter.mainpitch}
      secondpitch={frontmatter.secondpitch}
      thirdpitch={frontmatter.thirdpitch}
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
        heroCTALink
        heroCTAText
        mainpitch {
          title
          cards {
            title
            text
            image {
              childImageSharp {
                fluid(maxWidth: 512, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            icon {
              childImageSharp {
                fluid(maxWidth: 512, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            link
            linkText
            linkType
          }
        }
        secondpitch {
          title
          text
          caption
          image {
            childImageSharp {
              fluid(maxWidth: 400, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          link
          linkText
          linkType
        }
        thirdpitch {
          title
          text
          caption
          image {
            childImageSharp {
              fluid(maxWidth: 1200, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          link
          linkText
          linkType
        }
      }
    }
  }
`;
