import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import Modal from 'react-modal';
import '@fontsource/lato';
import { Helmet } from 'react-helmet-async';

import Footer from './Footer';
import Navbar from './Navbar';

import { baseSpacer, doubleSpacer, breakpoints } from '../styles/size';
import { offWhite } from '../styles/color';
import GlobalAlerts from './GlobalAlerts';
import GlobalBanners from './GlobalBanners';
import PageContainer from './PageContainer';
import ErrorBoundary from './ErrorBoundary';
import CssReset from '../styles/cssReset';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
`;

const PageBody = styled.div`
  background-color: ${offWhite};
  flex: 1;
  padding: ${baseSpacer} 0;
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding: ${doubleSpacer} 0;
  }
`;

type LayoutProps = { element: any; props: any };

Modal.setAppElement('#___gatsby');

const Layout: FunctionComponent<LayoutProps> = ({ element, props }) => {
  const siteUrl = `https://realtyoffer.com${props.location.pathname || '/'}${
    props.location.search
  }${props.location.hash}`;
  return (
    <>
      <Helmet
        link={[
          {
            rel: 'canonical',
            key: siteUrl,
            href: siteUrl,
          },
        ]}
      />
      <CssReset />
      <IconContext.Provider value={{ style: { fontSize: '.85em' } }}>
        <GlobalAlerts />
        <LayoutWrapper>
          <Navbar />
          <PageBody>
            <PageContainer>
              <GlobalBanners />
            </PageContainer>
            <ErrorBoundary>{element}</ErrorBoundary>
          </PageBody>
          <Footer />
        </LayoutWrapper>
      </IconContext.Provider>
    </>
  );
};

export default Layout;
