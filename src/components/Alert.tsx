import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import {
  FaTimes,
  FaExclamationCircle,
  FaCheckCircle,
  FaInfoCircle,
  FaLongArrowAltRight,
} from 'react-icons/fa';

import { halfSpacer, baseSpacer, borderRadius, doubleSpacer } from '../styles/size';
import { brandDanger, brandSuccess, white, brandTertiary } from '../styles/color';
import { AlertType } from '../redux/ducks/globalAlerts.d';

export type AlertProps = {
  close?: () => void;
  alertNumber?: number;
  alertNumberTotal?: number;
} & AlertType;

const renderColor = (type: AlertType['type']) => {
  if (type === 'success') {
    return brandSuccess;
  }
  if (type === 'danger') {
    return brandDanger;
  }
  if (type === 'info') {
    return brandTertiary;
  }
  return brandDanger;
};

const renderIcon = (type: AlertType['type']) => {
  if (type === 'danger') {
    return <FaExclamationCircle />;
  }
  if (type === 'success') {
    return <FaCheckCircle />;
  }
  if (type === 'info') {
    return <FaInfoCircle />;
  }
  return <FaInfoCircle />;
};

const AlertWrapper = styled.div`
  background-color: ${(props: { type: AlertType['type'] }) =>
    props.type && renderColor(props.type)};
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

const StyledLink = styled(Link)`
  color: ${white};
  margin-left: ${halfSpacer};
  border-bottom: 1px solid ${white};
  &:hover,
  &:focus {
    color: ${white};
  }
`;

const Alert: FunctionComponent<AlertProps> = (props) => (
  <AlertWrapper type={props.type}>
    {renderIcon(props.type)} {props.message}{' '}
    {props.callToActionLink && (
      <StyledLink to={props.callToActionLink}>
        {props.callToActionLinkText} <FaLongArrowAltRight />
      </StyledLink>
    )}
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
