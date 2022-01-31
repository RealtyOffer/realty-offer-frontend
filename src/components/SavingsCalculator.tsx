import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import numberWithCommas from '../utils/numberWithCommas';
import Button from './Button';
import { brandPrimaryAccentLight, brandTertiaryHover } from '../styles/color';
import { doubleSpacer } from '../styles/size';
import Heading from './Heading';

type SavingsCalculatorProps = {
  type: 'buying' | 'selling';
};

const SlidderWrapper = styled.div`
  padding: ${doubleSpacer};
  text-align: center;
  & .rangeslider {
    box-shadow: none;
    background-color: ${brandPrimaryAccentLight};
    margin-bottom: ${doubleSpacer};
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

const SavingsCalculator = (props: SavingsCalculatorProps): JSX.Element => {
  const [sellRange, setSellRange] = useState(250000);
  const [buyRange, setBuyRange] = useState(350000);
  return (
    <>
      <SlidderWrapper>
        <Heading as="h4" align="center">
          {props.type === 'buying' ? 'Buying Your Home' : 'Selling Your Home'}
        </Heading>
        <p>
          <small>
            {props.type === 'buying'
              ? 'On average, RealtyOffer™ customers save 1.0%* when buying a new home using a RealtyOffer™ Agent.'
              : ' On average, RealtyOffer™ customers save 2-3%* when selling their home using a RealtyOffer™ Agent.'}
          </small>
        </p>
        <Heading as="h4" styledAs="subtitle" noMargin>
          Estimated Savings:{' '}
          {props.type === 'buying'
            ? `$${numberWithCommas(buyRange * 0.01)} - $${numberWithCommas(buyRange * 0.02)}`
            : `$${numberWithCommas(sellRange * 0.02)} - $${numberWithCommas(sellRange * 0.03)}`}
        </Heading>
        <Slider
          min={100000}
          max={2000000}
          step={50000}
          value={props.type === 'buying' ? buyRange : sellRange}
          tooltip={false}
          labels={{
            100000: '$100k',
            500000: '$500k',
            1000000: '$1M',
            1500000: '$1.5M',
            2000000: '$2M',
          }}
          onChange={(value) => (props.type === 'buying' ? setBuyRange(value) : setSellRange(value))}
        />
        <p>
          <small>
            <em>Estimated {props.type === 'buying' ? 'Purchase' : 'Selling'} Price</em>
          </small>
        </p>
        <Button type="link" to={props.type === 'buying' ? '/buy' : '/sell'}>
          {props.type === 'buying' ? 'Buy A Home' : 'Sell Your Home'}
        </Button>
      </SlidderWrapper>
    </>
  );
};

export default SavingsCalculator;
