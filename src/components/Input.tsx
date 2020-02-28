import React, { useState, FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { useField } from 'formik';
import StringMask from 'string-mask';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import {
  inputHeight, inputPaddingY, inputPaddingX, baseSpacer, borderRadius, quarterSpacer,
} from '../styles/size';
import { fontSizeBase, lineHeightBase, fontSizeSmall } from '../styles/typography';
import {
  textColor, white, brandDanger, brandDangerRGB, brandPrimary, brandPrimaryRGB,
} from '../styles/color';
import { baseBorderStyle, disabledStyle, visuallyHiddenStyle } from '../styles/mixins';


type InputProps = {
  disabled?: boolean;
  id?: string;
  name: string;
  square?: boolean;
  hiddenLabel?: boolean;
  type: string;
  label: string;
  helpText?: string;
}

const sharedStyles = css`
  display: block;
  width: 100%;
  height: ${inputHeight};
  padding: ${inputPaddingY} ${inputPaddingX};
  font-size: ${fontSizeBase};
  line-height: ${lineHeightBase};
  color: ${textColor};
  background-color: ${white};
  background-image: none;
  border: ${baseBorderStyle};
  transition: border-color .2s ease-in-out;

  ${(props: InputProps) => props.square && 'text-align: center;'}

  ${(meta) => (meta && meta.touched && meta.error && `
      border-color: ${brandDanger};
      border-width: 2px;
      // box-shadow: 0 0 0 ${borderRadius} rgba(${brandDangerRGB},.25);
  `)}
  
  &:focus {
    border-color: ${brandPrimary};
    border-width: 2px;
    outline: 0;
    /* box-shadow: 0 0 0 ${borderRadius} rgba(${brandPrimaryRGB},.25); */
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
  ${(props: InputProps) => props.square && `max-width: ${inputHeight};`}
`;

const StyledSelect = styled.select`
  ${sharedStyles}
`;

const StyledLabel = styled.label`
  ${(props: InputProps) => props.hiddenLabel && visuallyHiddenStyle}
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.div`
  position: absolute;
  right: ${baseSpacer};
  top: ${baseSpacer};
`;

const Input: FunctionComponent<InputProps> = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props.name);
  // state for toggling password visibility
  const [passwordVisibility, setPasswordVisibiility] = useState(false);

  let inputTypeToRender;

  switch (props.type) {
    case 'select':
      inputTypeToRender = (
        <StyledSelect type="select" {...field} {...props} {...meta}>
          {props.children}
        </StyledSelect>
      );
      break;
    case 'tel': {
      const phoneDelimiter = '-';
      const phoneMask = '000-000-0000';
      const removeTrailingCharIfFound = (str: string, char: string) => str
        .split(char)
        .filter((segment) => segment !== '')
        .join(char);
      const formatValue = (str: string) => {
        const unmaskedValue = str.split(phoneDelimiter).join('');
        const formatted = StringMask.process(unmaskedValue, phoneMask);
        return removeTrailingCharIfFound(formatted.result, phoneDelimiter);
      };
      inputTypeToRender = (
        <StyledInput
          type="tel"
          placeholder={!props.square ? `Enter ${props.label}` : ''}
          {...field}
          {...props}
          {...meta}
          onChange={(event) => {
            field.onChange(event.target.name)(
              formatValue(event.target.value),
            );
          }}
        />
      );
    }
      break;
    case 'password':
      inputTypeToRender = (
        <PasswordWrapper>
          <StyledInput
            type="password"
            placeholder={!props.square ? `Enter ${props.label}` : ''}
            {...field}
            {...props}
            {...meta}
          />
          <PasswordToggle onClick={() => setPasswordVisibiility(!passwordVisibility)}>
            {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
          </PasswordToggle>
          {
            passwordVisibility && field.value.length > 0 && (
              <span style={{ marginLeft: baseSpacer }}>{field.value}</span>
            )
          }
        </PasswordWrapper>
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
    <InputWrapper square={props.square}>
      {
        props.label && (
          <StyledLabel htmlFor={props.id || props.name} hiddenLabel={props.hiddenLabel}>
            {props.label}
          </StyledLabel>
        )
      }
      {inputTypeToRender}
      {props.helpText && <small>{props.helpText}</small>}
      {
        meta && meta.touched && meta.error && !props.square && (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        )
      }
    </InputWrapper>
  );
};

export default Input;
