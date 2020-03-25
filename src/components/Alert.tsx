import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { FaTimes, FaExclamationCircle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

import { halfSpacer, baseSpacer, borderRadius, doubleSpacer } from '../styles/size';
import { brandDanger, brandSuccess, brandPrimary, white } from '../styles/color';

export type AlertProps = {
  type: 'danger' | 'success' | 'info';
  close?: () => void;
  dismissable?: boolean;
  alertNumber?: number;
  alertNumberTotal?: number;
};

const renderColor = (props: AlertProps) => {
  if (props.type === 'success') {
    return brandSuccess;
  }
  if (props.type === 'danger') {
    return brandDanger;
  }
  if (props.type === 'info') {
    return brandPrimary;
  }
  return brandDanger;
};

const renderIcon = (props: AlertProps) => {
  if (props.type === 'danger') {
    return <FaExclamationCircle />;
  }
  if (props.type === 'success') {
    return <FaCheckCircle />;
  }
  if (props.type === 'info') {
    return <FaInfoCircle />;
  }
  return <FaInfoCircle />;
};

const AlertWrapper = styled.div`
  background-color: ${(props: AlertProps) => props.type && renderColor(props)};
  padding: ${baseSpacer} ${doubleSpacer} ${baseSpacer} ${baseSpacer};
  color: ${white};
  margin-bottom: ${baseSpacer};
  border-radius: ${borderRadius};
  text-align: center;
  position: relative;
  & > p {
    margin-bottom: 0;
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: ${halfSpacer};
  right: ${halfSpacer};
  opacity: 0.65;
  cursor: pointer;
  color: ${white};
  &:hover {
    opacity: 1;
  }
`;

const Alert: FunctionComponent<AlertProps> = (props) => (
  <AlertWrapper type={props.type}>
    {renderIcon(props)} {props.children}
    {props.alertNumber && !!props.alertNumberTotal && props.alertNumberTotal > 1 && (
      <small>
        <em>
          {' '}
          (Message {props.alertNumber} of {props.alertNumberTotal})
        </em>
      </small>
    )}
    {props.dismissable && (
      <CloseButton onClick={props.close}>
        <FaTimes />
      </CloseButton>
    )}
  </AlertWrapper>
);

export default Alert;
