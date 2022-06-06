import styled, { keyframes } from 'styled-components';
import React from 'react';
import { brandTertiary } from '../styles/color';
import { halfSpacer, octupleSpacer, doubleSpacer, breakpoints } from '../styles/size';

const KeyframesDrop = keyframes`
  0% {
    top: -350px;
  }
  100% {
    top: 0;
  }
`;

const StyledAwardBanner = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  width: 150px;
  height: 100px;
  background-color: ${brandTertiary};
  right: ${doubleSpacer};
  top: -350px;
  text-align: center;

  @media only screen and (min-width: ${breakpoints.sm}) {
    display: block;
    animation: ${KeyframesDrop} forwards 0.8s 1s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  & img {
    filter: brightness(1000%);
    width: ${octupleSpacer};
    display: block;
    margin: ${halfSpacer} auto 0;
  }

  &:before {
    content: '';
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: -50px;
    border-left: 75px solid ${brandTertiary};
    border-right: 75px solid ${brandTertiary};
    border-bottom: 50px solid transparent;
  }
`;

const AwardBanner = (): JSX.Element => {
  return (
    <StyledAwardBanner>
      <a
        href="https://michbusiness.com/events/2021-best-of-michbusiness-awards/winners/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/img/BestOfMichbusinessLogo-215x100.png" alt="" />
        2021 Winner
      </a>
    </StyledAwardBanner>
  );
};

export default AwardBanner;
