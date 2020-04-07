import React, { FunctionComponent } from 'react';
import Countdown from 'react-countdown';
import { FaRegClock } from 'react-icons/fa';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import styled from 'styled-components';

import Button from './Button';
import Heading from './Heading';

import { brandPrimary, brandDanger, brandSuccess, brandPrimaryHover, white } from '../styles/color';
import { halfSpacer, baseSpacer, borderRadius } from '../styles/size';
import { z1Shadow, baseBorderStyle } from '../styles/mixins';

type BidCardProps = {
  priceRange: string;
  type: 'selling' | 'buying';
  location: string | Array<string>;
  expiresAt: Date;
};

const BidCardWrapper = styled.div`
  text-align: center;
  background: ${white};
  margin-bottom: ${baseSpacer};
  box-shadow: ${z1Shadow};
  border-left: ${baseSpacer} solid
    ${(props: { expiringSoon: boolean }) => (props.expiringSoon ? brandDanger : brandSuccess)};
  border-radius: ${borderRadius};
`;

const BidCardHeader = styled.div`
  padding: ${halfSpacer} ${baseSpacer};
  color: ${(props: { expiringSoon: boolean }) => (props.expiringSoon ? brandDanger : brandSuccess)};
  border-bottom: ${baseBorderStyle};
`;

const BidCardBody = styled.div`
  padding: ${halfSpacer} ${baseSpacer};
`;

const BidCardFooter = styled.div`
  border-top: ${baseBorderStyle};
  padding: ${baseSpacer};
`;

const BidCard: FunctionComponent<BidCardProps> = (props) => {
  // difference in minutes from expiration date to now, divided by 1440 which is number of minutes
  // in a day (24*60). Then multiply that by 100 to get percentage value
  const timeDifference = (differenceInMinutes(props.expiresAt, Date.now()) / 1440) * 100;
  const expiringSoon = timeDifference < 8.3333333; // 2 hours out of 24

  return (
    <BidCardWrapper expiringSoon={expiringSoon}>
      <BidCardHeader expiringSoon={expiringSoon}>
        <FaRegClock /> <Countdown date={props.expiresAt} daysInHours />
      </BidCardHeader>
      <BidCardBody>
        <Heading as="h1" align="center">
          {props.priceRange}
        </Heading>
        <p>
          {Array.isArray(props.location) && props.location.length
            ? `around ${props.location.toString().replace(',', ', ')}`
            : `located in ${props.location}`}
        </p>
      </BidCardBody>
      <BidCardFooter>
        <Button type="link" to="/agent/listings/1" block>
          Listing Details
        </Button>
      </BidCardFooter>
    </BidCardWrapper>
  );
};

export default BidCard;
