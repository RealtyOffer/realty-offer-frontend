import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';

import ProgressBar from '../components/ProgressBar';

const story = storiesOf('Components', module);

story.add(
  'ProgressBar',
  () => (
    <ProgressBar
      value={number('value', 50)}
      name={text('name', 'ProgressBar')}
      label={text('label', 'Step 1')}
    />
  ),
);
