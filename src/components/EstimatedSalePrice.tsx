import React, { FunctionComponent, useState } from 'react';
import Slider from 'react-rangeslider';
import styled from 'styled-components';

import { Box, Heading } from '.';
import numberWithCommas from '../utils/numberWithCommas';
import { brandPrimaryAccentLight, brandTertiaryHover } from '../styles/color';

type EstimatedSalePriceProps = {};

const SlidderWrapper = styled.div`
  & .rangeslider {
    box-shadow: none;
    background-color: ${brandPrimaryAccentLight};
  }

  & .rangeslider-horizontal .rangeslider__fill {
    background-color: ${brandTertiaryHover};
    box-shadow: none;
  }

  & .rangeslider .rangeslider__handle {
    background: ${brandTertiaryHover};
    border-color: ${brandTertiaryHover};
    box-shadow: none;
    outline: none;
  }

  & .rangeslider-horizontal .rangeslider__handle:after {
    content: none;
  }
`;

const EstimatedSalePrice: FunctionComponent<EstimatedSalePriceProps> = () => {
  const [sellRange, setSellRange] = useState(250000);
  return (
    <Box>
      <Heading as="h4" styledAs="title">
        Selling Your Home
      </Heading>
      <SlidderWrapper>
        <p>Select Your Estimated Sale Price: {`$${numberWithCommas(sellRange)}`}</p>
        <Slider
          min={100000}
          max={2000000}
          step={50000}
          value={sellRange}
          tooltip={false}
          labels={{
            100000: '$100k',
            500000: '$500k',
            1000000: '$1M',
            1500000: '$1.5M',
            2000000: '$2M',
          }}
          onChange={(value) => setSellRange(value)}
        />
      </SlidderWrapper>
      <br />
      <Heading as="h4" styledAs="subtitle" noMargin>
        Your Estimated Savings:{' '}
        {`$${numberWithCommas(sellRange * 0.02)} - $${numberWithCommas(sellRange * 0.03)}`}
      </Heading>
      <p>
        <small>Average savings of 2% to 3%</small>
      </p>
    </Box>
  );
};

export default EstimatedSalePrice;
