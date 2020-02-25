import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { useField } from 'formik';

import {
  inputHeight, inputPaddingY, inputPaddingX, baseSpacer, borderRadius, quarterSpacer,
} from '../styles/size';
import { fontSizeBase, lineHeightBase, fontSizeSmall } from '../styles/typography';
import {
  textColor, white, brandDanger, brandDangerRGB, brandPrimary, brandPrimaryRGB,
} from '../styles/color';
import { baseBorderStyle, disabledStyle, visuallyHiddenStyle } from '../styles/mixins';

type InputProps = {
  disabled: boolean;
  id: string;
  name: string;
  square: boolean;
  hiddenLabel?: boolean;
  type: string;
  label: string;
}

const sharedStyles = css`
  display: block;
  width: ${(props: InputProps) => (props.square ? inputHeight : '100%')};
  height: ${inputHeight};
  padding: ${inputPaddingY} ${inputPaddingX};
  font-size: ${fontSizeBase};
  line-height: ${lineHeightBase};
  color: ${textColor};
  background-color: ${white};
  background-image: none;
  border: ${baseBorderStyle};
  transition: border-color .2s ease-in-out;
  ${(props: InputProps) => props.square && `margin: 0 ${quarterSpacer};`}
  
  ${(meta) => (meta && meta.touched && meta.error && `
      border-color: ${brandDanger};
      border-width: 2px;
      // box-shadow: 0 0 0 ${borderRadius} rgba(${brandDangerRGB},.25);
  `)}
  
  &:focus {
    border-color: ${brandPrimary};
    border-width: 2px;
    outline: 0;
    // box-shadow: 0 0 0 ${borderRadius} rgba(${brandPrimaryRGB},.25);
  }
  
  /* Disabled state */
  ${(props: InputProps) => (props.disabled && disabledStyle)}
`;

const StyledInput = styled.input`
  ${sharedStyles}
`;

const StyledErrorMessage = styled.div`
  color: ${brandDanger};
  font-size: ${fontSizeSmall};
`;

const InputWrapper = styled.div`
  margin-bottom: ${baseSpacer};
`;

const StyledSelect = styled.select`
  ${sharedStyles}
`;

const StyledLabel = styled.label`
  ${(props: InputProps) => props.hiddenLabel && visuallyHiddenStyle}
`;

const Input: FunctionComponent<InputProps> = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props.name);

  let inputTypeToRender;

  switch (props.type) {
    case 'select':
      inputTypeToRender = (
        <StyledSelect type="select" {...field} {...props} {...meta}>
          {props.children}
        </StyledSelect>
      );
      break;
    default:
      inputTypeToRender = (
        <StyledInput
          type={props.type}
          square={props.square}
          placeholder={!props.square ? `Enter ${props.label}` : ''}
          {...field}
          {...props}
          {...meta}
        />
      );
      break;
  }

  return (
    <InputWrapper>
      {
        props.label && (
          <StyledLabel htmlFor={props.id || props.name} hidden={props.hiddenLabel}>
            {props.label}
          </StyledLabel>
        )
      }
      {inputTypeToRender}
      {
        meta && meta.touched && meta.error && !props.square && (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        )
      }
    </InputWrapper>
  );
};

export default Input;
