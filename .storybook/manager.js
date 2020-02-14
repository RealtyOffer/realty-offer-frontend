import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: themes.light,
});

import '@storybook/addon-knobs/register';
import '@storybook/addon-storysource';
import '@storybook/addon-options/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-viewport/register';
import '@storybook/addon-a11y/register';
import '@storybook/addon-backgrounds/register';
