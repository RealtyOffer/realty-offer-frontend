import React from 'react';
import { action } from '@storybook/addon-actions';import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';
import centered from '@storybook/addon-centered/react';
import {
  withKnobs, select, boolean, text,
} from '@storybook/addon-knobs';

import { defaultParameters } from '../../.storybook/constants';

import Button from '../components/Button';

const story = storiesOf('Components|Button', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .addDecorator(withInfo)
  .addDecorator(centered)
  .addParameters(defaultParameters);

const typeOptions = [
  'submit', 'button', 'reset', 'link',
];
const colorOptions = [
  'text', 'primary', 'primaryOutline', 'success', 'successOutline', 'danger', 'dangerOutline',
];

// rightSpacer ?: boolean;
// onClick ? (event: React.MouseEvent<HTMLButtonElement>): void;
// to ?: string;
// disabled ?: boolean;
// iconLeft ?: React.ReactNode;
// iconRight ?: React.ReactNode;
// title ?: string;
// block ?: boolean;

story.add(
  'Button',
  () => (
    <Button
      type={select('type', typeOptions, 'button')}
      color={select('color', colorOptions, 'primary')}
      rightSpacer={boolean('rightSpacer', false)}
      onClick={action('button-click')}
      to={text('to', '/home')}
      disabled={boolean('disabled', false)}
      title={text('title', 'Hello World')}
    >
      {text('children', 'Button')}
    </Button>
  ),
);
