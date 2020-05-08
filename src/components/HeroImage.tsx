import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { doubleSpacer } from '../styles/size';

type FullBleedImageProps = {
  src: string;
  height?: string;
};

const StyledFullBleedImage = styled.div`
  background-image: ${(props: FullBleedImageProps) => `url(${props.src})`};
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  height: ${(props: FullBleedImageProps) => props.height || '350px'};
  margin-top: -${doubleSpacer};
  margin-bottom: ${doubleSpacer};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FullBleedImage: FunctionComponent<FullBleedImageProps> = ({ src, children, height }) => (
  <StyledFullBleedImage src={src} height={height}>
    {children}
  </StyledFullBleedImage>
);

export default FullBleedImage;
