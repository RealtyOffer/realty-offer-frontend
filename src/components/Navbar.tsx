import React, { useState, FunctionComponent } from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FaCaretDown, FaBell, FaRegBell } from 'react-icons/fa';
import { Spin as Hamburger } from 'hamburger-react';

import PageContainer from './PageContainer';
import FlexContainer from './FlexContainer';
import Avatar from './Avatar';
import HorizontalRule from './HorizontalRule';
import ClientOnly from './ClientOnly';

import {
  brandPrimary,
  white,
  offWhite,
  brandPrimaryHover,
  brandTertiary,
  brandDanger,
} from '../styles/color';
import {
  baseSpacer,
  doubleSpacer,
  baseAndAHalfSpacer,
  quadrupleSpacer,
  halfSpacer,
  screenSizes,
  tripleSpacer,
  threeQuarterSpacer,
} from '../styles/size';
import { z1Shadow, z4Shadow, baseBorderStyle } from '../styles/mixins';
import { fontSizeH6 } from '../styles/typography';
import { logout } from '../redux/ducks/auth';
import { RootState } from '../redux/ducks';
import logo from '../images/logo.svg';
import useWindowSize from '../utils/useWindowSize';
import { agentNavigationItems } from '../utils/agentNavigationItems';
// TODO for PROD import unauthenticatedNavigationItems from '../utils/unauthenticatedNavigationItems';

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
  width: 250px;

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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${baseSpacer};

  &:hover ${StyledDropdown}, &:focus ${StyledDropdown} {
    display: block;
    z-index: 1;
  }

  &:last-of-type {
    border-left: 1px solid ${white};
    padding-right: 0;
  }
`;

const StyledMenuToggle = styled.div`
  cursor: pointer;
  font-size: ${fontSizeH6};
  width: ${tripleSpacer};
  height: ${tripleSpacer};
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
  height: 100%;

  & > a {
    padding: 0 ${halfSpacer};
    margin: 0 ${halfSpacer};
    height: 100%;
    line-height: ${quadrupleSpacer};
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
          bottom: 0;
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
      right: ${props.menuIsOpen ? 0 : '-75%'};
      width: 75%;
      z-index: 10;
      transition: left 200ms linear;
      ${props.menuIsOpen && `box-shadow: ${z4Shadow}`};

      & > a {
        padding: ${baseSpacer} 0;
        line-height: ${baseSpacer};
        margin: 0;
        height: auto;
      }
    `}
`;

const NotificationDot = styled.div`
  position: absolute;
  width: ${threeQuarterSpacer};
  height: ${threeQuarterSpacer};
  border-radius: ${threeQuarterSpacer};
  background-color: ${brandDanger};
  top: 0;
  /* not actually aligning left, but size of parent (which is pos: relative) above is different */
  ${(props: { isSmallScreen: boolean }) =>
    props.isSmallScreen ? `left: ${baseSpacer};` : `right: ${baseSpacer};`}
`;

const Navbar: FunctionComponent<NavbarProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const agent = useSelector((state: RootState) => state.agent);
  const user = useSelector((state: RootState) => state.user);
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

  const isLoggedInAgent = auth.isLoggedIn && agent.hasCompletedSignup;
  const isLoggedInConsumer = auth.isLoggedIn && auth.roles.includes('Consumer');

  const menuItemsToRender = isLoggedInAgent ? [...primaryNavigation] : [];
  // TODO for PROD : [...unauthenticatedNavigationItems];

  return (
    <StyledNavbar role="navigation" aria-label="main-navigation">
      <PageContainer>
        <FlexContainer justifyContent="space-between" height={quadrupleSpacer}>
          {/* TODO for PROD: update link to / */}
          <StyledLogoLink to="/landing" title="Logo">
            <img src={logo} alt="Realty Offer" height={doubleSpacer} /> RealtyOffer
          </StyledLogoLink>
          {/* TODO for PROD */}
          {!isLoggedInConsumer && isSmallScreen && process.env.GATSBY_ENVIRONMENT === 'DEVELOP' && (
            <ClientOnly>
              <FlexContainer>
                <div style={{ position: 'relative', marginRight: halfSpacer }}>
                  <Link to="/agent/notifications">
                    <FaRegBell size={doubleSpacer} color={white} />
                    <NotificationDot isSmallScreen />
                  </Link>
                </div>
                <StyledMenuToggle>
                  <Hamburger
                    color={white}
                    toggled={menuIsOpen}
                    toggle={() => setMenuIsOpen(!menuIsOpen)}
                  />
                </StyledMenuToggle>
              </FlexContainer>
            </ClientOnly>
          )}
          <ClientOnly>
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
              {isSmallScreen && isLoggedInAgent && (
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
            </StyledMenu>
            {!isSmallScreen && isLoggedInAgent && (
              <FlexContainer>
                <StyledDropdownWrapper>
                  <FaBell size={baseAndAHalfSpacer} />
                  <NotificationDot isSmallScreen={false} />
                  <StyledDropdown>
                    <Link to="/">Notification text goes here</Link>
                    <Link to="/">Notification text goes here</Link>
                    <Link to="/">Notification text goes here</Link>
                  </StyledDropdown>
                </StyledDropdownWrapper>
                <StyledDropdownWrapper>
                  <Avatar src={user.avatar} />
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
              </FlexContainer>
            )}
            {/* TODO for PROD */}
            {!auth.isLoggedIn && process.env.GATSBY_ENVIRONMENT === 'DEVELOP' && (
              <Link to="/login" activeClassName="active" onClick={() => toggleMenu()}>
                Log In
              </Link>
            )}

            {isLoggedInConsumer && (
              <Link to="/" onClick={() => dispatch(logout())} style={{ color: white }}>
                Log Out
              </Link>
            )}
          </ClientOnly>
        </FlexContainer>
      </PageContainer>
    </StyledNavbar>
  );
};

export default Navbar;
