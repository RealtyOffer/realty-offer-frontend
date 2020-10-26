import { FluidObject } from 'gatsby-image';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { white } from '../styles/color';
import { baseSpacer, breakpoints, doubleSpacer, screenSizes } from '../styles/size';
import useWindowSize from '../utils/useWindowSize';
import ClientOnly from './ClientOnly';
import PreviewCompatibleImage from './PreviewCompatibleImage';

type FullBleedImageProps = {
  imgSrc:
    | {
        childImageSharp: {
          fluid: FluidObject;
        };
      }
    | string;
  mobileImgSrc?: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

const HeroImageWrapper = styled.div`
  position: relative;
  margin-top: -${baseSpacer};
  min-height: 250px;
  height: 100%;
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
  min-height: 100%;
  color: ${white};

  & h1,
  & h2,
  & h3 {
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.75);
  }
`;

const FullBleedImage: FunctionComponent<FullBleedImageProps> = ({
  imgSrc,
  children,
  mobileImgSrc,
}) => {
  const size = useWindowSize();
  const isSmallScreen = Boolean(size && size.width && size.width < screenSizes.small);

  return (
    <HeroImageWrapper>
      <ClientOnly>
        <PreviewCompatibleImage
          imageInfo={{
            image: isSmallScreen && mobileImgSrc ? mobileImgSrc : imgSrc,
            alt: '',
          }}
        />
      </ClientOnly>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </HeroImageWrapper>
  );
};

export default FullBleedImage;
