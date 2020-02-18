import React from 'react';
import { addDecorator, configure, addParameters } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

import { brandPrimary, white, lightestGray } from '../src/styles/color';
import CssReset from '../src/styles/cssReset';

const req = require.context('../src', true, /.story.tsx$/);

const loadStories = () => req.keys().forEach(filename => req(filename));

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = "";

// If you'd like to add global styles to all stories, modify this component.
// addDecorator(GlobalStyleDecorator);

// If you'd like to customize your storybook instance. See: https://github.com/storybooks/storybook/tree/next/addons/options
// addDecorator(
//   withOptions({
//     name: 'gatsby-typescript-storybook-starter',
//     url: 'https://gatsby-typescript-storybook-starter.netlify.com/',
//     hierarchySeparator: /\/|\./,
//     hierarchyRootSeparator: /\|/,
//   }),
// );

const withGlobal = (cb) => (
  <React.Fragment>
    <CssReset />
    <div style={{ margin: 8 }}>
      {cb()}
    </div>
  </React.Fragment>
);

addParameters({
  backgrounds: [
    { name: 'brandPrimary', value: brandPrimary },
    { name: 'white', value: white },
    { name: 'lightestGray', value: lightestGray, default: true },
  ],
});

addDecorator(withGlobal);
configure(loadStories, module);