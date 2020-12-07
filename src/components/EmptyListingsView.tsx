import React, { FunctionComponent } from 'react';
import { FaHome } from 'react-icons/fa';

import Box from './Box';
import Button from './Button';
import Heading from './Heading';

import { doubleSpacer } from '../styles/size';

type EmptyListingsViewProps = {
  title: string;
  buttonText: string;
  to?: string;
  onClick?: () => void;
};

const EmptyListingsView: FunctionComponent<EmptyListingsViewProps> = (props) => (
  <Box backgroundAccent textAlign="center">
    <FaHome fontSize={64} style={{ margin: doubleSpacer }} />
    <Heading styledAs="title" align="center">
      {props.title}
    </Heading>
    {props.to && (
      <Button type="link" to={props.to}>
        {props.buttonText}
      </Button>
    )}
    {props.onClick && (
      <Button type="button" onClick={props.onClick}>
        {props.buttonText}
      </Button>
    )}
  </Box>
);

export default EmptyListingsView;
