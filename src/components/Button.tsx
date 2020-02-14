import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import {
  baseSpacer, baseAndAHalfSpacer, borderWidth, halfSpacer,
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
} from '../styles/color';
import { disabledStyle, baseBorderLightStyle } from '../styles/mixins';

// import Icon from './Icon';

export type ButtonProps = {
  type:'submit' | 'button' | 'reset' | 'link';
  color?: 'text' | 'primary' | 'primaryOutline' | 'success' | 'successOutline' |'danger' | 'dangerOutline';
  rightSpacer?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  to?: string;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  title?: string;
  block?: boolean;
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
  }
`;

const successOutlineButtonStyles = `
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
    filter: brightness(115%);
  }
`;

const dangerOutlineButtonStyles = `
  border-color: ${brandDanger};
  color: ${brandDanger};
  
  &:hover,
  &:focus {
    background-color: ${brandDanger};
    color: ${white};
  }
`;

const textButtonStyles = `
  background-color: transparent;
  color: ${brandPrimary};
`;

const StyledButton = styled.button`
  position: relative;
  display: inline-block;
  ${(props: ButtonProps) => (props.block && 'width: 100%;')}
  font-family: ${fontFamilySansSerif};
  font-size: ${fontSizeBase};
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: ${borderWidth} solid transparent;
  letter-spacing: 1px;
  line-height: 1.5;
  padding: ${halfSpacer} ${baseAndAHalfSpacer};
  transition: all .2s ease-in-out;
  
  /* Color */
  ${(props: ButtonProps) => (props.color === 'primary' && primaryButtonStyles)}
  ${(props: ButtonProps) => (props.color === 'primaryOutline' && primaryOutlineButtonStyles)}
  ${(props: ButtonProps) => (props.color === 'danger' && dangerButtonStyles)}
  ${(props: ButtonProps) => (props.color === 'dangerOutline' && dangerOutlineButtonStyles)}
  ${(props: ButtonProps) => (props.color === 'success' && successButtonStyles)}
  ${(props: ButtonProps) => (props.color === 'successOutline' && successOutlineButtonStyles)}
  ${(props: ButtonProps) => (props.color === 'text' && textButtonStyles)}

  /* Disabled - specific color variations */
  ${(props: ButtonProps) => ((props.color === 'primary' && props.disabled) && primaryDisabledStyles)}
  ${(props: ButtonProps) => ((props.color === 'primaryOutline' && props.disabled) && primaryOutlinedDisabledStyles)}
  ${(props: ButtonProps) => ((props.color === 'text' && props.disabled) && textDisabledStyles)}

  /* Disabled state for all other variations: adds opacity and cursor/pointer-events styling */
  ${(props: ButtonProps) => (props.disabled && disabledStyle)}

  /* When button is next to other items, use rightSpacer give them some breathing room */
  ${(props: ButtonProps) => (props.rightSpacer && `margin-right: ${baseSpacer};`)}
  
  &:active,
  &:focus {
    outline: none;
  }
`;

const StyledLink = StyledButton.withComponent(Link);

class Button extends Component<ButtonProps> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    color: 'primary',
    rightSpacer: false,
    onClick: null,
    to: '',
    disabled: false,
    iconLeft: null,
    iconRight: null,
    title: '',
    block: false,
  };

  render() {
    const {
      color, rightSpacer, to, children, type, onClick, disabled, iconLeft, iconRight, title, block,
    } = this.props;
    let contentToRender;

    switch (type) {
      case 'link':
        contentToRender = (
          <StyledLink
            color={color}
            rightSpacer={rightSpacer}
            to={to}
            disabled={disabled}
            title={title || children}
            block={block}
          >
            {iconLeft}
            {' '}
            {children}
            {' '}
            {iconRight}
          </StyledLink>
        );
        break;
      case 'button':
      case 'submit':
      case 'reset':
      default:
        contentToRender = (
          <StyledButton
            type={type}
            color={color}
            rightSpacer={rightSpacer}
            onClick={onClick}
            disabled={disabled}
            title={title || children}
            block={block}
          >
            {iconLeft}
            {' '}
            {children}
            {' '}
            {iconRight}
          </StyledButton>
        );
        break;
    }

    return contentToRender;
  }
}

export default Button;
