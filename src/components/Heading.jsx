// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { white, headingsColor } from 'styles/color';
import { baseSpacer } from 'styles/size';
import {
  headingsFontFamily,
  lineHeightSmall,
  fontSizeH1,
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  fontSizeH5,
  fontSizeH6,
} from 'styles/typography';

type Props = {
  inverse?: boolean,
  align?: 'left' | 'center' | 'right' | 'inherit',
  children: Node,
  element:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6',
  size?:
    | 'alpha'
    | 'beta'
    | 'gamma'
    | 'delta'
    | 'epsilon'
    | 'zeta',
  noMargin?: boolean,
};

const renderFontSize = (size: string) => {
  if (size === 'alpha') {
    return fontSizeH1;
  } if (size === 'beta') {
    return fontSizeH2;
  } if (size === 'gamma') {
    return fontSizeH3;
  } if (size === 'delta') {
    return fontSizeH4;
  } if (size === 'epsilon') {
    return fontSizeH5;
  } if (size === 'zeta') {
    return fontSizeH6;
  }
  return fontSizeH1;
};

const StyledHeading = styled.h1`
  font-family: ${headingsFontFamily};
  color: ${(props: Props) => (props.inverse ? white : headingsColor)};
  line-height: ${lineHeightSmall};
  margin-bottom: ${(props: Props) => (props.noMargin ? '0' : baseSpacer)};
  font-size: ${(props: Props) => props.size && renderFontSize(props.size)};
  text-align: ${(props: Props) => props.align};
  white-space: pre-line;
`;

const Heading = (props: Props) => (
  <HeaderComponent {...props}>
    {props.children}
  </HeaderComponent>
);

// This allows you to choose the semantically correct heading level
// while still allowing you to pass the 'size' prop to control sizing
// Example: <Heading element="h1" size="gamma"> will be an H1 but size of a H3 (aka "gamma" size)
// Note: a size is always required!
const wrappers = {
  h1: StyledHeading,
  h2: StyledHeading.withComponent('h2'),
  h3: StyledHeading.withComponent('h3'),
  h4: StyledHeading.withComponent('h4'),
  h5: StyledHeading.withComponent('h5'),
  h6: StyledHeading.withComponent('h6'),
};

const HeaderComponent = (props: Props) => {
  const Dummy = wrappers[props.element];
  return (
    <Dummy {...props}>
      {props.children}
    </Dummy>
  );
};

HeaderComponent.displayName = 'HeaderComponent';
HeaderComponent.defaultProps = {
  align: 'inherit',
  inverse: false,
  size: 'alpha',
  noMargin: false,
};

Heading.displayName = 'Heading';
Heading.defaultProps = {
  align: 'inherit',
  inverse: false,
  size: 'alpha',
  noMargin: false,
};

export default Heading;
