import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { FaBars } from 'react-icons/fa';

import PageContainer from './PageContainer';
import FlexContainer from './FlexContainer';
import Button from './Button';

import { brandPrimary, white } from '../styles/color';
import { baseSpacer, doubleSpacer } from '../styles/size';
import { logout } from '../redux/ducks/auth';

import logo from '../images/logo.svg';

type NavbarProps = {
  auth: any;
  actions: {
    logout: Function;
  }
}
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
  text-transform: uppercase;

  &:last-child {
    padding-left: ${baseSpacer};
  }

  &:hover, &:focus {
    color: ${white};
  }
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
              {' '}
              Realty Offer
            </StyledNavbarLink>
            <div>
              {/* TODO: mobile navigation menu
              <div
                data-target="navMenu"
                tabIndex={0}
                onClick={() => this.toggleHamburger()}
                onKeyDown={() => this.toggleHamburger()}
                role="menu"
              >
                <FaBars />
              </div>
              */}
              <div id="navMenu">
                <div>
                  <Button type="link" to="/">
                    Home
                  </Button>
                  <Button type="link" to="/blog">
                    Blog
                  </Button>
                  {
                    this.props.auth.isLoggedIn ? (
                      <Button
                        type="button"
                        onClick={() => this.props.actions.logout()}
                        color="primary"
                      >
                        Log Out
                      </Button>
                    ) : (
                      <Button
                        type="link"
                        to="/login"
                      >
                        Log In
                      </Button>
                    )
                  }
                </div>
              </div>
            </div>
          </FlexContainer>
        </PageContainer>
      </StyledNavbar>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  (dispatch) => ({
    actions: bindActionCreators({ logout }, dispatch),
  }),
)(Navbar);
