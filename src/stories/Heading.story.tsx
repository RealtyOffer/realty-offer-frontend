import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';

import Heading from '../components/Heading';

const story = storiesOf('Components', module);

const asOptions = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

const alignOptions = ['left', 'center', 'right'] as const;

const styledAsOptions = ['title', 'subtitle', null] as any;

story.add('Heading', () => (
  <Heading
    as={select('as', asOptions, asOptions[0])}
    inverse={boolean('inverse', false)}
    noMargin={boolean('noMargin', false)}
    align={select('align', alignOptions, alignOptions[0])}
    styledAs={select('styledAs', styledAsOptions, null)}
  >
    Hello World
  </Heading>
));
