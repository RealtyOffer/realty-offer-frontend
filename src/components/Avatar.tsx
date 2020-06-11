import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { baseAndAHalfSpacer, doubleSpacer, tripleSpacer, sextupleSpacer } from '../styles/size';
import profilePic from '../images/profile-pic.svg';

type AvatarProps = {
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  bottomMargin?: boolean;
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
    return sextupleSpacer;
  }
  return doubleSpacer;
};

const AvatarImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
  height: ${(props: { size: AvatarProps['size'] }) => props.size && renderSize(props.size)};
  width: ${(props: { size: AvatarProps['size'] }) => props.size && renderSize(props.size)};
`;

const Avatar: FunctionComponent<AvatarProps> = (props) => (
  <AvatarImage src={props.src || profilePic} size={props.size} />
);

Avatar.defaultProps = {
  size: 'sm',
};

export default Avatar;
