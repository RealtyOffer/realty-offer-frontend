import React, { FunctionComponent } from 'react';
import ReactCountdown from 'react-countdown';
import { FaRegClock } from 'react-icons/fa';
import styled from 'styled-components';

import { brandDanger, textColor } from '../styles/color';
import { isExpiringSoon, expiresAt, timeNowWithOffset } from '../utils/countdownTimerUtils';

type CountdownProps = {
  createDateTime: Date;
};

const CountdownWrapper = styled.div`
  color: ${(props: { expiringSoon: boolean }) => (props.expiringSoon ? brandDanger : textColor)};
`;

const Countdown: FunctionComponent<CountdownProps> = ({ createDateTime }) => (
  <CountdownWrapper expiringSoon={isExpiringSoon(createDateTime)}>
    <FaRegClock />{' '}
    <ReactCountdown
      date={expiresAt(createDateTime)}
      now={() => timeNowWithOffset(createDateTime)}
      daysInHours
    />
  </CountdownWrapper>
);

export default Countdown;
