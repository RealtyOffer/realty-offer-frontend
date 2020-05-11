import React, { useState, FunctionComponent } from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FaCaretDown } from 'react-icons/fa';
import { Spin as Hamburger } from 'hamburger-react';

import PageContainer from './PageContainer';
import FlexContainer from './FlexContainer';
import Avatar from './Avatar';
import HorizontalRule from './HorizontalRule';

import { brandPrimary, white, offWhite, brandPrimaryHover, brandTertiary } from '../styles/color';
import {
  baseSpacer,
  doubleSpacer,
  quadrupleSpacer,
  octupleSpacer,
  halfSpacer,
  screenSizes,
} from '../styles/size';
import { z1Shadow, z4Shadow, baseBorderStyle } from '../styles/mixins';
import { fontSizeH6 } from '../styles/typography';
import { logout } from '../redux/ducks/auth';
import { RootState } from '../redux/ducks';
import logo from '../images/logo.svg';
import useWindowSize from '../utils/useWindowSize';
import { agentNavigationItems } from '../utils/agentNavigationItems';
import unauthenticatedNavigationItems from '../utils/unauthenticatedNavigationItems';

type NavbarProps = {};

const StyledNavbar = styled.nav`
  background: ${brandPrimary};
  color: ${white};
  position: relative;
  height: ${quadrupleSpacer};
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
  cursor: pointer;
  font-size: ${fontSizeH6};
`;

type StyledMenuProps = {
  isSmallScreen: boolean;
  menuIsOpen: boolean;
  isLoggedIn: boolean;
};

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;

  & > a {
    padding: 0 ${halfSpacer};
  }

  & > a,
  & > a:hover,
  & > a:focus {
    color: ${white};
    display: inline-block;
  }

  ${(props: StyledMenuProps) =>
    !props.isSmallScreen &&
    css`
      & > a.active,
      & > a.active:hover,
      & > a.active:focus {
        position: relative;
        &:before {
          content: '';
          border-bottom: ${halfSpacer} solid ${white};
          position: absolute;
          top: 37px;
          left: 0;
          right: 0;
        }
      }
    `}

  ${(props: StyledMenuProps) =>
    !props.isLoggedIn &&
    css`
      justify-content: space-evenly;
    `}

  ${(props: StyledMenuProps) =>
    props.isSmallScreen &&
    css`
      flex-direction: column;
      justify-content: flex-start;
      align-items: normal;
      background-color: ${brandTertiary};
      padding: 0 ${baseSpacer};
      height: 100vh;
      position: absolute;
      top: ${quadrupleSpacer};
      left: ${props.menuIsOpen ? 0 : '-75%'};
      width: 75%;
      z-index: 10;
      transition: left 200ms linear;
      ${props.menuIsOpen && `box-shadow: ${z4Shadow}`};

      & > a {
        padding: ${baseSpacer} 0;
      }
    `}
`;

const Navbar: FunctionComponent<NavbarProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const size = useWindowSize();
  const isSmallScreen = Boolean(size && size.width && size.width < screenSizes.medium);
  const primaryNavigation = agentNavigationItems.filter((item) => item.primary);
  const secondaryNavigation = agentNavigationItems.filter((item) => !item.primary);

  const toggleMenu = () => {
    if (isSmallScreen) {
      setMenuIsOpen(false);
    }
  };

  const menuItemsToRender = auth.isLoggedIn ? [...primaryNavigation] : [];

  return (
    <StyledNavbar role="navigation" aria-label="main-navigation">
      <PageContainer>
        <FlexContainer
          justifyContent={!isSmallScreen ? 'space-between' : 'start'}
          height={quadrupleSpacer}
        >
          {isSmallScreen && (
            <StyledMenuToggle>
              <Hamburger
                color={white}
                toggled={menuIsOpen}
                toggle={() => setMenuIsOpen(!menuIsOpen)}
              />
            </StyledMenuToggle>
          )}

          <StyledLogoLink to="/" title="Logo">
            <img src={logo} alt="Realty Offer" height={doubleSpacer} /> Realty Offer
          </StyledLogoLink>

          <StyledMenu
            id="navMenu"
            isLoggedIn={auth.isLoggedIn}
            isSmallScreen={isSmallScreen}
            menuIsOpen={menuIsOpen}
          >
            {menuItemsToRender.map((navItem) => (
              <Link
                key={navItem.name}
                to={navItem.path}
                activeClassName="active"
                onClick={() => toggleMenu()}
              >
                {navItem.name}
              </Link>
            ))}
            {isSmallScreen && auth.isLoggedIn && (
              <>
                <HorizontalRule />
                {secondaryNavigation.map((navItem) => (
                  <Link key={navItem.name} to={navItem.path} onClick={() => toggleMenu()}>
                    {navItem.name}
                  </Link>
                ))}
                {auth.roles.includes('Admin') && (
                  <Link to="/admin/banners" onClick={() => toggleMenu()}>
                    Admin
                  </Link>
                )}
                <Link
                  to="/"
                  onClick={() => {
                    toggleMenu();
                    dispatch(logout());
                  }}
                >
                  Log Out
                </Link>
              </>
            )}
            {!isSmallScreen && auth.isLoggedIn && (
              <StyledDropdownWrapper>
                <Avatar />
                <FaCaretDown />
                <StyledDropdown>
                  {secondaryNavigation.map((navItem) => (
                    <Link key={navItem.name} to={navItem.path}>
                      {navItem.name}
                    </Link>
                  ))}
                  {auth.roles.includes('Admin') && (
                    <Link to="/admin/banners" onClick={() => toggleMenu()}>
                      Admin
                    </Link>
                  )}
                  <Link to="/" onClick={() => dispatch(logout())}>
                    Log Out
                  </Link>
                </StyledDropdown>
              </StyledDropdownWrapper>
            )}
            {!auth.isLoggedIn && (
              <Link to="/login" activeClassName="active" onClick={() => toggleMenu()}>
                Log In
              </Link>
            )}
          </StyledMenu>
        </FlexContainer>
      </PageContainer>
    </StyledNavbar>
  );
};

export default Navbar;
