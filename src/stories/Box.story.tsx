import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, number } from '@storybook/addon-knobs'

import Box from '../components/Box'

const story = storiesOf('Components', module)

const numOptions = [1, 2, 3, 4] as const

const selectOptions = ['left', 'center', 'right'] as const

story.add('Box', () => (
  <Box
    height={number('height', 0)}
    zindex={select('zindex', numOptions, 1)}
    textAlign={select('textAlign', selectOptions, 'left')}
  >
    Hello World
  </Box>
))
