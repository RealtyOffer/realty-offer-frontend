import React, {
  useMemo,
  useState,
  FunctionComponent,
  useRef,
  useEffect,
  SyntheticEvent,
} from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaBell,
  FaRegBell,
  FaCaretDown,
  FaCaretUp,
  FaChevronDown,
  FaChevronUp,
  FaUserLock,
  FaCreditCard,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Spin as Hamburger } from 'hamburger-react';
import ReactTooltip from 'react-tooltip';
import { useLocation } from '@reach/router';

import { PageContainer, FlexContainer, Avatar, HorizontalRule, ClientOnly, Button } from '.';

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
  tripleSpacer,
  threeQuarterSpacer,
  decupleSpacer,
  quarterSpacer,
} from '../styles/size';
import { z1Shadow, z4Shadow, baseBorderStyle } from '../styles/mixins';
import { fontSizeH4, fontSizeH6, fontSizeSmall } from '../styles/typography';
import { logout } from '../redux/ducks/auth';
import { RootState } from '../redux/ducks';
import logo from '../images/logo.svg';
import useWindowSize from '../utils/useWindowSize';
import { agentNavigationItems } from '../utils/agentNavigationItems';
import unauthenticatedNavigationItems from '../utils/unauthenticatedNavigationItems';
import trackEvent from '../utils/analytics';

type NavbarProps = {};

const ContactInfo = styled.div`
  color: ${white};
  line-height: 1.5;
  margin-right: ${baseSpacer};
  font-size: ${(props: { small?: boolean }) => (props.small ? fontSizeSmall : 'inherit')};

  & a,
  & a:hover,
  & a:focus {
    font-size: 75%;
    color: ${white};
  }
  & strong {
    display: block;
  }
`;

const StyledNavbar = styled.nav`
  background: ${brandPrimary};
  color: ${white};
  position: relative;
  height: ${quadrupleSpacer};
  z-index: 2;
  position: relative;

  & .tooltip {
    padding: 0 ${halfSpacer};
  }

  @media print {
    /* hide all links except logo when printing */
    a:not(:first-child) {
      display: none;
    }
  }
`;

const StyledLogoLink = styled(Link)`
  height: ${quadrupleSpacer};
  color: ${white};
  position: relative;
  padding-left: ${tripleSpacer};
  line-height: calc(${tripleSpacer} + 6px);
  width: calc(${decupleSpacer} + ${tripleSpacer});

  &:hover,
  &:focus {
    color: ${white};
  }
`;

const StyledLogoImg = styled.img`
  position: absolute;
  top: ${baseSpacer};
  left: 0;
`;

const StyledTagline = styled.span`
  color: ${white};
  position: absolute;
  left: ${tripleSpacer};
  right: 0;
  top: calc(${doubleSpacer} + ${quarterSpacer});
  line-height: 1;
  font-size: ${threeQuarterSpacer};
  width: ${decupleSpacer};
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
  width: auto;
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
  position: absolute;
  left: 0;
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

const SubNav = styled.div`
  background: ${white};
  position: sticky;
  top: 0;
  z-index: 3;
  box-shadow: ${z1Shadow};
