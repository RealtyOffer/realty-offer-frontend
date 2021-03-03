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
};

const HeroImageWrapper = styled.div`
  position: relative;
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
  & p {
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.75);
  }
`;

const HeroImage: FunctionComponent<HeroImageProps> = ({ imgSrc, children, mobileImgSrc }) => {
  const size = useWindowSize();

  return (
    <HeroImageWrapper
      aspectRatio={
        size.isExtraSmallScreen && mobileImgSrc
          ? mobileImgSrc.childImageSharp.fluid.aspectRatio
          : imgSrc.childImageSharp.fluid.aspectRatio
      }
    >
      <ClientOnly>
        <PreviewCompatibleImage
          imageInfo={{
            image: size.isExtraSmallScreen && mobileImgSrc ? mobileImgSrc : imgSrc,
            alt: '',
          }}
        />
      </ClientOnly>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </HeroImageWrapper>
  );
};

export default HeroImage;
