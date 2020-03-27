import React, { FunctionComponent } from 'react';
import Countdown from 'react-countdown';
import { FaHome } from 'react-icons/fa';

import Box from './Box';
import Button from './Button';
import Row from './Row';
import Column from './Column';
import Heading from './Heading';
import HorizontalRule from './HorizontalRule';
import FlexContainer from './FlexContainer';

type BidCardProps = {
  index: number;
  total: number;
  priceRange: string;
  type: 'selling' | 'buying';
  location: string | Array<string>;
  expiresAt: string;
};

const BidCard: FunctionComponent<BidCardProps> = (props) => (
  <Box>
    <Row>
      <Column xs={3}>
        <div>
          {props.index}/{props.total}
        </div>
        <Countdown date={props.expiresAt} daysInHours />
        <div>time remaining</div>
      </Column>
      <Column xs={9}>
        <strong>{props.type === 'selling' ? 'Estimated Home Value' : 'Purchase Price'}</strong>
        <Heading as="h2">{props.priceRange}</Heading>
        <p>
          {Array.isArray(props.location) && props.location.length
            ? 'in multiple zip codes'
            : `located in ${props.location}`}
        </p>
        <Button type="button" block>
          Place Bid
        </Button>
      </Column>
    </Row>
    <HorizontalRule />
    <FlexContainer justifyContent="space-between">
      <span>
        <FaHome /> {props.type === 'selling' ? 'Sell My Home' : 'Purchase a Home'}
      </span>
      <span>Show More Info</span>
    </FlexContainer>
  </Box>
);

export default BidCard;
