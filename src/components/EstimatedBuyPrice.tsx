import React, { FunctionComponent, useState } from 'react';
import Slider from 'react-rangeslider';
import styled from 'styled-components';

import { Box, Heading } from '.';
import numberWithCommas from '../utils/numberWithCommas';
import { brandPrimaryAccentLight, brandTertiaryHover } from '../styles/color';

type EstimatedBuyPriceProps = {};

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

const EstimatedBuyPrice: FunctionComponent<EstimatedBuyPriceProps> = () => {
  const [buyRange, setBuyRange] = useState(250000);
  return (
    <Box>
      <Heading as="h4" styledAs="title">
        Buying Your Home
      </Heading>
      <SlidderWrapper>
        <p>Select Your Estimated Purchase Price: {`$${numberWithCommas(buyRange)}`}</p>
        <Slider
          min={100000}
          max={2000000}
          step={50000}
          value={buyRange}
          tooltip={false}
          labels={{
            100000: '$100k',
            500000: '$500k',
            1000000: '$1M',
            1500000: '$1.5M',
            2000000: '$2M',
          }}
          onChange={(value) => setBuyRange(value)}
        />
      </SlidderWrapper>
      <br />
      <Heading as="h4" styledAs="subtitle" noMargin>
        Your Estimated Cash Back:{' '}
        {`$${numberWithCommas(buyRange * 0.01)} - $${numberWithCommas(buyRange * 0.02)}`}
      </Heading>
      <p>
        <small>Average cash back towards closings costs of 1% to 2%</small>
      </p>
    </Box>
  );
};

export default EstimatedBuyPrice;
