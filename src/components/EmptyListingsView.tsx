import React, { FunctionComponent } from 'react';
import { FaRegFrown } from 'react-icons/fa';

import Box from './Box';
import Button from './Button';
import Heading from './Heading';

import { doubleSpacer } from '../styles/size';

type EmptyListingsViewProps = {
  title: string;
  buttonText: string;
  to: string;
};

const EmptyListingsView: FunctionComponent<EmptyListingsViewProps> = (props) => (
  <Box backgroundAccent textAlign="center">
    <FaRegFrown fontSize={64} style={{ margin: doubleSpacer }} />
    <Heading styledAs="title" align="center">
      {props.title}
    </Heading>
    <Button type="link" to={props.to}>
      {props.buttonText}
    </Button>
  </Box>
);

export default EmptyListingsView;
