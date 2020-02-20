import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import styled from 'styled-components';

import Footer from './Footer';
import Navbar from './Navbar';
import PageContainer from './PageContainer';

import useSiteMetadata from './SiteMetadata';
import CssReset from '../styles/cssReset';

import { baseSpacer, doubleSpacer, breakpoints } from '../styles/size';
import { lightestGray } from '../styles/color';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
`;

const PageBody = styled.div`
  background-color: ${lightestGray};
  flex: 1;
  padding: ${baseSpacer} 0;
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding: ${doubleSpacer} 0;
  }
`;

type LayoutProps = {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
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
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <CssReset />
      <LayoutWrapper>
        <Navbar />
        <PageBody>
          <PageContainer>
            {children}
          </PageContainer>
        </PageBody>
        <Footer />
      </LayoutWrapper>
    </div>
  );
};

export default Layout;
