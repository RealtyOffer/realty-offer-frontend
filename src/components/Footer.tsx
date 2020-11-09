import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import {
  FaLinkedin,
  FaYoutubeSquare,
  FaInstagram,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa';

import { FlexContainer, Heading, Row, Column, PageContainer } from '.';
import appleAppStoreBadge from '../images/apple-app-store.svg';
import googlePlayStoreBadge from '../images/google-play-store.svg';

import { brandTertiary, white } from '../styles/color';
import { tripleSpacer, baseSpacer, doubleSpacer } from '../styles/size';
import { fontSizeH3 } from '../styles/typography';

import logo from '../images/logo.svg';
import { visuallyHiddenStyle } from '../styles/mixins';

const StyledFooter = styled.footer`
  background-color: ${brandTertiary};
  color: ${white};
  padding: ${doubleSpacer} 0;

  & a:not(.email) {
    color: ${white};

    &:hover,
    &:focus {
      color: ${white};
    }
  }

  @media print {
    display: none;
  }
`;

const LogoLink = styled(Link)`
  margin: ${doubleSpacer} 0;
  font-size: ${fontSizeH3};
  display: block;
`;

const SocialLink = styled.a`
  margin-right: ${baseSpacer};
  font-size: ${fontSizeH3};
`;

const HiddenText = styled.span`
  ${visuallyHiddenStyle}
`;

const Badge = styled.div`
  margin-right: ${baseSpacer};
  margin-bottom: ${baseSpacer};
`;

const Footer = () => (
  <StyledFooter>
    <PageContainer>
      <LogoLink to="/" title="Logo">
        <img src={logo} alt="Realty Offer" height={tripleSpacer} /> RealtyOffer
      </LogoLink>
      <Row>
        <Column md={6} lg={5}>
          <p style={{ lineHeight: 1.2 }}>
            <small>
              Need to buy or sell a home? Need a mortgage consultation or second review? Our
              directors at RealtyOffer have been helping new and existing homeowners for over 25
              years!
            </small>
          </p>
          <p style={{ lineHeight: 1.2 }}>
            <small>
              Our goal is to make buying/selling a home, or getting a mortgage, as easy and
              stress-free as possible. Whether this is your first home or tenth, RealtyOffer
              utilizes the latest technology to connect you with top-rated certified and vetted
              agents. Completely free!
            </small>
          </p>
          <Heading as="h6" inverse>
            CONNECT WITH US
          </Heading>
          <p>
            <SocialLink href="https://www.facebook.com/RealtyOffer" target="_blank">
              <FaFacebookSquare />
              <HiddenText>Facebook</HiddenText>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/company/realtyoffer/" target="_blank">
              <FaLinkedin />
              <HiddenText>LinkedIn</HiddenText>
            </SocialLink>
            <SocialLink
              href="https://www.youtube.com/channel/UCA2Lxd_nxREIZ7ruAzq18Ag"
              target="_blank"
            >
              <FaYoutubeSquare />
              <HiddenText>Youtube</HiddenText>
            </SocialLink>
            <SocialLink href="https://www.instagram.com/realtyofferus/" target="_blank">
              <FaInstagram />
              <HiddenText>Instagram</HiddenText>
            </SocialLink>
            <SocialLink href="https://twitter.com/realtyoffer1" target="_blank">
              <FaTwitterSquare />
              <HiddenText>Twitter</HiddenText>
            </SocialLink>
          </p>
          <p style={{ margin: 0 }}>
            <small>Download our Agent Mobile App</small>
          </p>
          <div>
            <FlexContainer flexDirection="row" justifyContent="flex-start">
              <Badge>
                <a href="https://apps.apple.com/us/app/realtyoffer/id1531733131">
                  <img src={appleAppStoreBadge} height={40} alt="Download on Apple App Store" />
                </a>
              </Badge>
              <Badge>
                <a href="https://apps.apple.com/us/app/realtyoffer/id1531733131">
                  <img src={googlePlayStoreBadge} height={40} alt="Download on Google Play Store" />
                </a>
              </Badge>
            </FlexContainer>
          </div>
        </Column>
        <Column sm={4} md={2} lgOffset={1}>
          <Heading as="h6" inverse>
            CONSUMERS
          </Heading>
          <p>
            {/* todo: consumer/start */}
            <Link to="/">Buy or Sell</Link>
          </p>
          <p>
            <Link to="/mortgage-consultation">Mortgage Consultation</Link>
          </p>
          <p>
            <Link to="/frequently-asked-questions">FAQs</Link>
          </p>
        </Column>
        <Column sm={4} md={2}>
          <Heading as="h6" inverse>
            AGENTS
          </Heading>
          <p>
            <Link to="/agents">Become an Agent</Link>
          </p>
          <p>
            <Link to="/frequently-asked-questions">FAQs</Link>
          </p>
        </Column>
        <Column sm={4} md={2}>
          <Heading as="h6" inverse>
            CONTACT US
          </Heading>
          <p>
            <Link to="/about">About Us</Link>
          </p>
          <p>
            <Link to="/privacy">Privacy Policy</Link>
          </p>
          <p>
            <Link to="/terms">Terms of Use</Link>
          </p>
          <p>
            <Link to="/contact">Contact</Link>
          </p>
        </Column>
      </Row>
      {/* <p>
        <a href="mailto:info@realtyoffer.com" className="email">
          info@realtyoffer.com
        </a>
      </p> */}
      <p style={{ textAlign: 'center' }}>
        <small>{`${new Date().getFullYear()} RealtyOffer. All Rights Reserved. `}</small>
      </p>
    </PageContainer>
  </StyledFooter>
);

export default Footer;
