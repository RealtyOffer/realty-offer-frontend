import React, { FunctionComponent } from 'react';
import ReactCountdown from 'react-countdown';
import { FaRegClock } from 'react-icons/fa';
import styled from 'styled-components';
import { format } from 'date-fns';

import { brandDanger, textColor } from '../styles/color';
import { quarterSpacer } from '../styles/size';
import {
  isExpiringSoon,
  expiresAt,
  isExpired,
  localizedCreateDateTime,
} from '../utils/countdownTimerUtils';

type CountdownProps = {
  createDateTime: Date;
  onComplete: () => void;
};

const CountdownWrapper = styled.div`
  color: ${(props: { expiringSoon: boolean }) => (props.expiringSoon ? brandDanger : textColor)};
  display: flex;
  align-items: center;
  & span {
    margin-left: ${quarterSpacer};
  }
`;

const Countdown: FunctionComponent<CountdownProps> = ({ createDateTime, onComplete }) => (
  <CountdownWrapper expiringSoon={isExpiringSoon(createDateTime)}>
    {isExpired(createDateTime) ? (
      <span>{format(localizedCreateDateTime(createDateTime), 'MM/dd/yyyy hh:mmaa')}</span>
    ) : (
      <>
        <FaRegClock />
        <ReactCountdown date={expiresAt(createDateTime)} daysInHours onComplete={onComplete} />
      </>
    )}
  </CountdownWrapper>
);

export default Countdown;
