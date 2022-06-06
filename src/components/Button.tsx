import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

import {
  baseSpacer,
  baseAndAHalfSpacer,
  borderWidth,
  halfSpacer,
  borderRadius,
} from '../styles/size';
import { fontFamilySansSerif, fontSizeBase } from '../styles/typography';
import {
  brandPrimary,
  brandPrimaryHover,
  brandDanger,
  white,
  brandSuccess,
  lightGray,
  gray,
  brandTertiary,
  brandTertiaryHover,
} from '../styles/color';
import { disabledStyle } from '../styles/mixins';

import LoadingSpinner from './LoadingSpinner';

type ButtonProps = {
  type: 'submit' | 'button' | 'reset' | 'link';
  color?:
    | 'text'
    | 'primary'
    | 'primaryOutline'
    | 'success'
    | 'successOutline'
    | 'danger'
    | 'dangerOutline'
    | 'tertiary'
    | 'inverseOutline';
  rightspacer?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  to?: string;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  block?: boolean;
  isLoading?: boolean;
  allowTextWrap?: boolean;
};

const primaryButtonStyles = `
  background-color: ${brandPrimary};
  color: ${white};
  
  &:hover,
  &:focus {
    color: ${white};
    background-color: ${brandPrimaryHover};
  }
`;

const primaryOutlineButtonStyles = `
  border-color: ${brandPrimary};
  background-color: ${white};
  color: ${brandPrimary};
  
  &:hover,
  &:focus {
    background-color: ${brandPrimary};
    color: ${white};
  }
`;

const primaryDisabledStyles = `
  background-color: ${lightGray};
  color: ${gray};
`;

const primaryOutlinedDisabledStyles = `
  background-color: ${white};
  border-color: ${lightGray};
  color: ${gray};
`;

const textDisabledStyles = `
  color: ${gray};
`;

const successButtonStyles = `
  background-color: ${brandSuccess};
  color: ${white};
  
  &:hover,
  &:focus {
    filter: brightness(115%);
    background-color: ${brandSuccess};
    color: ${white};
  }
`;

const successOutlineButtonStyles = `
  background-color: ${white};
  border-color: ${brandSuccess};
  color: ${brandSuccess};
  
  &:hover,
  &:focus {
    background-color: ${brandSuccess};
    color: ${white};
  }
`;

const dangerButtonStyles = `
  background-color: ${brandDanger};
  color: ${white};
  
  &:hover,
  &:focus {
    background-color: ${brandDanger};
    filter: brightness(115%);
  }
`;

const dangerOutlineButtonStyles = `
  background-color: ${white};
  border-color: ${brandDanger};
  color: ${brandDanger};
  
  &:hover,
  &:focus {
    background-color: ${brandDanger};
    color: ${white};
  }
`;

const inverseOutlineButtonStyles = `
  background-color: transparent;
  border-color: ${white};
  color: ${white};
`;

const textButtonStyles = `
  background-color: transparent;
  color: ${brandPrimary};
  padding: 0;
  vertical-align: initial;

  &:hover,
  &:focus {
    background-color: transparent;
    color: ${brandPrimaryHover};
    text-decoration: underline;
  }
`;

const tertiaryButtonStyles = `
  background-color: ${brandTertiary};
  color: ${white};
  
  &:hover,
  &:focus {
    color: ${white};
    background-color: ${brandTertiaryHover};
  }
`;

const allStyles = css`
  border-radius: ${borderRadius};
  position: relative;
  display: inline-flex;
  ${(props: ButtonProps) => props.block && 'width: 100%;'}
  font-family: ${fontFamilySansSerif};
  font-size: ${fontSizeBase};
  justify-content: center;
  align-items: center;
  white-space: ${(props: ButtonProps) => (props.allowTextWrap ? 'wrap' : 'nowrap')};
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: ${borderWidth} solid transparent;
  letter-spacing: 1px;
  line-height: 1.5;
  padding: ${halfSpacer} ${baseAndAHalfSpacer};
  transition: all .2s ease-in-out;
  text-decoration: none;
  
  /* Color */
  ${primaryButtonStyles}
  ${(props: ButtonProps) => props.color === 'primaryOutline' && primaryOutlineButtonStyles}
  ${(props: ButtonProps) => props.color === 'danger' && dangerButtonStyles}
  ${(props: ButtonProps) => props.color === 'dangerOutline' && dangerOutlineButtonStyles}
  ${(props: ButtonProps) => props.color === 'success' && successButtonStyles}
  ${(props: ButtonProps) => props.color === 'successOutline' && successOutlineButtonStyles}
  ${(props: ButtonProps) => props.color === 'text' && textButtonStyles}
  ${(props: ButtonProps) => props.color === 'tertiary' && tertiaryButtonStyles}
  ${(props: ButtonProps) => props.color === 'inverseOutline' && inverseOutlineButtonStyles}

  /* Disabled - specific color variations */
  ${(props: ButtonProps) => props.color === 'primary' && props.disabled && primaryDisabledStyles}
  ${(props: ButtonProps) =>
    props.color === 'primaryOutline' && props.disabled && primaryOutlinedDisabledStyles}
  ${(props: ButtonProps) => props.color === 'text' && props.disabled && textDisabledStyles}

  /* Disabled state for all other variations: adds opacity and cursor/pointer-events styling */
  ${(props: ButtonProps) => props.disabled && disabledStyle}

  /* When button is next to other items, use rightspacer give them some breathing room */
  ${(props: ButtonProps) => props.rightspacer && `margin-right: ${baseSpacer};`}
  
  &:active,
  &:focus {
    outline: none;
    filter: brightness(.85);
  }

  & svg {
    margin: 0 4px;
  }
`;

const StyledButton = styled.button`
  ${allStyles}
`;

const StyledLink = styled.div`
  ${allStyles}
  padding: 0; /* remove padding from parent div and use in <a> below */

  & > a {
    padding: ${halfSpacer} ${baseAndAHalfSpacer};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: inherit;

    &:hover,
    &:focus {
      color: inherit;
    }
  }
`;

const Button: FunctionComponent<ButtonProps> = ({
  color,
  rightspacer,
  to,
  children,
  type,
  onClick,
  disabled,
  iconLeft,
  iconRight,
  block,
  isLoading,
  allowTextWrap,
}) => {
  if (type === 'link' && to) {
    return (
      <StyledLink
        color={color}
        rightspacer={rightspacer}
        disabled={disabled}
        block={block}
        type={type}
        allowTextWrap={allowTextWrap}
      >
        <Link to={to}>
          {iconLeft}
          {children}
          {iconRight}
        </Link>
      </StyledLink>
    );
  }

  if (type !== 'link') {
    return (
      <StyledButton
        type={type}
        color={color}
        rightspacer={rightspacer}
        onClick={onClick}
        disabled={disabled || isLoading}
        block={block}
        allowTextWrap={allowTextWrap}
      >
        {isLoading && <LoadingSpinner />} {iconLeft}
        {children}
        {iconRight}
      </StyledButton>
    );
  }
  return null;
};

export default Button;
