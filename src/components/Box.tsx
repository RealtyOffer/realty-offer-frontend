import React, { FunctionComponent } from 'react';
import styled, { css, CSSProperties } from 'styled-components';
import { FluidObject } from 'gatsby-image';

import { baseSpacer, doubleSpacer, quadrupleSpacer } from '../styles/size';
import { white, brandPrimaryAccentLight } from '../styles/color';
import { z1Shadow, z2Shadow, z3Shadow, z4Shadow } from '../styles/mixins';

type BoxProps = {
  style?: CSSProperties;
  textAlign?: 'center' | 'left' | 'right';
  height?: string;
  zindex?: 1 | 2 | 3 | 4;
  largePadding?: boolean;
  backgroundAccent?: boolean;
  footer?: JSX.Element;
  bgSrc?: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  transparent?: boolean;
};

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
  padding: ${(props: BoxProps) => (props.largePadding ? doubleSpacer : baseSpacer)};
  margin-bottom: ${baseSpacer};
  box-shadow: ${(props: BoxProps) => props.zindex && renderShadow(props.zindex)};
  text-align: ${(props: BoxProps) => props.textAlign};
  height: ${(props: BoxProps) => (props.height ? `${props.height}` : `calc(100% - ${baseSpacer})`)};
  background: ${(props: BoxProps) =>
    // eslint-disable-next-line no-nested-ternary
    props.bgSrc
      ? `url(${props.bgSrc.childImageSharp.fluid.src}) center center / cover no-repeat`
      : props.transparent
      ? 'rgba(255,255,255,.9)'
      : white};
  ${(props: BoxProps) =>
    props.footer &&
    css`
      position: relative;
      padding-bottom: ${quadrupleSpacer};
    `}
`;

const StyledBoxBackground = styled.div`
  background-color: ${brandPrimaryAccentLight};
  padding: ${doubleSpacer};
`;

const BackgroundImageOverlay = styled.div`
  background-color: rgba(255, 255, 255, 0.75);
  height: 100%;
  padding: ${baseSpacer};
`;

const StyledBoxFooter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Box: FunctionComponent<BoxProps> = ({
  textAlign,
  height,
  zindex,
  children,
  largePadding,
  backgroundAccent,
  bgSrc,
  footer,
  transparent,
  ...rest
}) => (
  <StyledBox
    bgSrc={bgSrc}
    textAlign={textAlign}
    height={height}
    zindex={zindex}
    largePadding={largePadding}
    footer={footer}
    transparent={transparent}
    {...rest}
  >
    {bgSrc && !backgroundAccent && <BackgroundImageOverlay>{children}</BackgroundImageOverlay>}
    {!bgSrc && backgroundAccent && <StyledBoxBackground>{children}</StyledBoxBackground>}
    {!bgSrc && !backgroundAccent && children}
    {footer && <StyledBoxFooter>{footer}</StyledBoxFooter>}
  </StyledBox>
);

Box.defaultProps = {
  zindex: 1,
};

export default Box;
