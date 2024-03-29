import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';

type LoadingSpinnerProps = {};

const CirclesKeyframes = keyframes`
  0% {
    box-shadow:
    0 -27px 0 0 rgba(255, 255, 255, 0.05),
    19px -19px 0 0 rgba(255, 255, 255, 0.1),
    27px 0 0 0 rgba(255, 255, 255, 0.2),
    19px 19px 0 0 rgba(255, 255, 255, 0.3),
    0 27px 0 0 rgba(255, 255, 255, 0.4),
    -19px 19px 0 0 rgba(255, 255, 255, 0.6),
    -27px 0 0 0 rgba(255, 255, 255, 0.8),
    -19px -19px 0 0 rgba(255, 255, 255, 1);
  }
  12.5% {
    box-shadow:
    0 -27px 0 0 rgba(255, 255, 255, 1),
    19px -19px 0 0 rgba(255, 255, 255, 0.05),
    27px 0 0 0 rgba(255, 255, 255, 0.1),
    19px 19px 0 0 rgba(255, 255, 255, 0.2),
    0 27px 0 0 rgba(255, 255, 255, 0.3),
    -19px 19px 0 0 rgba(255, 255, 255, 0.4),
    -27px 0 0 0 rgba(255, 255, 255, 0.6),
    -19px -19px 0 0 rgba(255, 255, 255, 0.8);
  }
  25% {
    box-shadow:
    0 -27px 0 0 rgba(255, 255, 255, 0.8),
    19px -19px 0 0 rgba(255, 255, 255, 1),
    27px 0 0 0 rgba(255, 255, 255, 0.05),
    19px 19px 0 0 rgba(255, 255, 255, 0.1),
    0 27px 0 0 rgba(255, 255, 255, 0.2),
    -19px 19px 0 0 rgba(255, 255, 255, 0.3),
    -27px 0 0 0 rgba(255, 255, 255, 0.4),
    -19px -19px 0 0 rgba(255, 255, 255, 0.6);
  }
  37.5% {
    box-shadow:
    0 -27px 0 0 rgba(255, 255, 255, 0.6),
    19px -19px 0 0 rgba(255, 255, 255, 0.8),
    27px 0 0 0 rgba(255, 255, 255, 1),
    19px 19px 0 0 rgba(255, 255, 255, 0.05),
    0 27px 0 0 rgba(255, 255, 255, 0.1),
    -19px 19px 0 0 rgba(255, 255, 255, 0.2),
    -27px 0 0 0 rgba(255, 255, 255, 0.3),
    -19px -19px 0 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    box-shadow:
    0 -27px 0 0 rgba(255, 255, 255, 0.4),
    19px -19px 0 0 rgba(255, 255, 255, 0.6),
    27px 0 0 0 rgba(255, 255, 255, 0.8),
    19px 19px 0 0 rgba(255, 255, 255, 1),
    0 27px 0 0 rgba(255, 255, 255, 0.05),
    -19px 19px 0 0 rgba(255, 255, 255, 0.1),
    -27px 0 0 0 rgba(255, 255, 255, 0.2),
    -19px -19px 0 0 rgba(255, 255, 255, 0.3);
  }
  62.5% {
    box-shadow:
      0 -27px 0 0 rgba(255, 255, 255, 0.3),
      19px -19px 0 0 rgba(255, 255, 255, 0.4),
      27px 0 0 0 rgba(255, 255, 255, 0.6),
      19px 19px 0 0 rgba(255, 255, 255, 0.8),
      0 27px 0 0 rgba(255, 255, 255, 1),
      -19px 19px 0 0 rgba(255, 255, 255, 0.05),
      -27px 0 0 0 rgba(255, 255, 255, 0.1),
      -19px -19px 0 0 rgba(255, 255, 255, 0.2);
  }
  75% {
    box-shadow:
    0 -27px 0 0 rgba(255, 255, 255, 0.2),
    19px -19px 0 0 rgba(255, 255, 255, 0.3),
    27px 0 0 0 rgba(255, 255, 255, 0.4),
    19px 19px 0 0 rgba(255, 255, 255, 0.6),
    0 27px 0 0 rgba(255, 255, 255, 0.8),
    -19px 19px 0 0 rgba(255, 255, 255, 1),
    -27px 0 0 0 rgba(255, 255, 255, 0.05),
    -19px -19px 0 0 rgba(255, 255, 255, 0.1);
  }
  87.5% {
    box-shadow:
    0 -27px 0 0 rgba(255, 255, 255, 0.1),
    19px -19px 0 0 rgba(255, 255, 255, 0.2),
    27px 0 0 0 rgba(255, 255, 255, 0.3),
    19px 19px 0 0 rgba(255, 255, 255, 0.4),
    0 27px 0 0 rgba(255, 255, 255, 0.6),
    -19px 19px 0 0 rgba(255, 255, 255, 0.8),
    -27px 0 0 0 rgba(255, 255, 255, 1),
    -19px -19px 0 0 rgba(255, 255, 255, 0.05);
  }
  100% {
    box-shadow:
    0 -27px 0 0 rgba(255, 255, 255, 0.05),
    19px -19px 0 0 rgba(255, 255, 255, 0.1),
    27px 0 0 0 rgba(255, 255, 255, 0.2),
    19px 19px 0 0 rgba(255, 255, 255, 0.3),
    0 27px 0 0 rgba(255, 255, 255, 0.4),
    -19px 19px 0 0 rgba(255, 255, 255, 0.6),
    -27px 0 0 0 rgba(255, 255, 255, 0.8),
    -19px -19px 0 0 rgba(255, 255, 255, 1);
  }
`;

const StyledLoadingSpinner = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  animation: ${CirclesKeyframes} 1s linear infinite;
  transform: scale(0.35);
  margin-right: 8px;
`;

const LoadingSpinner: FunctionComponent<LoadingSpinnerProps> = () => {
  return <StyledLoadingSpinner />;
};

export default LoadingSpinner;
