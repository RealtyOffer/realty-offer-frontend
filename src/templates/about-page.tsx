import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';

import { doubleSpacer, decupleSpacer } from '../styles/size';
import {
  HeroImage,
  PageContainer,
  Seo,
  Box,
  Heading,
  FlexContainer,
  Avatar,
  Row,
  Column,
} from '../components';
import { fontSizeH6 } from '../styles/typography';

type AboutPageProps = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  title: string;
  content: any;
  mission: any;
  heroImage: { childImageSharp: { fluid: FluidObject; fixed: FixedObject } };
  mobileHeroImage: { childImageSharp: { fluid: FluidObject } };
  teamMembers: Array<{
    name: string;
    title: string;
    bio: any;
    avatar: { childImageSharp: { fluid: FluidObject } };
  }>;
};

export const AboutPageTemplate: FunctionComponent<AboutPageProps> = (props) => {
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
      <HeroImage imgSrc={props.heroImage} mobileImgSrc={props.mobileHeroImage} hasOverlay>
        <PageContainer>
          <Row>
            <Column md={7}>
              <Heading styledAs="title">{props.title}</Heading>
            </Column>
          </Row>
        </PageContainer>
      </HeroImage>
      <section style={{ padding: `${decupleSpacer} 0` }}>
        <PageContainer>
          <div style={{ fontSize: fontSizeH6 }}>
            <ReactMarkdown source={props.mission} />
          </div>
          <br />
          <br />
          {props.teamMembers.map((member) => (
            <Box key={member.name} largePadding>
              <FlexContainer justifyContent="flex-start" flexWrap="nowrap">
                <Avatar
                  src={member.avatar}
                  size="lg"
                  gravatarEmail=""
                  style={{ marginRight: doubleSpacer }}
                />
                <div style={{ textAlign: 'center' }}>
                  <Heading as="h3" styledAs="title" noMargin>
                    {member.name}
                  </Heading>
                  <Heading as="h4" styledAs="subtitle">
                    {member.title}
                  </Heading>
                </div>
              </FlexContainer>
              <br />
              <ReactMarkdown source={member.bio} />
            </Box>
          ))}
        </PageContainer>
      </section>
    </>
  );
};

const AboutPage = ({
  data,
}: {
  data: { markdownRemark: { frontmatter: AboutPageProps; html: any } };
}) => {
  const { frontmatter } = data.markdownRemark;

  return <AboutPageTemplate {...frontmatter} />;
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      html
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
        mission
        content
        teamMembers {
          name
          title
          bio
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
