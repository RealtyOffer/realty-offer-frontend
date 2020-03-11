import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number, boolean, text } from '@storybook/addon-knobs';

import Alert from '../components/Alert';

const story = storiesOf('Components', module);

const buttonTypeOptions = ['danger', 'success', 'info'] as const;

story.add(
  'Alert',
  () => (
    <Alert
      type={select('type', buttonTypeOptions, 'success')}
      dismissable={boolean('dismissable', false)}
      alertNumber={number('alertNumber', 1)}
      alertNumberTotal={number('alertNumberTotal', 1)}
    >
      {text('children', 'Alert message goes here')}
    </Alert>
  ),
);
