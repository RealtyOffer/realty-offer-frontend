import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import Modal from 'react-modal';
import 'typeface-lato';

import Footer from './Footer';
import Navbar from './Navbar';

import { baseSpacer, doubleSpacer, breakpoints } from '../styles/size';
import { offWhite } from '../styles/color';
import GlobalAlerts from './GlobalAlerts';
import GlobalBanners from './GlobalBanners';
import PageContainer from './PageContainer';
import CssReset from '../styles/cssReset';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const PageBody = styled.div`
  background-color: ${offWhite};
  flex: 1;
  padding: ${baseSpacer} 0;
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding: ${doubleSpacer} 0;
  }
`;

type LayoutProps = { element: any };

Modal.setAppElement('#___gatsby');

const Layout: FunctionComponent<LayoutProps> = ({ element }) => (
  <>
    <CssReset />
    <IconContext.Provider value={{ style: { position: 'relative' } }}>
      <LayoutWrapper>
        <Navbar />
        <PageBody>
          <PageContainer>
            <GlobalBanners />
          </PageContainer>
          {element}
        </PageBody>
        <GlobalAlerts />
        <Footer />
      </LayoutWrapper>
    </IconContext.Provider>
  </>
);

export default Layout;
