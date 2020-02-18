import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { PageContainer, FlexContainer} from './';

import { brandPrimary, white } from '../styles/color';
import { baseSpacer, doubleSpacer } from '../styles/size';

// import github from '../img/github-icon.svg'
import logo from '../images/logo.svg';

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
          <FlexContainer justifyContent="space-between">
            <StyledNavbarLink to="/" title="Logo">
              <img src={logo} alt="Realty Offer" height={doubleSpacer} />
            </StyledNavbarLink>
            <div>
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
            </div>
          </FlexContainer>
        </PageContainer>
      </StyledNavbar>
    );
  }
};

export default Navbar;
