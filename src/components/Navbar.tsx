import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import PageContainer from './PageContainer';

import { brandPrimary, white } from '../styles/color';
import { baseSpacer } from '../styles/size';

// import github from '../img/github-icon.svg'
// import logo from '../img/logo.svg'

type NavbarProps = {}
type NavbarState = {
  menuOpen: Boolean;
}

const StyledNavbar = styled.nav`
  background: ${brandPrimary};
  padding: ${baseSpacer} 0;
  color: ${white};
`;

const StyledNavbarLink = styled(Link)`
  color: ${white};
  padding-right: ${baseSpacer};
`;

class Navbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  toggleHamburger = () => {
    const { menuOpen } = this.state;
    this.setState({
      menuOpen: !menuOpen,
    });
  }

  render() {
    return (
      <StyledNavbar role="navigation" aria-label="main-navigation">
        <PageContainer>
          <StyledNavbarLink to="/" title="Logo">
            <img src="" alt="Realty Offer" />
          </StyledNavbarLink>
          <div
            data-target="navMenu"
            onClick={() => this.toggleHamburger()}
            role="menu"
          >
            {/* icon here */}
          </div>
          <div id="navMenu">
            <div>
              <StyledNavbarLink to="/">
                Home
              </StyledNavbarLink>
              <StyledNavbarLink to="/blog">
                Blog
              </StyledNavbarLink>
            </div>
          </div>
        </PageContainer>
      </StyledNavbar>
    );
  }
};

export default Navbar;
