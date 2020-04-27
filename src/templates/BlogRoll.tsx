import React, { FunctionComponent } from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import { Box, Row, Column, Heading, PreviewCompatibleImage, HorizontalRule } from '../components';

type BlogRollProps = {
  data: {
    allMarkdownRemark: {
      id: number;
      fields: {
        slug: string;
      };
      date: string;
      excerpt: string;
      edges: Array<{
        frontmatter: {
          featuredimage: {
            childImageSharp: {
              fluid: FluidObject;
            };
          };
          title: string;
        };
      }>;
    };
  };
  count: number;
};

const BlogRoll: FunctionComponent<BlogRollProps> = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Row>
      {posts &&
        posts.map(({ node: post }: any) => (
          <Column md={4} key={post.id}>
            <Box>
              {post.frontmatter.featuredimage && (
                <PreviewCompatibleImage
                  imageInfo={{
                    image: post.frontmatter.featuredimage,
                    alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                  }}
                />
              )}
              <small>{post.frontmatter.date}</small>
              <Heading as="h1" styledAs="subtitle">
                <Link className="title has-text-primary is-size-4" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
              </Heading>
              <HorizontalRule />
              <p>{post.excerpt}</p>
              <Link className="button" to={post.fields.slug}>
                Keep Reading
              </Link>
            </Box>
          </Column>
        ))}
    </Row>
  );
};

// eslint-disable-next-line react/display-name
export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 400, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data: any, count: number) => <BlogRoll data={data} count={count} />}
  />
);
