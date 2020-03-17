import React, { useState, FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { useField, FieldMetaProps, FormikHelpers } from 'formik';
import StringMask from 'string-mask';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Select, { CommonProps } from 'react-select';

import {
  inputHeight, inputPaddingY, inputPaddingX, baseSpacer, borderRadius, sextupleSpacer, doubleSpacer,
} from '../styles/size';
import { fontSizeBase, lineHeightBase, fontSizeSmall } from '../styles/typography';
import {
  textColor, white, brandDanger, brandDangerRGB, brandPrimary, brandPrimaryRGB,
  lightGray, offWhite,
} from '../styles/color';
import { baseBorderStyle, disabledStyle, visuallyHiddenStyle } from '../styles/mixins';

type OptionType = { label: string; value: string; }

type InputProps = {
  disabled?: boolean;
  id?: string;
  name: string;
  square?: boolean;
  hiddenLabel?: boolean;
  type: string;
  label: string;
  helpText?: string;
  checked?: boolean;
  options?: OptionType[];
} & FieldMetaProps<string> & FormikHelpers<string> & CommonProps<OptionType | OptionType[]>

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
  border-radius: ${borderRadius};
  transition: border-color .2s ease-in-out;

  ${(props: InputProps) => props.square && 'text-align: center;'}

  ${(meta: FieldMetaProps<string>) => (meta && meta.touched && meta.error && `
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

const StyledSelect = styled(Select)`
  & > div:first-child {
    ${(props: { invalid?: boolean }) => (props.invalid && `
      border: 2px solid ${brandDanger};
  `)}
  }
`;

const InputWrapper = styled.div`
  margin-bottom: ${baseSpacer};
  ${(props: { square?: boolean }) => props.square && `max-width: ${inputHeight};`}
`;

const StyledToggle = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
    
  &:checked + label {
    background: ${brandPrimary};
  }

  &:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
`;

const StyledToggleLabel = styled.label<{ checked?: boolean, disabled?: boolean }>`
  cursor: pointer;
  width: ${sextupleSpacer};
  height: 42px;
  background: ${lightGray};
  display: inline-block;
  border-radius: 42px;
  position: relative;
  margin: 0;

  &:after {
    content: '${(props) => (props.checked ? 'Yes' : 'No')}';
    position: absolute;
    top: 5px;
    left: 5px;
    width: ${doubleSpacer};
    height: ${doubleSpacer};
    background: ${white};
    border-radius: ${doubleSpacer};
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${fontSizeSmall};
    color: ${(props) => (props.checked ? brandPrimary : textColor)};
  }

  /* Disabled state */
  ${(props) => (props.disabled && disabledStyle)}
`;

const StyledLabel = styled.label<{ hiddenLabel?: boolean, invalid?: boolean }>`
  ${(props) => props.hiddenLabel && visuallyHiddenStyle}
  ${(props) => (props.invalid && `
    color: ${brandDanger};
  `)}
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.div`
  position: absolute;
  right: ${baseSpacer};
  top: ${baseSpacer};
`;

const multiSelectStyles = {
  option: (provided: any, state: { isFocused: boolean }) => ({
    ...provided,
    color: brandPrimary,
    backgroundColor: state.isFocused ? offWhite : white,
  }),
  control: (provided: any, state: { isFocused: boolean }) => ({
    ...provided,
    minHeight: inputHeight,
    fontSize: fontSizeBase,
    lineHeight: lineHeightBase,
    color: textColor,
    backgroundColor: white,
    border: state.isFocused ? `2px solid ${brandPrimary}` : baseBorderStyle,
    boxShadow: state.isFocused && 'none',
    '&:hover': {
      border: state.isFocused ? `2px solid ${brandPrimary}` : baseBorderStyle,
    },
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    '&:hover': {
      backgroundColor: brandDanger,
      color: white,
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: textColor,
  }),
};

const Input: FunctionComponent<InputProps> = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField<string>(props.name);
  // state for toggling password visibility
  const [passwordVisibility, setPasswordVisibiility] = useState(false);

  let inputTypeToRender;

  switch (props.type) {
    case 'select': {
      const onChange = (option: OptionType[] | OptionType) => {
        props.setFieldValue(
          field.name,
          // eslint-disable-next-line no-nested-ternary
          props.isMulti ?
            (option ? (option as OptionType[]).map((item: OptionType) => item.value) : [])
            : (option as OptionType).value,
        );
      };
      inputTypeToRender = (
        <StyledSelect
          styles={multiSelectStyles}
          isMulti={props.isMulti}
          menuPlacement="auto"
          value={props.options ? props.options.find((option) => option.value === field.value) : ''}
          options={props.options}
          name={props.name}
          onChange={(option: OptionType) => onChange(option)}
          onBlur={() => props.setFieldTouched(props.name)}
          isDisabled={props.disabled}
          invalid={meta && meta.touched && meta.error}
        />
      );
    }
      break;
    case 'checkbox':
      inputTypeToRender = (
        <>
          <StyledLabel>{props.label}</StyledLabel>
          <StyledToggle
            {...field}
            {...props}
            {...meta}
            id={props.name}
            checked={props.checked}
          />
          <StyledToggleLabel
            htmlFor={props.name}
            disabled={props.disabled}
            checked={props.checked}
          />
        </>
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
          id={props.name}
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
            id={props.name}
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
          id={props.name}
          type={props.type}
          square={props.square}
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
        props.label && props.type !== 'checkbox' && (
          <StyledLabel
            htmlFor={props.id || props.name}
            hiddenLabel={props.hiddenLabel}
            invalid={meta && meta.touched && meta.error != null}
          >
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
