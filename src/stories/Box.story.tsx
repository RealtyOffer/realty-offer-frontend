import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs, select, number,
} from '@storybook/addon-knobs';

import { defaultParameters } from '../../.storybook/constants';

import Box from '../components/Box';

const story = storiesOf('Components|Box', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addParameters(defaultParameters);

const numOptions = [1, 2, 3, 4];

const selectOptions = [
  'left',
  'center',
  'right',
];

story.add(
  'Box',
  () => (
    <Box
      height={number('height', 0)}
      zindex={select('zindex', numOptions, 1)}
      textAlign={select('textAlign', selectOptions, 'left')}
    >
      Hello World
    </Box>
  ),
);
