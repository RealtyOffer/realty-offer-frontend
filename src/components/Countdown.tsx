import React, { FunctionComponent } from 'react';
import ReactCountdown from 'react-countdown';
import { FaRegClock } from 'react-icons/fa';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';

import { brandDanger, textColor } from '../styles/color';
import { quarterSpacer } from '../styles/size';
import {
  isExpiringSoon,
  expiresAt,
  isExpired,
  timeNowWithOffset,
} from '../utils/countdownTimerUtils';

type CountdownProps = {
  createDateTime: Date;
};

const CountdownWrapper = styled.div`
  color: ${(props: { expiringSoon: boolean }) => (props.expiringSoon ? brandDanger : textColor)};
  display: flex;
  align-items: center;
  & span {
    margin-left: ${quarterSpacer};
  }
`;

const Countdown: FunctionComponent<CountdownProps> = ({ createDateTime }) => (
  <CountdownWrapper expiringSoon={isExpiringSoon(createDateTime)}>
    {isExpired(createDateTime) ? (
      <span>{format(parseISO(String(createDateTime)), 'MM/dd/yyyy hh:mmaa')}</span>
    ) : (
      <>
        <FaRegClock />
        <ReactCountdown
          date={expiresAt(createDateTime)}
          now={() => timeNowWithOffset(createDateTime)}
          daysInHours
        />
      </>
    )}
  </CountdownWrapper>
);

export default Countdown;
