import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { baseSpacer, doubleSpacer } from '../styles/size';
import { white } from '../styles/color';
import {
  z1Shadow, z2Shadow, z3Shadow, z4Shadow,
} from '../styles/mixins';

type BoxProps = {
  textAlign?: 'center' | 'left' | 'right';
  height?: number;
  zindex?: 1 | 2 | 3 | 4;
  largePadding?: boolean;
}

const renderShadow = (zindex: number) => {
  if (zindex === 1) {
    return z1Shadow;
  }
  if (zindex === 2) {
    return z2Shadow;
  }
  if (zindex === 3) {
    return z3Shadow;
  }
  if (zindex === 4) {
    return z4Shadow;
  }
  return z1Shadow;
};

const StyledBox = styled.div`
  background: ${white};
  padding: ${(props: BoxProps) => (props.largePadding ? doubleSpacer : baseSpacer)};
  margin-bottom: ${baseSpacer};
  box-shadow: ${(props: BoxProps) => props.zindex && renderShadow(props.zindex)};
  text-align: ${(props: BoxProps) => props.textAlign};
  height: ${(props: BoxProps) => (props.height ? `${props.height}px` : `calc(100% - ${baseSpacer})`)};
`;

const Box: FunctionComponent<BoxProps> = ({
  textAlign, height, zindex, children, largePadding,
}) => (
  <StyledBox
    textAlign={textAlign}
    height={height}
    zindex={zindex}
    largePadding={largePadding}
  >
    {children}
  </StyledBox>
);

export default Box;
