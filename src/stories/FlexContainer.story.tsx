import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';

import FlexContainer from '../components/FlexContainer';

const story = storiesOf('Components', module);

const directionOptions = ['row', 'column'] as const;

const justifyOptions = [
  'space-between',
  'space-around',
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'left',
  'right',
] as const;

const alignOptions = [
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'left',
  'right',
  'stretch',
] as const;

const wrapOptions = ['wrap', 'nowrap'] as const;

story.add(
  'FlexContainer',
  () => (
    <FlexContainer
      flexDirection={select('flexDirection', directionOptions, 'row')}
      justifyContent={select('justifyContent', justifyOptions, 'center')}
      alignItems={select('alignItems', alignOptions, 'center')}
      flexWrap={select('flexWrap', wrapOptions, 'wrap')}
      height={text('height in px', '0px')}
    >
      <div>Item One</div>
      <div>Item Two</div>
      <div>Item Three</div>
      <div>Item Four</div>
      <div>Item Five</div>
    </FlexContainer>
  ),
);
