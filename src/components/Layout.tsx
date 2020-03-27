import React, { FunctionComponent } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { withPrefix } from 'gatsby';
import styled from 'styled-components';
import { IconContext } from 'react-icons';

import Footer from './Footer';
import Navbar from './Navbar';
import PageContainer from './PageContainer';

import useSiteMetadata from './SiteMetadata';
import CssReset from '../styles/cssReset';

import { baseSpacer, doubleSpacer, breakpoints } from '../styles/size';
import { offWhite } from '../styles/color';
import GlobalAlerts from './GlobalAlerts';

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

type LayoutProps = {};

const helmetContext = {};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={description} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${withPrefix('/')}img/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix('/')}img/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix('/')}img/favicon-16x16.png`}
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />
          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content={`${withPrefix('/')}img/og-image.jpg`} />
        </Helmet>
        <CssReset />
        <IconContext.Provider value={{ style: { position: 'relative', top: '.125em' } }}>
          <LayoutWrapper>
            <Navbar />
            <PageBody>
              <PageContainer>{children}</PageContainer>
            </PageBody>
            <GlobalAlerts />
            <Footer />
          </LayoutWrapper>
        </IconContext.Provider>
      </HelmetProvider>
    </div>
  );
};

export default Layout;
