import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { doubleSpacer } from '../styles/size';

type FullBleedImageProps = {
  src: string;
};

const StyledFullBleedImage = styled.div`
  background-image: ${(props: FullBleedImageProps) => `url(${props.src})`};
  background-position: top center;
  background-attachment: fixed;
  height: 350px;
  margin-top: -${doubleSpacer};
  margin-bottom: ${doubleSpacer};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FullBleedImage: FunctionComponent<FullBleedImageProps> = ({ src, children }) => (
  <StyledFullBleedImage src={src}>{children}</StyledFullBleedImage>
);

export default FullBleedImage;
