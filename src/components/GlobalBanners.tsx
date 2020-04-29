import React, { useEffect, FunctionComponent } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Alert from './Alert';
import { closeBanner } from '../redux/ducks/globalAlerts';
import { RootState } from '../redux/ducks';
import { AlertType } from '../redux/ducks/globalAlerts.d';
import { baseSpacer } from '../styles/size';

type GlobalBannersProps = {};

const GlobalBannersWrapper = styled.div`
  margin-top: -${baseSpacer};
`;

const GlobalBanners: FunctionComponent<GlobalBannersProps> = () => {
  const banners = useSelector((state: RootState) => state.globalAlerts.banners);
  const currentBanner = useSelector((state: RootState) => state.globalAlerts.currentBanner);
  const dispatch = useDispatch();

  const dismissAlert = (item: AlertType) => {
    if (item) {
      setTimeout(() => {
        dispatch(closeBanner(item));
      }, 500);
    }
  };

  useEffect(() => {
    if (currentBanner && !currentBanner.dismissable) {
      setTimeout(() => {
        dismissAlert(currentBanner);
      }, 5000);
    }
  }, [banners, currentBanner]);

  return (
    <GlobalBannersWrapper>
      {currentBanner && currentBanner.id && (
        <Alert
          key={currentBanner.id}
          type={currentBanner.type}
          close={() => dismissAlert(currentBanner)}
          dismissable={currentBanner.dismissable}
          alertNumber={1}
          alertNumberTotal={banners.length}
          callToActionLink={currentBanner.callToActionLink}
          message={currentBanner.message || 'An error occurred. Please try again.'}
        />
      )}
    </GlobalBannersWrapper>
  );
};

export default GlobalBanners;
