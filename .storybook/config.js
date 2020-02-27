import React from 'react';
import { addDecorator, configure, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';

import { defaultParameters } from './constants';

import {
  brandPrimary,
  white,
  lightestGray,
  brandSuccess,
  brandDanger,
  brandSecondary,
  brandTertiary,
} from '../src/styles/color';
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

addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withGlobal);

addParameters({
  backgrounds: [
    
    { name: 'white', value: white },
    { name: 'lightestGray', value: lightestGray, default: true },
    { name: 'brandPrimary', value: brandPrimary },
    { name: 'brandSecondary', value: brandSecondary },
    { name: 'brandTeriary', value: brandTertiary },
    { name: 'brandSuccess', value: brandSuccess },
    { name: 'brandDanger', value: brandDanger },
  ]
});
configure(loadStories, module);