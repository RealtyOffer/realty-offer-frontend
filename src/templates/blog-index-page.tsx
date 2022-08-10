import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FixedObject, FluidObject } from 'gatsby-image';

import {
  Button,
  HeroImage,
  Seo,
  PageContainer,
  Heading,
  FlexContainer,
  Row,
  Column,
} from '../components';
import BlogRoll from './BlogRoll';

type BlogIndexProps = {
  title: string;
  heroImage: { childImageSharp: { fluid: FluidObject; fixed: FixedObject } };
  mobileHeroImage: { childImageSharp: { fluid: FluidObject } };
  pageContext: {
    currentPage: number;
    limit: number;
    numPages: number;
    skip: number;
  };
  posts: Array<{
    node: {
      excerpt: string;
      fields: {
        readingTime: {
          text: string;
        };
        slug: string;
      };
      frontmatter: {
        featuredimage: { childImageSharp: { fluid: FluidObject } };
        date: string;
        description: string;
        featuredpost: boolean;
        title: string;
        category: string;
      };
    };
  }>;
};

export const BlogIndexTemplate: FunctionComponent<BlogIndexProps> = (props) => {
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/blog' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();
  return (
    <>
      <Seo
        title={props.title}
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

      <PageContainer>
        <section style={{ marginTop: 16 }}>
          <BlogRoll posts={props.posts} />
          <FlexContainer justifyContent="space-between">
            {!isFirst ? (
              <Button type="link" color="primaryOutline" to={prevPage} iconLeft={<FaChevronLeft />}>
                Previous
              </Button>
            ) : (
              <div />
            )}
            {!isLast ? (
              <Button
                type="link"
                color="primaryOutline"
                to={nextPage}
                iconRight={<FaChevronRight />}
              >
                Next
              </Button>
            ) : (
              <div />
            )}
          </FlexContainer>
        </section>
      </PageContainer>
    </>
  );
};

const BlogIndexPage = ({
  data,
  pageContext,
}: {
  pageContext: BlogIndexProps['pageContext'];
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          excerpt: string;
          fields: {
            readingTime: {
              text: string;
            };
            slug: string;
          };
          frontmatter: {
            featuredimage: { childImageSharp: { fluid: FluidObject } };
            date: string;
            description: string;
            featuredpost: boolean;
            title: string;
            category: string;
          };
        };
      }>;
    };
    markdownRemark: {
      frontmatter: BlogIndexProps;
      html: any;
      heroImage: BlogIndexProps['heroImage'];
    };
  };
}) => {
  const { markdownRemark: post, allMarkdownRemark: all } = data;
  return (
    <BlogIndexTemplate
      title={post.frontmatter.title}
      heroImage={post.frontmatter.heroImage}
      mobileHeroImage={post.frontmatter.mobileHeroImage}
      pageContext={pageContext}
      posts={all.edges}
    />
  );
};

export default BlogIndexPage;

export const blogIndexPageQuery = graphql`
  query BlogIndexPage($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: [DESC], fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            templateKey
            description
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            category
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "blog-index-page" } }) {
      html
      frontmatter {
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
      }
    }
  }
`;
