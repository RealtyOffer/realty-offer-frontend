import React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { action } from '@storybook/addon-actions'
import { select, boolean, text } from '@storybook/addon-knobs'

import Button from '../components/Button'

const story = storiesOf('Components', module).addDecorator(centered)

const typeOptions = ['submit', 'button', 'reset', 'link']
const colorOptions = [
  'text',
  'primary',
  'primaryOutline',
  'success',
  'successOutline',
  'danger',
  'dangerOutline',
]

story.add('Button', () => (
  // @ts-ignore
  <Button
    type={select('type', typeOptions, 'button')}
    color={select('color', colorOptions, 'primary')}
    rightspacer={boolean('rightspacer', false)}
    onClick={action('button-click')}
    to={text('to (for type=link)', '/home')}
    disabled={boolean('disabled', false)}
  >
    {text('children', 'Button')}
  </Button>
))