`;

const SubNavLink = styled(Link)`
  color: ${brandTertiary};
  padding: ${halfSpacer} ${doubleSpacer};
  &.active,
  &.active:hover,
  &.active:focus {
    color: ${brandPrimary};
    position: relative;
    &:before {
      content: '';
      border-bottom: 2px solid ${brandPrimary};
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
`;

const Navbar: FunctionComponent<NavbarProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const agent = useSelector((state: RootState) => state.agent);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);

  const notificationsNode = useRef<HTMLDivElement>(null);
  const profileNode = useRef<HTMLDivElement>(null);

  const size = useWindowSize();

  const primaryNavigation = agentNavigationItems.filter((item) => item.primary);
  const secondaryNavigation = agentNavigationItems.filter((item) => !item.primary);

  const toggleMenu = () => {
    if (size.isSmallScreen) {
      setSubMenuIsOpen(false);
      setMenuIsOpen(false);
    }
  };

  const toggleSubMenu = (e: SyntheticEvent) => {
    e.preventDefault();
    setSubMenuIsOpen(!subMenuIsOpen);
  };

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

  const isLoggedInAgent = auth.isLoggedIn && agent.agentId !== '';
  const isLoggedInConsumer = auth.isLoggedIn && auth.roles.includes('Consumer');
  const shouldShowMenuToggle = isLoggedInAgent && size.isSmallScreen;
  // list of routes that are part of sign up process for either agent or consumer
  const signupPagesArr = [
    '/agent/sign-up',
    '/agent/agent-information',
    '/agent/verify-email',
    '/consumer/verify-email',
    '/agent/business-information',
    '/agent/payment-information',
    '/agent/confirm-registration',
    '/consumer/start',
    '/consumer/selling',
    '/consumer/buying',
    '/agent/pilot',
  ];
  const isInSignupProcess = signupPagesArr.some((route) => route === location.pathname);

  const menuItemsToRender = useMemo(() => {
    if (auth.isLoading || agent.isLoading) {
      return [];
    }
    if (isLoggedInAgent && !isInSignupProcess) {
      return primaryNavigation;
    }
    if (isLoggedInConsumer) {
      return [];
    }
    // not finished with signup process, so return nothing. "Exit" button at end of <StyledNavbar>
    if (isInSignupProcess) {
      return [];
    }
    if (!isLoggedInAgent && !isLoggedInConsumer) {
      return unauthenticatedNavigationItems;
    }
    return [];
  }, [auth, agent, isLoggedInAgent, isLoggedInConsumer, isInSignupProcess]);

  const getIcon = (icon: string) => {
    if (icon === 'user') return <FaUser />;
    if (icon === 'credit-card') return <FaCreditCard />;
    if (icon === 'bell-o') return <FaBell />;
    return null;
  };

  return (
    <>
      <StyledNavbar role="navigation" aria-label="main-navigation">
        <ClientOnly>
          <PageContainer>
            <FlexContainer
              justifyContent={
                (auth.isLoggedIn && auth.roles.includes('Consumer')) ||
                (!size.isSmallScreen && auth.isLoggedIn && auth.roles.includes('Agent')) ||
                (!size.isSmallScreen && !auth.isLoggedIn)
                  ? 'space-between'
                  : 'center'
              }
              height={quadrupleSpacer}
            >
              {size.isSmallScreen && !isLoggedInConsumer && (
                <StyledMenuToggle>
                  <Hamburger
                    label="menu"
                    color={white}
                    toggled={menuIsOpen}
                    toggle={() => setMenuIsOpen(!menuIsOpen)}
                  />
                </StyledMenuToggle>
              )}
              <StyledLogoLink
                to={
                  // eslint-disable-next-line no-nested-ternary
                  isLoggedInAgent
                    ? '/agent/listings/new/'
                    : isLoggedInConsumer
                    ? '/consumer/listing/'
                    : '/'
                }
                title="Logo"
              >
                <StyledLogoImg src={logo} alt="Realty Offer" height={doubleSpacer} width={41.41} />{' '}
                RealtyOffer
                <sup>&#8482;</sup>
                {/* <StyledTagline>Same Agent, Less Commission</StyledTagline> */}
                <StyledTagline>Get Paid to Buy a Home</StyledTagline>
              </StyledLogoLink>
              {false && ( // size.isSmallScreen && ( // TODO when notifications are ready
                <>
                  {shouldShowMenuToggle && (
                    <FlexContainer>
                      <div style={{ position: 'relative', marginRight: halfSpacer }}>
                        <Link to="/agent/notifications/">
                          <FaRegBell size={doubleSpacer} color={white} />
                          <NotificationDot isSmallScreen={Boolean(size.isSmallScreen)} />
                        </Link>
                      </div>
                    </FlexContainer>
                  )}
                </>
              )}

              <StyledMenu
                id="navMenu"
                isLoggedIn={auth.isLoggedIn}
                isSmallScreen={Boolean(size.isSmallScreen)}
                menuIsOpen={menuIsOpen}
              >
                {size.isSmallScreen && !auth.isLoggedIn && !isInSignupProcess && (
                  <>
                    {menuItemsToRender.length > 0 &&
                      menuItemsToRender.map((navItem) => (
                        <Link key={navItem.name} to={navItem.path} onClick={() => toggleMenu()}>
                          {navItem.name}
                        </Link>
                      ))}
                    <Link to="/login/" onClick={() => toggleMenu()}>
                      Log In
                    </Link>
                    <HorizontalRule compact />
                    <ContactInfo>
                      <strong>Questions? Contact Us</strong>
                      <a href="mailto:info@realtyoffer.com">info@realtyoffer.com</a> |{' '}
                      <a href="tel:+12489152654">(248) 915-2654</a>
                    </ContactInfo>
                  </>
                )}
                {size.isSmallScreen && isInSignupProcess && (
                  <Link to="/logout/" onClick={() => toggleMenu()}>
                    <FaSignOutAlt /> Exit Signup
                  </Link>
                )}
                {size.isSmallScreen && isLoggedInAgent && (
                  <>
                    <HorizontalRule />
                    <Link to="/" onClick={toggleSubMenu}>
                      Account {subMenuIsOpen ? <FaCaretUp /> : <FaCaretDown />}
                    </Link>
                    {subMenuIsOpen &&
                      secondaryNavigation.map((navItem) => (
                        <Link key={navItem.name} to={navItem.path} onClick={() => toggleMenu()}>
                          {getIcon(navItem.icon as string)} {navItem.name}
                        </Link>
                      ))}
                    <HorizontalRule />
                    {auth.roles.includes('Admin') && (
                      <>
                        <Link to="/admin/banners/" onClick={() => toggleMenu()}>
                          <FaUserLock /> Admin
                        </Link>
                        <HorizontalRule />
                      </>
                    )}
                    <Link
                      to="/"
                      onClick={() => {
                        toggleMenu();
                        dispatch(logout());

                        trackEvent('Logout', {
                          location: 'StyledMenu',
                        });
                      }}
                    >
                      <FaSignOutAlt /> Log Out
                    </Link>
                  </>
                )}
              </StyledMenu>
              {!size.isSmallScreen && isLoggedInAgent && !isInSignupProcess && (
                <FlexContainer>
                  {false && ( //
                    <>
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
                    </>
                  )}

                  <StyledDropdownWrapper
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    data-tip="Profile & Settings"
                    data-for="profile"
                    ref={profileNode}
                  >
                    Hi, {auth.firstName}&nbsp;&nbsp;
                    <Avatar src={user.avatar} gravatarEmail={auth.email} />
                    &nbsp;&nbsp;
                    {profileDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    {profileDropdownOpen && (
                      <StyledDropdown>
                        {secondaryNavigation.map((navItem) => (
                          <Link key={navItem.name} to={navItem.path}>
                            {getIcon(navItem.icon as string)} {navItem.name}
                          </Link>
                        ))}
                        {auth.roles.includes('Admin') && (
                          <Link to="/admin/banners/" onClick={() => toggleMenu()}>
                            <FaUserLock /> Admin
                          </Link>
                        )}
                        <Link
                          to="/"
                          onClick={() => {
                            dispatch(logout());

                            trackEvent('Logout', {
                              location: 'StyledDropdown',
                            });
                          }}
                        >
                          <FaSignOutAlt /> Log Out
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
              {isLoggedInConsumer && (
                <Link
                  to="/"
                  onClick={() => {
                    dispatch(logout());

                    trackEvent('Logout', {
                      location: 'Consumer Nav',
                    });
                  }}
                  style={{ color: white }}
                >
                  <FaSignOutAlt />
                  Log Out
                </Link>
              )}
              {!auth.isLoggedIn && !size.isSmallScreen && !isInSignupProcess && (
                <FlexContainer>
                  <ContactInfo small>
                    <strong>Questions? Contact Us</strong>
                    <a href="mailto:info@realtyoffer.com">info@realtyoffer.com</a> |{' '}
                    <a href="tel:+12489152654">(248) 915-2654</a>
                  </ContactInfo>
                  <Button type="link" to="/login" color="tertiary">
                    Log In
                  </Button>
                </FlexContainer>
              )}
              {!size.isSmallScreen && isInSignupProcess && (
                <Button type="link" to="/logout" color="inverseOutline" iconLeft={<FaSignOutAlt />}>
                  Exit Signup
                </Button>
              )}
            </FlexContainer>
          </PageContainer>
        </ClientOnly>
      </StyledNavbar>
      {!size.isSmallScreen && !isInSignupProcess && (
        <ClientOnly>
          <SubNav>
            <PageContainer>
              <FlexContainer>
                {menuItemsToRender.length > 0 &&
                  menuItemsToRender.map((navItem) => (
                    <SubNavLink
                      key={navItem.name}
                      to={navItem.path}
                      activeClassName="active"
                      onClick={() => toggleMenu()}
                    >
                      {navItem.name}
                    </SubNavLink>
                  ))}
              </FlexContainer>
            </PageContainer>
          </SubNav>
        </ClientOnly>
      )}
    </>
  );
};

export default Navbar;
