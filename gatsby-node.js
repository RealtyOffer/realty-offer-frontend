/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemarkFrontmatter {
      title: String!
    }
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter!
    }
    
  `;
  createTypes(typeDefs);
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            fields {
              slug
              readingTime {
                text
              }
            }
            frontmatter {
              tags
              templateKey
              title
              date(formatString: "MMMM DD, YYYY")
              description
              featuredimage {
                childImageSharp {
                  fluid(maxWidth: 400, quality: 60) {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                    srcSetWebp
                    srcWebp
                  }
                  fixed {
                    aspectRatio
                    base64
                    height
                    src
                    srcSet
                    width
                  }
                }
              }
            }
          }
        }
      }
    }
  `).then(
    // eslint-disable-next-line consistent-return
    (result) => {
      if (result.errors) {
        // eslint-disable-next-line no-console
        result.errors.forEach((e) => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const nonBlogPosts = result.data.allMarkdownRemark.edges.filter(
        (p) => p.node.frontmatter.templateKey !== 'blog-post'
      );

      const blogPosts = result.data.allMarkdownRemark.edges.filter(
        (p) => p.node.frontmatter.templateKey === 'blog-post'
      );

      nonBlogPosts.forEach((edge) => {
        const { id } = edge.node;

        if (edge.node.frontmatter.templateKey === 'blog-index-page') {
          const postsPerPage = 15;
          const numPages = Math.ceil(blogPosts.length / postsPerPage);

          Array.from({ length: numPages }).forEach((p, i) => {
            createPage({
              path: i === 0 ? `/blog` : `/blog/${i + 1}`,
              component: path.resolve('src/templates/blog-index-page.tsx'),
              context: {
                id,
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
              },
            });
          });
        }

        if (edge.node.frontmatter.templateKey !== 'blog-index-page') {
          createPage({
            path: edge.node.fields.slug,
            component: path.resolve(
              `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`
            ),
            // additional data can be passed via context
            context: {
              id,
            },
          });
        }
      });

      blogPosts.forEach((edge, index) => {
        const { id } = edge.node;
        createPage({
          path: edge.node.fields.slug,
          component: path.resolve(`src/templates/blog-post.tsx`),
          // additional data can be passed via context
          context: {
            id,
            slug: edge.node.fields.slug,
            prev: index === 0 ? blogPosts[blogPosts.length - 1].node : blogPosts[index - 1].node,
            next: index === blogPosts.length - 1 ? blogPosts[0].node : blogPosts[index + 1].node,
          },
        });
      });

      // Tag pages:
      let tags = [];
      // Iterate through each post, putting all found tags into `tags`
      blogPosts.forEach((edge) => {
        if (_.get(edge, 'node.frontmatter.tags')) {
          tags = tags.concat(edge.node.frontmatter.tags);
        }
      });
      // Eliminate duplicate tags
      tags = _.uniq(tags);

      // Make tag pages
      tags.forEach((tag) => {
        const tagPath = `/tags/${_.kebabCase(tag)}/`;

        createPage({
          path: tagPath,
          component: path.resolve('src/templates/tags.tsx'),
          context: {
            tag,
          },
        });
      });
    }
  );
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        fetch: path.resolve(path.join(__dirname, 'node_modules/isomorphic-fetch/fetch-npm-node')),
      }),
    ],
    externals: {
      canvg: 'canvg',
    },
  });
};
