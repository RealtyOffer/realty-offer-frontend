import React, { useState, FunctionComponent, useRef, useEffect } from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FaBell, FaRegBell, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Spin as Hamburger } from 'hamburger-react';
import ReactTooltip from 'react-tooltip';

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
import { fontSizeH4, fontSizeH6 } from '../styles/typography';
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

  & .tooltip {
    padding: 0 ${halfSpacer};
  }
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
  width: 250px;
  z-index: 1;

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
  padding: ${halfSpacer};
  border-radius: ${tripleSpacer};
  height: ${tripleSpacer};
  width: ${tripleSpacer};
  background-color: transparent;
  transition: background 0.1s ease-out;

  &:hover {
    background: ${brandPrimaryHover};
  }

  /* &:hover ${StyledDropdown}, &:focus ${StyledDropdown} {
    display: block;
    z-index: 1;
  } */

  &:last-of-type {
    margin-right: -${halfSpacer};
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
      left: ${props.menuIsOpen ? 0 : '-75%'};
      width: 75%;
      z-index: 10;
      transition: left 200ms linear;
      ${props.menuIsOpen && `box-shadow: ${z4Shadow}`};

      & > a {
        padding: ${baseSpacer} 0;
        line-height: ${baseSpacer};
        margin: 0;
        height: auto;
        font-size: ${fontSizeH4};
      }
    `}
`;

const NotificationDot = styled.div`
  position: absolute;
  width: ${threeQuarterSpacer};
  height: ${threeQuarterSpacer};
  border-radius: ${threeQuarterSpacer};
  background-color: ${brandDanger};
  top: ${(props: { isSmallScreen: boolean }) => (props.isSmallScreen ? 0 : threeQuarterSpacer)};
  /* not actually aligning left, but size of parent (which is pos: relative) above is different */
  ${(props: { isSmallScreen: boolean }) =>
    props.isSmallScreen ? `left: ${baseSpacer};` : `right: ${threeQuarterSpacer};`}
`;

const Navbar: FunctionComponent<NavbarProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const agent = useSelector((state: RootState) => state.agent);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);
  const notificationsNode = useRef<HTMLDivElement>(null);
  const profileNode = useRef<HTMLDivElement>(null);
  const size = useWindowSize();
  const isSmallScreen = Boolean(size && size.width && size.width < screenSizes.medium);
  const primaryNavigation = agentNavigationItems.filter((item) => item.primary);
  const secondaryNavigation = agentNavigationItems.filter((item) => !item.primary);

  const toggleMenu = () => {
    if (isSmallScreen) {
      setSubMenuIsOpen(false);
      setMenuIsOpen(false);
    }
  };

  const toggleSubMenu = () => setSubMenuIsOpen(!subMenuIsOpen);

  const handleNotificationsDropownClick = (e: MouseEvent) => {
    if (
      notificationsNode &&
      notificationsNode.current &&
      notificationsNode.current.contains(e.target as Node)
    ) {
      return; // inside click
    }
    setNotificationsDropdownOpen(false); // outside click, close the menu
  };

  const handleProfileDropownClick = (e: MouseEvent) => {
    if (profileNode && profileNode.current && profileNode.current.contains(e.target as Node)) {
      return; // inside click
    }
    setProfileDropdownOpen(false); // outside click, close the menu
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleNotificationsDropownClick);
    document.addEventListener('mousedown', handleProfileDropownClick);

    return () => {
      document.removeEventListener('mousedown', handleNotificationsDropownClick);
      document.removeEventListener('mousedown', handleProfileDropownClick);
    };
  }, []);

  const isLoggedInAgent = auth.isLoggedIn && agent.hasCompletedSignup;
  const isLoggedInConsumer = auth.isLoggedIn && auth.roles.includes('Consumer');
  const shouldShowMenuToggle =
    isLoggedInAgent && isSmallScreen && process.env.GATSBY_ENVIRONMENT === 'DEVELOP';

  const menuItemsToRender = isLoggedInAgent ? [...primaryNavigation] : [];
  // TODO for PROD : [...unauthenticatedNavigationItems];

  return (
    <StyledNavbar role="navigation" aria-label="main-navigation">
      <PageContainer>
        <FlexContainer justifyContent="space-between" height={quadrupleSpacer}>
          {shouldShowMenuToggle && (
            <StyledMenuToggle>
              <Hamburger
                color={white}
                toggled={menuIsOpen}
                toggle={() => setMenuIsOpen(!menuIsOpen)}
              />
            </StyledMenuToggle>
          )}
          {/* TODO for PROD: update link to / */}
          <StyledLogoLink
            to={
              // eslint-disable-next-line no-nested-ternary
              isLoggedInAgent
                ? '/agent/listings/new'
                : isLoggedInConsumer
                ? '/consumer/listing'
                : '/landing'
            }
            title="Logo"
          >
            <img src={logo} alt="Realty Offer" height={doubleSpacer} /> RealtyOffer
          </StyledLogoLink>
          {/* TODO for PROD */}
          {shouldShowMenuToggle && (
            <ClientOnly>
              <FlexContainer>
                <div style={{ position: 'relative', marginRight: halfSpacer }}>
                  <Link to="/agent/notifications">
                    <FaRegBell size={doubleSpacer} color={white} />
                    <NotificationDot isSmallScreen />
                  </Link>
                </div>
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
                  <Link to="/" onClick={() => toggleSubMenu()}>
                    Account {subMenuIsOpen ? <FaCaretUp /> : <FaCaretDown />}
                  </Link>
                  {subMenuIsOpen &&
                    secondaryNavigation.map((navItem) => (
                      <Link key={navItem.name} to={navItem.path} onClick={() => toggleMenu()}>
                        {navItem.name}
                      </Link>
                    ))}
                  <HorizontalRule />
                  {auth.roles.includes('Admin') && (
                    <>
                      <Link to="/admin/banners" onClick={() => toggleMenu()}>
                        Admin
                      </Link>
                      <HorizontalRule />
                    </>
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
                <StyledDropdownWrapper
                  onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}
                  data-tip="Notifications"
                  data-for="notifications"
                  ref={notificationsNode}
                >
                  <FaBell size={baseAndAHalfSpacer} />
                  <NotificationDot isSmallScreen={false} />
                  {notificationsDropdownOpen && (
                    <StyledDropdown>
                      <Link to="/">Notification text goes here</Link>
                      <Link to="/">Notification text goes here</Link>
                      <Link to="/">Notification text goes here</Link>
                    </StyledDropdown>
                  )}
                </StyledDropdownWrapper>
                <ReactTooltip
                  id="notifications"
                  place="bottom"
                  type="dark"
                  effect="solid"
                  className="tooltip"
                  disable={notificationsDropdownOpen}
                  delayShow={500}
                  offset={{ top: 16 }}
                />
                <StyledDropdownWrapper
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  data-tip="Profile & Settings"
                  data-for="profile"
                  ref={profileNode}
                >
                  <Avatar src={user.avatar} />
                  {profileDropdownOpen && (
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
                  )}
                </StyledDropdownWrapper>
                <ReactTooltip
                  id="profile"
                  place="bottom"
                  type="dark"
                  effect="solid"
                  className="tooltip"
                  disable={profileDropdownOpen}
                  delayShow={500}
                  offset={{ top: 16 }}
                />
              </FlexContainer>
            )}
            {/* TODO for PROD */}
            {!auth.isLoggedIn && process.env.GATSBY_ENVIRONMENT === 'DEVELOP' && (
              <Link
                to="/login"
                activeClassName="active"
                onClick={() => toggleMenu()}
                style={{ color: white }}
              >
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
