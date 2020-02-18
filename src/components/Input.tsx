import React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

import {
  inputHeight, inputPaddingY, inputPaddingX, baseSpacer, borderRadius,
} from '../styles/size';
import { fontSizeBase, lineHeightBase, fontSizeSmall } from '../styles/typography';
import {
  textColor, white, brandDanger, brandDangerRGB, brandPrimary, brandPrimaryRGB,
} from '../styles/color';
import { baseBorderStyle, disabledStyle } from '../styles/mixins';

type InputProps = {
  meta: {
    touched: boolean;
    error: string;
  };
  disabled: boolean;
  id: string;
  name: string;
}

const StyledInput = styled.input`
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
  
  ${(meta) => (meta.touched && meta.error && `
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

const StyledErrorMessage = styled.div`
  color: ${brandDanger};
  font-size: ${fontSizeSmall};
`;

const InputWrapper = styled.div`
  margin-bottom: ${baseSpacer};
`;

const Input = ({
  label, id, name, ...props
}: { label: string; id: string; name: string; }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(name);
  return (
    <InputWrapper>
      <label htmlFor={id || name}>{label}</label>
      <StyledInput {...field} {...props} {...meta} placeholder={`Enter ${label}`} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage className="error">{meta.error}</StyledErrorMessage>
      ) : null}
    </InputWrapper>
  );
};

export default Input;
