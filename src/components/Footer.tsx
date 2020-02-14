import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import PageContainer from './PageContainer';

import { brandTertiary, white } from '../styles/color';
import { baseSpacer } from '../styles/size';

// import logo from '../img/logo.svg'
// import facebook from '../img/social/facebook.svg'
// import instagram from '../img/social/instagram.svg'
// import twitter from '../img/social/twitter.svg'
// import vimeo from '../img/social/vimeo.svg'

const StyledFooter = styled.footer`
  background-color: ${brandTertiary};
  color: ${white};
  padding: ${baseSpacer};
`;

const StyledFooterLink = styled(Link)`
  color: ${white};
`;

const Footer = () => (
  <StyledFooter>
    <PageContainer>
      <StyledFooterLink to="/">Home</StyledFooterLink>
    </PageContainer>
  </StyledFooter>
);

export default Footer;
