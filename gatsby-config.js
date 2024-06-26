/* eslint-disable */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://realtyoffer.com',
    title: 'Realty Offer',
    description: 'Realty Offer',
    author: '@realtyoffer',
    url: 'https://realtyoffer.com',
    image: '/img/young-man-on-sidewalk-using-a-black-iphone-6.png',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet-async',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-eslint',
    'gatsby-plugin-smoothscroll',
    {
      resolve: 'gatsby-plugin-advanced-sitemap',
      exclude: ['/admin', '/admin/*', '/consumer', '/consumer/*', '/agent', '/agent/*'],
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.realtyoffer.com',
        sitemap: 'https://realtyoffer.com/sitemap.xml',
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID,
    //   },
    // },
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        prodKey: process.env.GATSBY_SEGMENT_API_KEY,
        devKey: process.env.GATSBY_DEV_SEGMENT_API_KEY,
        trackPage: true,
        trackPageDelay: 50,
        delayLoad: true,
        delayLoadTime: 1000,
      },
    },
    {
      resolve: '@sentry/gatsby',
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://realtyoffer.us7.list-manage.com/subscribe/post?u=5caeac576870824b24baa7608&amp;id=aecfb5f101',
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/pages/blog`,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        // Setting a color is optional.
        color: 'white',
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/agent/*', '/consumer/*', '/admin/*', '/storybook/*'] },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'realty offer',
        short_name: 'realty offer',
        // description: 'Same Agent, Less Commission',
        description: 'Get Paid to Buy or Sell a Home with Realty Offer',
        lang: 'en',
        start_url: '/',
        scope: '/',
        background_color: '#0077CC',
        theme_color: '#0077CC',
        display: 'standalone',
        icon: 'src/images/logo.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-reading-time',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon:
                '<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
            },
          },
          'gatsby-remark-embed-video',
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        publicPath: 'cms',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
  ],
};
