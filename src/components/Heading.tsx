import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import { baseSpacer, doubleSpacer } from '../styles/size';
import { white, brandPrimary, headingsColor, brandTertiaryHover } from '../styles/color';
import {
  fontSizeH1,
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  fontSizeH5,
  fontSizeH6,
  lineHeightSmall,
} from '../styles/typography';

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  inverse?: boolean;
  noMargin?: boolean;
  align?: 'left' | 'center' | 'right';
  styledAs?: 'title' | 'subtitle' | 'sectionHeading' | null;
  id?: string;
};

const renderFontSize = (as: HeadingProps['as']) => {
  if (as === 'h1') {
    return fontSizeH1;
  }
  if (as === 'h2') {
    return fontSizeH2;
  }
  if (as === 'h3') {
    return fontSizeH3;
  }
  if (as === 'h4') {
    return fontSizeH4;
  }
  if (as === 'h5') {
    return fontSizeH5;
  }
  if (as === 'h6') {
    return fontSizeH6;
  }
  return fontSizeH1;
};

const renderStyledAs = (styledAs: HeadingProps['styledAs']) => {
  if (styledAs === 'title') {
    return `
      color: ${brandPrimary};
      font-size: ${fontSizeH1};
    `;
  }
  if (styledAs === 'subtitle') {
    return `
      color: ${brandTertiaryHover};
      font-size: ${fontSizeH4};
    `;
  }
  if (styledAs === 'sectionHeading') {
    return `
      color: ${brandTertiaryHover};
      text-align: center;
      display: table;
      white-space: nowrap;
      overflow: hidden;
      margin: ${doubleSpacer} 0;

      &:before,
      &:after {
        border-top: 1px solid ${brandTertiaryHover};
        content: '';
        display: table-cell;
        position: relative;
        top: 0.5em;
        width: 45%;
      }
      &:before {
        right: 1.5%;
      }
      &:after {
        left: 1.5%;
      }
    `;
  }
  return null;
};

const StyledHeading = styled.h1`
  font-weight: 700;
  line-height: ${lineHeightSmall};
  color: ${(props: HeadingProps) => (props.inverse ? white : headingsColor)};
  margin-bottom: ${(props: HeadingProps) => (props.noMargin ? '0' : baseSpacer)};
  text-align: ${(props: HeadingProps) => props.align};
  white-space: pre-line;
  font-size: ${(props: HeadingProps) => props.as && renderFontSize(props.as)};
  ${(props: HeadingProps) => props.styledAs && renderStyledAs(props.styledAs)};
`;

const Heading: FunctionComponent<HeadingProps> = (props) => (
  <StyledHeading
    as={props.as}
    noMargin={props.noMargin}
    inverse={props.inverse}
    align={props.align}
    styledAs={props.styledAs}
    id={props.id}
  >
    {props.children}
  </StyledHeading>
);

Heading.defaultProps = {
  as: 'h1',
  inverse: false,
  noMargin: false,
  align: 'left',
  styledAs: null,
};

export default Heading;
