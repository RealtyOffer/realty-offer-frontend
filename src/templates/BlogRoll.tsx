/* eslint-disable react/display-name */
import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import { Box, HorizontalRule, Heading, Row, Column, PreviewCompatibleImage } from '../components';

type BlogRollProps = {
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
      };
    };
  }>;
};

const BlogRoll: FunctionComponent<BlogRollProps> = ({ posts }) => {
  return (
    <Row>
      {posts &&
        posts.map(({ node: post }: any) => (
          <Column md={4} key={post.id}>
            <Box>
              <div style={{ textAlign: 'left' }}>
                {post.frontmatter.featuredimage && (
                  <Link to={post.fields.slug}>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                      }}
                      style={{ height: 200 }}
                    />
                  </Link>
                )}
                <small>
                  {post.frontmatter.date} - {post.fields.readingTime.text}
                </small>
                <Heading as="h2" noMargin>
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                </Heading>
                <HorizontalRule compact />

                <small style={{ fontStyle: 'italic' }}>{post.frontmatter.description}</small>
              </div>
            </Box>
          </Column>
        ))}
    </Row>
  );
};

export default BlogRoll;
