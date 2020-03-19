import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

import {
  baseAndAHalfSpacer,
  doubleSpacer,
  tripleSpacer,
  quadrupleSpacer,
} from '../styles/size';
import { baseBorderStyle } from '../styles/mixins';

type AvatarProps = {
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const renderSize = (size: AvatarProps['size']) => {
  if (size === 'xs') {
    return baseAndAHalfSpacer;
  }
  if (size === 'sm') {
    return doubleSpacer;
  }
  if (size === 'md') {
    return tripleSpacer;
  }
  if (size === 'lg') {
    return quadrupleSpacer;
  }
  return doubleSpacer;
};

const AvatarImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
  height: ${(props: { size: AvatarProps['size'] }) =>
    props.size && renderSize(props.size)};
  width: ${(props: { size: AvatarProps['size'] }) =>
    props.size && renderSize(props.size)};
  border: ${baseBorderStyle};
`;

const StyledAvatar = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
`;

const Avatar: FunctionComponent<AvatarProps> = props => {
  if (props.src) {
    return <AvatarImage src={props.src} size={props.size} alt="" />;
  }
  if (!props.src) {
    return (
      <StyledAvatar>
        <FaUserCircle size={renderSize(props.size)} />
      </StyledAvatar>
    );
  }
  return null;
};

Avatar.defaultProps = {
  size: 'sm',
};

export default Avatar;
