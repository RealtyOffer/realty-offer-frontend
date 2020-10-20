import React, { useState, useEffect, FunctionComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Alert from './Alert';
import { closeAlert } from '../redux/ducks/globalAlerts';
import { RootState } from '../redux/ducks';
import usePrevious from '../utils/usePrevious';

const AnimateInKeyframes = keyframes`
  0% {
    transform: translateY(200%);
  }
  100% {
    transform: translateY(0);
  }
`;

const AnimateOutKeyframes = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(200%);
  }
`;

type StyleProps = {
  entering: boolean;
  exiting: boolean;
};

const GlobalAlertWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 2222;
  ${(props: StyleProps) =>
    props.entering &&
    css`
      animation: ${AnimateInKeyframes} 0.5s ease-in-out 1;
    `}
  ${(props: StyleProps) =>
    props.exiting &&
    css`
      animation: ${AnimateOutKeyframes} 0.5s ease-in-out 1;
    `}
  & > div {
    margin-bottom: 0;
    border-radius: 0;
  }
`;

const GlobalAlerts: FunctionComponent<{}> = () => {
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const alerts = useSelector((state: RootState) => state.globalAlerts.alerts);
  const currentAlert = useSelector((state: RootState) => state.globalAlerts.currentAlert);
  const dispatch = useDispatch();

  const dismissAlert = () => {
    if (currentAlert) {
      setAnimateIn(false);
      setAnimateOut(true);
      setTimeout(() => {
        dispatch(closeAlert(currentAlert));
      }, 500);
    }
  };

  const prevAlerts = usePrevious(alerts);
  useEffect(() => {
    if (!prevAlerts && alerts) {
      setAnimateIn(true);
      setAnimateOut(false);
    }
    if (currentAlert && !currentAlert.dismissable) {
      setTimeout(() => {
        dismissAlert();
      }, 5000);
    }
  }, [alerts, currentAlert]);

  return (
    <GlobalAlertWrapper entering={animateIn} exiting={animateOut}>
      {currentAlert && currentAlert.id && (
        <Alert
          key={currentAlert.id}
          type={currentAlert.type}
          close={() => dismissAlert()}
          dismissable
          alertNumber={1}
          alertNumberTotal={alerts.length}
          message={currentAlert.message || 'An error occurred. Please try again.'}
        />
      )}
    </GlobalAlertWrapper>
  );
};

export default GlobalAlerts;
