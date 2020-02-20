import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';

import Header from '../components/Header';

const story = storiesOf('Components', module);

const asOptions = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const alignOptions = ['left', 'center', 'right'];

story.add(
  'Header',
  () => (
    <Header
      as={select('as', asOptions, asOptions[0])}
      inverse={boolean('inverse', false)}
      noMargin={boolean('noMargin', false)}
      align={select('align', alignOptions, alignOptions[0])}
    >
      Hello World
    </Header>
  ),
);
