import React, { useState, FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { useField, FieldMetaProps, FormikHelpers } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Select, { CommonProps } from 'react-select';

import {
  inputHeight,
  inputPaddingY,
  inputPaddingX,
  baseSpacer,
  borderRadius,
  sextupleSpacer,
  doubleSpacer,
  threeQuarterSpacer,
} from '../styles/size';
import { fontSizeBase, lineHeightBase, fontSizeSmall } from '../styles/typography';
import {
  textColor,
  white,
  brandDanger,
  brandDangerRGB,
  brandPrimary,
  brandPrimaryRGB,
  brandTertiary,
  lightGray,
  offWhite,
  brandTertiaryHover,
} from '../styles/color';
import { baseBorderStyle, disabledStyle, visuallyHiddenStyle } from '../styles/mixins';
import { formatPhoneNumberValue } from '../utils/phoneNumber';
import { formatCreditCardValue } from '../utils/creditCard';

type OptionType = { label: string; value: string };

type InputProps = {
  disabled?: boolean;
  id?: string;
  name: string;
  square?: boolean;
  hiddenLabel?: boolean;
  type: string;
  label: string;
  helpText?: string | JSX.Element;
  checked?: boolean;
  options?: OptionType[];
  required?: boolean;
  alignRight?: boolean;
} & FieldMetaProps<string> &
  FormikHelpers<string> &
  CommonProps<OptionType | OptionType[], boolean>;

const sharedStyles = css`
  display: block;
  width: 100%;
  height: ${(props: InputProps) => (props.type === 'textarea' ? 'auto' : inputHeight)};
  padding: ${inputPaddingY} ${inputPaddingX};
  /* dont use fontSizeBase for font-size, because less than 16px and it will cause mobile viewports to zoom in */
  font-size: 16px;
  line-height: ${lineHeightBase};
  color: ${textColor};
  background-color: ${white};
  background-image: none;
  border: ${baseBorderStyle};
  border-radius: ${borderRadius};
  transition: border-color .2s ease-in-out;

  ${(props: InputProps) => props.square && 'text-align: center;'}

  ${(meta: FieldMetaProps<string>) =>
    meta &&
    meta.touched &&
    meta.error &&
    `
      border-color: ${brandDanger};
      border-width: 2px;
      // box-shadow: 0 0 0 ${borderRadius} rgba(${brandDangerRGB},.25);
  `}
  
  &:focus {
    border-color: ${brandPrimary};
    border-width: 2px;
    outline: 0;
    /* box-shadow: 0 0 0 ${borderRadius} rgba(${brandPrimaryRGB},.25); */
  }
  
  /* Disabled state */
  ${(props: InputProps) => props.disabled && disabledStyle}
`;

const StyledInput = styled.input`
  ${sharedStyles}
`;

const StyledTextarea = styled.textarea`
  resize: none;
  min-height: ${inputHeight};
  ${sharedStyles}
`;

const StyledErrorMessage = styled.div`
  color: ${brandDanger};
  font-size: ${fontSizeSmall};
`;

const StyledSelect = styled(Select)`
  & > div:first-child {
    ${(props: { invalid?: boolean }) =>
      props.invalid &&
      `
      border: 2px solid ${brandDanger};
  `}
  }
`;

const InputWrapper = styled.div`
  ${(props: { alignRight?: boolean; square?: boolean; hidden?: boolean }) =>
    props.alignRight && `text-align: right;`}
  margin-bottom: ${baseSpacer};
  ${(props) => props.square && `max-width: ${inputHeight};`}
  ${(props) => props.hidden && `display: none;`}
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

const StyledToggleLabel = styled.label<{
  checked?: boolean;
  disabled?: boolean;
}>`
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
  ${(props) => props.disabled && disabledStyle}
`;

const StyledLabel = styled.label<{
  hiddenLabel?: boolean;
  invalid?: boolean;
  required?: boolean;
}>`
  font-weight: bold;
  color: ${brandTertiaryHover};
  margin: 0;
  ${(props) => props.hiddenLabel && visuallyHiddenStyle}
  ${(props) =>
    props.invalid &&
    `
    color: ${brandDanger};
  `}
  ${(props) =>
    props.required &&
    `
    &:after {
      content: ' *';
      color: ${brandDanger};
    }
  `}
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.div`
  position: absolute;
  right: ${baseSpacer};
  top: ${threeQuarterSpacer};
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
    case 'select':
      {
        const onChange = (option: OptionType[] | OptionType) => {
          props.setFieldValue(
            field.name,
            // eslint-disable-next-line no-nested-ternary
            props.isMulti
              ? option
                ? (option as OptionType[]).map((item: OptionType) => item.value)
                : []
              : (option as OptionType).value
          );
        };

        const setValue = (value: string | Array<string>) => {
          return props.isMulti
            ? (value as Array<string>).map((item) =>
                props.options.find((option) => option.value === item)
              )
            : props.options.find((option) => option.value === value);
        };

        inputTypeToRender = (
          <StyledSelect
            styles={multiSelectStyles}
            isMulti={props.isMulti}
            menuPlacement="auto"
            value={setValue(field.value)}
            options={props.options}
            name={props.name}
            onChange={(option: OptionType) => onChange(option)}
            onBlur={() => props.setFieldTouched(props.name)}
            blurInputOnSelect={!props.required}
            isDisabled={props.disabled}
            invalid={meta && meta.touched && meta.error}
          />
        );
      }
      break;
    case 'checkbox':
      inputTypeToRender = (
        <>
          <StyledLabel htmlFor={props.id || props.name}>
            <input {...field} {...props} id={props.name} checked={props.checked} /> {props.label}
          </StyledLabel>
        </>
      );
      break;
    case 'toggle':
      inputTypeToRender = (
        <>
          <StyledLabel htmlFor={props.id || props.name}>{props.label}</StyledLabel>
          <StyledToggle
            {...field}
            {...props}
            {...meta}
            id={props.name}
            checked={props.checked}
            type="checkbox"
          />
          <StyledToggleLabel
            htmlFor={props.name}
            disabled={props.disabled}
            checked={props.checked}
          />
        </>
      );
      break;
    case 'tel':
      inputTypeToRender = (
        <StyledInput
          id={props.name}
          {...field}
          {...props}
          {...meta}
          onChange={(event) => {
            field.onChange(event.target.name)(formatPhoneNumberValue(event.target.value));
          }}
        />
      );
      break;
    case 'creditCard':
      inputTypeToRender = (
        <StyledInput
          id={props.name}
          {...field}
          {...props}
          {...meta}
          type="text"
          onChange={(event) => {
            field.onChange(event.target.name)(formatCreditCardValue(event.target.value));
          }}
        />
      );
      break;
    case 'password':
      inputTypeToRender = (
        <PasswordWrapper>
          <StyledInput
            id={props.name}
            {...field}
            {...props}
            {...meta}
            type={!passwordVisibility ? 'password' : 'text'}
          />
          <PasswordToggle onClick={() => setPasswordVisibiility(!passwordVisibility)}>
            {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
          </PasswordToggle>
        </PasswordWrapper>
      );
      break;
    case 'textarea':
      inputTypeToRender = (
        <StyledTextarea id={props.name} rows={3} {...field} {...props} {...meta} />
      );
      break;
    case 'hidden':
      inputTypeToRender = <StyledInput id={props.name} {...field} {...props} {...meta} />;
      break;
    default:
      inputTypeToRender = (
        <StyledInput id={props.name} square={props.square} {...field} {...props} {...meta} />
      );
      break;
  }

  return (
    <InputWrapper
      square={props.square}
      hidden={props.type === 'hidden'}
      alignRight={props.alignRight}
    >
      {props.label && props.type !== 'toggle' && props.type !== 'checkbox' && (
        <StyledLabel
          htmlFor={props.id || props.name}
          hiddenLabel={props.hiddenLabel}
          invalid={meta && meta.touched && meta.error != null}
          required={props.required || false}
          title={props.required ? `${props.label}: Required` : props.label}
        >
          {props.label}
        </StyledLabel>
      )}
      {inputTypeToRender}
      {props.helpText && <small>{props.helpText}</small>}
      {meta && meta.touched && meta.error && !props.square && (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      )}
    </InputWrapper>
  );
};

export default Input;
