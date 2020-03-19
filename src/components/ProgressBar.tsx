import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { fontSizeSmall } from '../styles/typography';
import { baseSpacer, halfSpacer } from '../styles/size';
import { lightestGray, brandPrimary } from '../styles/color';

type ProgressBarProps = {
  value: number;
  name: string;
  label: string;
};

const StyledProgressBar = styled.progress`
  display: none;
`;

const StyledTrack = styled.div`
  position: relative;
  width: 100%;
  background-color: ${lightestGray};
  height: ${halfSpacer};
`;

const StyledBar = styled.div<{ value: number }>`
  position: absolute;
  height: ${halfSpacer};
  width: ${props => `${props.value}%`};
  background-color: ${brandPrimary};
`;

const StyledLabel = styled.label`
  font-size: ${fontSizeSmall};
  margin-bottom: ${baseSpacer};
`;

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ name, value, label }) => (
  <>
    <StyledTrack>
      <StyledBar value={value} />
    </StyledTrack>
    <StyledProgressBar id={name} value={value} max={100} />
    <StyledLabel htmlFor={name}>{label}</StyledLabel>
  </>
);

export default ProgressBar;
