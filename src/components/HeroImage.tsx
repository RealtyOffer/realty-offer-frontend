import { FluidObject } from 'gatsby-image';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { white } from '../styles/color';
import useWindowSize from '../utils/useWindowSize';
import { ClientOnly, PreviewCompatibleImage } from '.';
import { baseSpacer, breakpoints, doubleSpacer } from '../styles/size';

type HeroImageProps = {
  imgSrc: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  mobileImgSrc?: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  removeFromFlow?: boolean;
  hasOverlay?: boolean;
};

const HeroImageWrapper = styled.div`
  position: ${(props: { removeFromFlow?: boolean; aspectRatio: number }) =>
    props.removeFromFlow ? 'absolute' : 'relative'};
${(props) => props.removeFromFlow && `left: 0; right: 0;`}
  margin-top: -${baseSpacer};
  min-height: ${(props: { aspectRatio: number }) => `calc(100vw / ${props.aspectRatio})`};
  @media only screen and (min-width: ${breakpoints.sm}) {
    margin-top: -${doubleSpacer};
  }
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${white};

  & h1,
  & h6 p {
    display: inline;
    background-color: ${white};
    padding: 0.1em 0.2em 0.1em 0;
    box-shadow: 0.2em 0 0 #fff, -0.2em 0 0 #fff;
    line-height: 1.7;
  }
`;

const GradientOverlay = styled.div`
  background: rgb(255, 255, 255);
  background: linear-gradient(90deg, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 80%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const HeroImage: FunctionComponent<HeroImageProps> = ({
  imgSrc,
  children,
  mobileImgSrc,
  removeFromFlow,
  hasOverlay,
}) => {
  const size = useWindowSize();

  return (
    <HeroImageWrapper
      removeFromFlow={removeFromFlow}
      aspectRatio={
        size.isSmallScreen && mobileImgSrc
          ? mobileImgSrc.childImageSharp.fluid.aspectRatio
          : imgSrc.childImageSharp.fluid.aspectRatio
      }
    >
      <ClientOnly>
        <PreviewCompatibleImage
          lazy="eager"
          imageInfo={{
            image: size.isSmallScreen && mobileImgSrc ? mobileImgSrc : imgSrc,
            alt: '',
          }}
        />
        {hasOverlay && <GradientOverlay />}
      </ClientOnly>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </HeroImageWrapper>
  );
};

export default HeroImage;
