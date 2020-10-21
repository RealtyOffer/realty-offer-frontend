import React, { useEffect, FunctionComponent } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Alert from './Alert';
import { closeAlert } from '../redux/ducks/globalAlerts';
import { RootState } from '../redux/ducks';

const GlobalAlertWrapper = styled.div`
  width: 100%;
`;

const GlobalAlerts: FunctionComponent<{}> = () => {
  const alerts = useSelector((state: RootState) => state.globalAlerts.alerts);
  const currentAlert = useSelector((state: RootState) => state.globalAlerts.currentAlert);
  const dispatch = useDispatch();

  const dismissAlert = () => {
    if (currentAlert) {
      setTimeout(() => {
        dispatch(closeAlert(currentAlert));
      }, 500);
    }
  };

  useEffect(() => {
    if (currentAlert && !currentAlert.dismissable) {
      setTimeout(() => {
        dismissAlert();
      }, 5000);
    }
  }, [alerts, currentAlert]);

  return (
    <GlobalAlertWrapper>
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
