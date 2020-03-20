import React from 'react';
import { storiesOf } from '@storybook/react';

import PageContainer from '../components/PageContainer';

const story = storiesOf('Components', module);

story.add('PageContainer', () => <PageContainer>Hello World!</PageContainer>);
