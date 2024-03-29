[![Netlify Status](https://api.netlify.com/api/v1/badges/a421b0d7-a2bc-4ca8-8b1c-ae050c947b33/deploy-status)](https://app.netlify.com/sites/realtyoffer-dev/deploys)

<p align="center">
  <a href="https://realtyoffer.com/">
    <img alt="Realty Offer" src="https://realtyoffer.com/icons/icon-96x96.png" width="96px" />
  </a>
</p>
<h1 align="center">
  Realty Offer - Frontend
</h1>

### Site is auto-deployed via Netlify with two branches

[PROD](https://realtyoffer.com) - `master` branch
[DEV](https://develop.realtyoffer.com) - `develop` branch

A Gatsby project using React, Redux, Styled-Components, Storybook, Formik, and more.

## 🚀 Quick start

1.  **Clone Repo and install dependencies**

    Use `git clone`, then `cd` into your local repo and run `yarn` to install dependencies.

    ```shell
    # Clone and install dependencies
    git clone https://github.com/Galileo-Insights/realty-offer-frontend.git
    cd realty-offer-frontend
    yarn
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd realty-offer-frontend/
    # `yarn start` is the same as `gatsby develop`
    yarn start
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
      ├── components
      ├── pages
      ├── redux
      ├── stories
      ├── styles
      ├── templates
      ├── utils
      ├── views
    ├── static
      ├── cms
        ├── config.yml
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`yarn.lock`**: This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

13. **`static/cms/config.yml`**: A yaml file for defining schemas to use in NetlifyCMS

## 🎓 Learning the Components

Looking for more guidance on the components available in this repo? Run `yarn storybook` and access `http://localhost:8001` to see the Storybook guide, which goes over the components and their available `props`.

## 💫 Deploy

This project is automatically deployed to Netlify at `https://realtyoffer.com/` via commits to the `master` branch.

## Bit.dev

This project uses bit.dev to export common functions and utilities for use in the React Native app. Workflow is:

- `bit login`
- `bit tag --all` to bump version numbers
- `bit export realtyoffer.collection` to export to remote
