import React, { useState, FunctionComponent } from 'react';
import Countdown from 'react-countdown';
import { FaHome } from 'react-icons/fa';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import styled from 'styled-components';

import Box from './Box';
import Button from './Button';
import Row from './Row';
import Column from './Column';
import Heading from './Heading';
import HorizontalRule from './HorizontalRule';
import FlexContainer from './FlexContainer';
import {
  brandPrimary,
  lightestGray,
  brandDanger,
  textColor,
  brandPrimaryHover,
} from '../styles/color';
import { baseSpacer } from '../styles/size';

type BidCardProps = {
  priceRange: string;
  type: 'selling' | 'buying';
  location: string | Array<string>;
  expiresAt: Date;
};

const StyledTimeRemaining = styled.small`
  display: block;
  line-height: 1;
  margin: ${baseSpacer} 0;
`;

const StyledToggle = styled.a`
  color: ${brandPrimary};
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
    color: ${brandPrimaryHover};
  }
`;

const BidCard: FunctionComponent<BidCardProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  // difference in minutes from expiration date to now, divided by 1440 which is number of minutes
  // in a day (24*60). Then multiply that by 100 to get percentage value
  const progressBarValue = (differenceInMinutes(props.expiresAt, Date.now()) / 1440) * 100;
  const expiringSoon = progressBarValue < 10;
  return (
    <Box>
      <Row>
        <Column xs={3}>
          <div style={{ textAlign: 'center' }}>
            <CircularProgressbarWithChildren
              value={progressBarValue}
              styles={buildStyles({
                pathColor: expiringSoon ? brandDanger : brandPrimary,
                trailColor: lightestGray,
              })}
            >
              <small style={{ color: expiringSoon ? brandDanger : textColor }}>
                <Countdown date={props.expiresAt} daysInHours />
              </small>
            </CircularProgressbarWithChildren>
            <StyledTimeRemaining>Bid time remaining</StyledTimeRemaining>
          </div>
        </Column>
        <Column xs={9}>
          <Heading as="h2" styledAs="subtitle">
            {props.type === 'selling' ? 'Estimated Home Value' : 'Purchase Price'}
          </Heading>
          <Heading as="h1" styledAs="title">
            {props.priceRange}
          </Heading>
          <p>
            {Array.isArray(props.location) && props.location.length
              ? `around ${props.location.toString().replace(',', ', ')}`
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
        <StyledToggle onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Less Info' : 'More Info'}
        </StyledToggle>
      </FlexContainer>
      {isVisible && (
        <>
          <dl>
            <dt>Style of Home</dt>
            <dd>Colonial</dd>
            <dt>Year house was build?</dt>
            <dd>2012</dd>
            <dt>Remodeled?</dt>
            <dd>Partially</dd>
          </dl>
        </>
      )}
    </Box>
  );
};

export default BidCard;
