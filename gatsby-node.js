/* eslint-disable consistent-return */
const _ = require("lodash")
const path = require("path")
const webpack = require("webpack")
const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      // eslint-disable-next-line no-console
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const { id } = edge.node
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve("src/templates/tags.tsx"),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        fetch: path.resolve(
          path.join(__dirname, "node_modules/isomorphic-fetch/fetch-npm-node")
        ),
      }),
    ],
  })
}

// // Implement the Gatsby API “onCreatePage”. This is
// // called after every page is created.
// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions;
//   // Only update the `/agent` page.
//   if (page.path.match(/^\/agent/)) {
//     // page.matchPath is a special key that's used for matching pages
//     // with corresponding routes only on the client.
//     page.matchPath = '/agent/*';
//     // Update the page.
//     createPage(page);
//   }
//   // Only update the `/consumer` page.
//   if (page.path.match(/^\/consumer/)) {
//     // page.matchPath is a special key that's used for matching pages
//     // with corresponding routes only on the client.
//     page.matchPath = '/consumer/*';
//     // Update the page.
//     createPage(page);
//   }
// };
