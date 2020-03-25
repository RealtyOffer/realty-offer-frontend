import React, { useState, FunctionComponent } from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FaCaretDown } from 'react-icons/fa';
import { Spin as Hamburger } from 'hamburger-react';

import PageContainer from './PageContainer';
import FlexContainer from './FlexContainer';
import Avatar from './Avatar';
import HorizontalRule from './HorizontalRule';
import Button from './Button';

import { brandPrimary, white, offWhite, brandPrimaryHover } from '../styles/color';
import { baseSpacer, doubleSpacer, octupleSpacer, halfSpacer, screenSizes } from '../styles/size';
import { z1Shadow, baseBorderStyle } from '../styles/mixins';
import { fontSizeH6 } from '../styles/typography';
import { logout } from '../redux/ducks/auth';
import logo from '../images/logo.svg';
import useWindowSize from '../utils/useWindowSize';
import agentNavigationItems from '../utils/agentNavigationItems';

type NavbarProps = {
  auth: any;
  actions: {
    logout: Function;
  };
};

const StyledNavbar = styled.nav`
  background: ${brandPrimary};
  padding: ${baseSpacer} 0;
  color: ${white};
  position: relative;
`;

const StyledLogoLink = styled(Link)`
  color: ${white};

  &:hover,
  &:focus {
    color: ${white};
  }
`;

const StyledDropdown = styled.div`
  position: absolute;
  background-color: ${white};
  border: ${baseBorderStyle};
  box-shadow: ${z1Shadow};
  right: 0;
  top: 100%;
  display: none;
  width: ${octupleSpacer};

  & > a {
    color: ${brandPrimary};
    padding: ${halfSpacer} ${baseSpacer};
    display: block;
    border-bottom: ${baseBorderStyle};
  }

  & > a:hover,
  & > a:focus {
    color: ${brandPrimaryHover};
    background-color: ${offWhite};
  }
`;

const StyledDropdownWrapper = styled.div`
  position: relative;
  cursor: pointer;
  padding-left: ${halfSpacer};
  border-left: 1px solid ${white};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover ${StyledDropdown}, &:focus ${StyledDropdown} {
    display: block;
    z-index: 1;
  }
`;

const StyledMenuToggle = styled.div`
  position: absolute;
  left: ${baseSpacer};
  cursor: pointer;
  font-size: ${fontSizeH6};
`;

const StyledMenu = styled.div`
  display: flex;
  align-items: center;

  & > a {
    padding: 0 ${halfSpacer};
  }

  & > a,
  & > a:hover,
  & > a:focus {
    color: ${white};
    display: inline-block;
  }

  ${(props: { isSmallScreen: boolean; menuIsOpen: boolean }) =>
    props.isSmallScreen &&
    css`
      flex-direction: column;
      align-items: normal;
      background-color: ${brandPrimary};
      padding: 0 ${baseSpacer};
      height: 100vh;
      position: absolute;
      top: 64px;
      left: ${props.menuIsOpen ? 0 : '-75%'};
      width: 75%;
      z-index: 10;
      transition: left 200ms linear;

      & > a {
        padding: ${halfSpacer} 0;
      }
    `}
`;

const Navbar: FunctionComponent<NavbarProps> = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const size = useWindowSize();
  const isSmallScreen = Boolean(size && size.width && size.width < screenSizes.small);
  const primaryNavigation = agentNavigationItems.filter((item) => item.primary);
  const secondaryNavigation = agentNavigationItems.filter((item) => !item.primary);

  const toggleMenuAndLogout = () => {
    if (isSmallScreen) {
      setMenuIsOpen(false);
    }
  };

  return (
    <StyledNavbar role="navigation" aria-label="main-navigation">
      <PageContainer>
        <FlexContainer
          justifyContent={props.auth.isLoggedIn && isSmallScreen ? 'center' : 'space-between'}
        >
          <StyledLogoLink to="/" title="Logo">
            <img src={logo} alt="Realty Offer" height={doubleSpacer} /> Realty Offer
          </StyledLogoLink>
          {!props.auth.isLoggedIn && (
            <Button type="link" to="/login">
              Log In
            </Button>
          )}
          {props.auth.isLoggedIn && isSmallScreen && (
            <StyledMenuToggle>
              <Hamburger
                color={white}
                toggled={menuIsOpen}
                toggle={() => setMenuIsOpen(!menuIsOpen)}
              />
            </StyledMenuToggle>
          )}
          {props.auth.isLoggedIn && (
            <StyledMenu id="navMenu" isSmallScreen={isSmallScreen} menuIsOpen={menuIsOpen}>
              {primaryNavigation.map((navItem) => (
                <Link key={navItem.name} to={navItem.path} onClick={() => toggleMenuAndLogout()}>
                  {navItem.name}
                </Link>
              ))}
              {isSmallScreen ? (
                <>
                  <HorizontalRule />
                  {secondaryNavigation.map((navItem) => (
                    <Link
                      key={navItem.name}
                      to={navItem.path}
                      onClick={() => toggleMenuAndLogout()}
                    >
                      {navItem.name}
                    </Link>
                  ))}
                  <Link to="/" onClick={() => props.actions.logout()}>
                    Log Out
                  </Link>
                </>
              ) : (
                <StyledDropdownWrapper>
                  <Avatar />
                  <FaCaretDown />
                  <StyledDropdown>
                    {secondaryNavigation.map((navItem) => (
                      <Link key={navItem.name} to={navItem.path}>
                        {navItem.name}
                      </Link>
                    ))}
                    <Link to="/" onClick={() => props.actions.logout()}>
                      Log Out
                    </Link>
                  </StyledDropdown>
                </StyledDropdownWrapper>
              )}
            </StyledMenu>
          )}
        </FlexContainer>
      </PageContainer>
    </StyledNavbar>
  );
};

export default connect(
  (state) => ({
    auth: (state as any).auth,
  }),
  (dispatch) => ({
    actions: bindActionCreators({ logout }, dispatch),
  })
)(Navbar);
