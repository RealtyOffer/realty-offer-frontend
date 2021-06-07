import React, { FunctionComponent } from 'react';
import { kebabCase } from 'lodash';
import { Link, graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';

import { PageContainer, Box, Heading, Seo, HeroImage } from '../components';

type TagsIndexProps = {
  title: string;
  group: Array<{ fieldValue: string; totalCount: number }>;
  heroImage: { childImageSharp: { fluid: FluidObject; fixed: FixedObject } };
};

export const TagsIndexTemplate: FunctionComponent<TagsIndexProps> = (props) => (
  <>
    <Seo
      title={props.title}
      image={props.heroImage.childImageSharp.fixed.src}
      imageWidth={props.heroImage.childImageSharp.fixed.width}
      imageHeight={props.heroImage.childImageSharp.fixed.height}
    />
    <HeroImage imgSrc={props.heroImage}>
      <PageContainer>
        <Heading as="h1" inverse align="center">
          {props.title}
        </Heading>
      </PageContainer>
    </HeroImage>
    <PageContainer>
      <Box>
        <Heading>Tags</Heading>
        <ul>
          {props.group.map((tag: any) => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} {`(${tag.totalCount})`}
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </PageContainer>
  </>
);

const TagsIndexPage = ({
  data,
}: {
  data: {
    markdownRemark: { frontmatter: TagsIndexProps; heroImage: TagsIndexProps['heroImage'] };
    allMarkdownRemark: { group: Array<{ fieldValue: string; totalCount: number }> };
  };
}) => {
  const { markdownRemark: post } = data;
  return (
    <TagsIndexTemplate
      title={post.frontmatter.title}
      heroImage={post.frontmatter.heroImage}
      group={data.allMarkdownRemark.group}
    />
  );
};

export default TagsIndexPage;

export const tagPageQuery = graphql`
  query TagsIndexPage {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "tags-index-page" } }) {
      frontmatter {
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
        title
      }
    }
  }
`;
