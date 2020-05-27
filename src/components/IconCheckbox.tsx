import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useField, FieldMetaProps, FormikHelpers } from 'formik';
import { FaEnvelope, FaCommentDots, FaMobileAlt, FaDesktop } from 'react-icons/fa';

import { brandPrimary, lightGray } from '../styles/color';
import { fontSizeH1 } from '../styles/typography';

type IconCheckboxProps = {
  id?: string;
  name: string;
  checked?: boolean;
  icon: 'email' | 'sms' | 'phone' | 'desktop';
  onChange: () => void;
} & FieldMetaProps<string> &
  FormikHelpers<string>;

const HiddenCheckboxInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  display: none;
`;

const IconWrapperLabel = styled.label<{
  checked?: boolean;
}>`
  cursor: pointer;
  font-size: ${fontSizeH1};
`;

const IconCheckbox: FunctionComponent<IconCheckboxProps> = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField<string>(props.name);
  let inputTypeToRender;

  switch (props.icon) {
    case 'email':
      inputTypeToRender = <FaEnvelope color={props.checked ? brandPrimary : lightGray} />;
      break;
    case 'desktop':
      inputTypeToRender = <FaDesktop color={props.checked ? brandPrimary : lightGray} />;
      break;
    case 'sms':
      inputTypeToRender = <FaCommentDots color={props.checked ? brandPrimary : lightGray} />;
      break;
    case 'phone':
      inputTypeToRender = <FaMobileAlt color={props.checked ? brandPrimary : lightGray} />;
      break;
    default:
      inputTypeToRender = <FaEnvelope color={props.checked ? brandPrimary : lightGray} />;
      break;
  }

  return (
    <>
      <HiddenCheckboxInput
        type="checkbox"
        {...field}
        {...props}
        {...meta}
        id={props.name}
        checked={props.checked}
        onChange={props.onChange}
      />
      <IconWrapperLabel htmlFor={props.name} checked={props.checked}>
        {inputTypeToRender}
      </IconWrapperLabel>
    </>
  );
};

export default IconCheckbox;
