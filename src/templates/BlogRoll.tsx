/* eslint-disable react/display-name */
import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import styled from 'styled-components';

import {
  Box,
  HorizontalRule,
  Heading,
  Row,
  Column,
  PreviewCompatibleImage,
  Button,
} from '../components';
import { brandPrimary, brandTertiary, white } from '../styles/color';
import { baseAndAHalfSpacer, baseSpacer, doubleSpacer, halfSpacer } from '../styles/size';
import { z1Shadow } from '../styles/mixins';

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
        category: string;
      };
    };
  }>;
};

const Ribbon = styled.span`
  width: auto;
  height: ${doubleSpacer};
  line-height: ${doubleSpacer};
  padding-left: ${baseSpacer};
  padding-right: ${halfSpacer};
  position: absolute;
  left: -${halfSpacer};
  top: ${baseAndAHalfSpacer};
  background: ${brandPrimary};
  color: ${white};
  text-transform: uppercase;
  box-shadow: ${z1Shadow};
  letter-spacing: 1px;
  z-index: 1;

  &:before,
  &:after {
    content: '';
    position: absolute;
  }
  &:before {
    height: 0;
    width: 0;
    top: -9px;
    left: 0;
    border-bottom: 9px solid ${brandTertiary};
    border-left: 9px solid transparent;
  }
  &:after {
    height: 0;
    width: 0;
    right: -14.5px;
    border-top: ${baseSpacer} solid transparent;
    border-bottom: ${baseSpacer} solid transparent;
    border-left: 15px solid ${brandPrimary};
  }
`;

const BlogRoll: FunctionComponent<BlogRollProps> = ({ posts }) => {
  return (
    <Row>
      {posts &&
        posts.map(({ node: post }: any) => (
          <Column md={4} key={post.id}>
            <Box
              style={{ position: 'relative' }}
              footer={
                <Button type="link" to={post.fields.slug} block>
                  View Full Article
                </Button>
              }
            >
              <Ribbon>
                <small>{post.frontmatter.category} News</small>
              </Ribbon>
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
                <small style={{ display: 'block', margin: `${baseSpacer} 0` }}>
                  {post.frontmatter.date} - {post.fields.readingTime.text}
                </small>
                <Heading as="h2" noMargin>
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                </Heading>
                <HorizontalRule />

                <small style={{ fontStyle: 'italic' }}>{post.frontmatter.description}</small>
              </div>
            </Box>
          </Column>
        ))}
    </Row>
  );
};

export default BlogRoll;
