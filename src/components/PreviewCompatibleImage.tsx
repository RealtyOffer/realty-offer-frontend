/* eslint-disable react/require-default-props */
import React from 'react';
import Img, { FluidObject, FixedObject } from 'gatsby-image';

export type FluidImageType = {
  childImageSharp: {
    fluid: FluidObject;
  };
};

export type FixedImageType = {
  childImageSharp: {
    fixed: FixedObject;
  };
};

const PreviewCompatibleImage = ({
  imageInfo,
  width = '100%',
  height = 'auto',
  loading = 'lazy',
  ...rest
}: {
  width?: string;
  height?: string;
  loading?: 'eager' | 'lazy';
  imageInfo: {
    image: FluidImageType | FixedImageType | string;
    alt?: string;
  };
  // eslint-disable-next-line react/require-default-props
  style?: React.CSSProperties;
}) => {
  const imageStyle = { width, height };
  const { alt = '', image } = imageInfo;

  const isFluidImage =
    !!image &&
    typeof image !== 'string' &&
    Object.prototype.hasOwnProperty.call(image.childImageSharp, 'fluid');
  const isFixedImage =
    !!image &&
    typeof image !== 'string' &&
    Object.prototype.hasOwnProperty.call(image.childImageSharp, 'fixed');

  if (typeof image !== 'string' && isFluidImage) {
    return (
      <Img
        imgStyle={imageStyle}
        fluid={(image as FluidImageType).childImageSharp.fluid}
        alt={alt}
        loading={loading}
        {...rest}
      />
    );
  }

  if (typeof image !== 'string' && isFixedImage) {
    return (
      <Img
        style={imageStyle}
        fixed={(image as FixedImageType).childImageSharp.fixed}
        alt={alt}
        loading={loading}
        {...rest}
      />
    );
  }

  if (!isFluidImage && !isFixedImage && typeof image === 'string') {
    return <img style={imageStyle} src={image} alt={alt} {...rest} />;
  }

  return null;
};

export default PreviewCompatibleImage;
