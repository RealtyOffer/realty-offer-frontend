import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, number, text } from '@storybook/addon-knobs';

import Alert from '../components/Alert';

const story = storiesOf('Components', module);

const selectOptions = ['danger', 'success', 'info'] as const;

story.add('Alert', () => (
  <Alert
    type={select('type', selectOptions, 'success')}
    dismissable={boolean('dismissable', false)}
    alertNumber={number('alertNumber', 1)}
    alertNumberTotal={number('alertNumberTotal', 0)}
  >
    {text('children', 'Alert message goes here')}
  </Alert>
));
