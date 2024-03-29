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
  <>
    <StyledFooter>
      <PageContainer>
        <LogoLink to="/" title="Logo">
          <img src={logo} alt="Realty Offer" height={tripleSpacer} width={62.11} /> RealtyOffer
          <sup>&#8482;</sup>
          <br />
          <br />
          {/* <small>Same Agent, Less Commission</small> */}
          <small>Get Paid to Buy a Home</small>
          <br />
        </LogoLink>

        <Row>
          <Column md={6} lg={5}>
            {/* <p style={{ lineHeight: 1.2 }}>
              <small>
                Need to buy or sell a home? Need a mortgage consultation or second review? Our
                directors at RealtyOffer have been helping new and existing homeowners for over 25
                years!
              </small>
            </p> */}
            <p style={{ lineHeight: 1.2 }}>
              <small>
                Our goal is to make buying/selling a home as easy and stress-free as possible.
                Whether this is your first home or tenth, RealtyOffer utilizes the latest technology
                to connect you with top-rated certified and vetted agents. Completely free!
              </small>
            </p>
            <Heading as="h4" inverse>
              CONNECT WITH US
            </Heading>
            <p>
              <SocialLink
                href="https://www.facebook.com/RealtyOffer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare color="#ffffff" />
                <HiddenText>Facebook</HiddenText>
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/company/realtyoffer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin color="#ffffff" />
                <HiddenText>LinkedIn</HiddenText>
              </SocialLink>
              <SocialLink
                href="https://www.youtube.com/channel/UCA2Lxd_nxREIZ7ruAzq18Ag"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutubeSquare color="#ffffff" />
                <HiddenText>Youtube</HiddenText>
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/realtyofferus/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram color="#ffffff" />
                <HiddenText>Instagram</HiddenText>
              </SocialLink>
              <SocialLink
                href="https://twitter.com/realtyoffer1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitterSquare color="#ffffff" />
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
                    <img
                      src={appleAppStoreBadge}
                      height={40}
                      width={122.3}
                      alt="Download on Apple App Store"
                    />
                  </a>
                </Badge>
                <Badge>
                  <a href="https://play.google.com/store/apps/details?id=com.realtyoffernative">
                    <img
                      src={googlePlayStoreBadge}
                      height={40}
                      width={122.3}
                      alt="Download on Google Play Store"
                    />
                  </a>
                </Badge>
              </FlexContainer>
            </div>
          </Column>
          <Column sm={4} md={2} lgOffset={1}>
            <Heading as="h5" inverse>
              CONSUMERS
            </Heading>
            <p>
              <Link to="/how-it-works/">How it Works</Link>
            </p>
            <p>
              <Link to="/">For Buyers</Link>
            </p>
            <p>
              <Link to="/sell/">For Sellers</Link>
            </p>

            {/* <p>
              <Link to="/mortgage-consultation">Mortgage Consultation</Link>
            </p> */}
            <br />
            <Heading as="h5" inverse>
              AGENTS
            </Heading>
            <p>
              <Link to="/agents/">Become an Agent</Link>
            </p>
            <br />
          </Column>
          <Column sm={4} md={2}>
            <Heading as="h5" inverse>
              ABOUT
            </Heading>
            <p>
              <Link to="/blog/">News</Link>
            </p>
            <p>
              <Link to="/about/">About Us</Link>
            </p>
            <p>
              <Link to="/investors/">For Investors</Link>
            </p>
            <p>
              <Link to="/press/">Press</Link>
            </p>
            <p>
              <Link to="/frequently-asked-questions/">FAQs</Link>
            </p>
            <br />
          </Column>
          <Column sm={4} md={2}>
            <Heading as="h5" inverse>
              CONTACT
            </Heading>
            <p>
              <Link to="/contact/">Send a Message</Link>
            </p>
            <p>
              <a href="tel:+12489152654">(248) 915-2654</a>
            </p>
            <br />
            <Heading as="h5" inverse>
              LEGAL
            </Heading>
            <p>
              <Link to="/privacy/">Privacy Policy</Link>
            </p>
            <p>
              <Link to="/terms/">Terms of Use</Link>
            </p>
          </Column>
        </Row>
      </PageContainer>
    </StyledFooter>
    <p style={{ textAlign: 'center', padding: baseSpacer, margin: 0 }}>
      <small>&copy; {`${new Date().getFullYear()} `}RealtyOffer&trade;. All Rights Reserved.</small>
    </p>
  </>
);

export default Footer;
