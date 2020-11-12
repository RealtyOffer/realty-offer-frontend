import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { FlexContainer } from '.';
import { halfSpacer, baseSpacer, doubleSpacer, breakpoints, borderRadius } from '../styles/size';
import { brandTertiary, white, lightGray } from '../styles/color';

type TimelineProgressProps = {
  items: Array<string>;
  currentStep: number;
};

const TimelineProgressWrapper = styled.div`
  position: relative;
`;

const TrackBackground = styled.div`
  height: ${halfSpacer};
  background-color: ${lightGray};
  margin: 0 ${doubleSpacer} ${halfSpacer} 0;
  border-radius: ${borderRadius};
`;

const TrackValue = styled.div`
  height: ${halfSpacer};
  width: ${(props: { percentage: number; currentStep: number }) =>
    `${
      props.percentage === 0 ? '32px' : `calc(${Math.floor(props.percentage)}% + ${baseSpacer})`
    }`};
  max-width: calc(100% - ${doubleSpacer});
  background-color: ${brandTertiary};
  position: absolute;
  top: 0;
  border-radius: ${borderRadius};
`;

const StepCircle = styled.div`
  height: ${doubleSpacer};
  width: ${doubleSpacer};
  background-color: ${(props: { isCompleted: boolean }) =>
    props.isCompleted ? brandTertiary : lightGray};
  border-radius: ${baseSpacer};
  margin: 0 auto;
  color: ${white};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -14px;
`;

const ItemLabel = styled.p`
  max-width: 72px;
  text-align: center;
  line-height: 1;
  visibility: ${(props: { isCurrentStep: boolean }) =>
    props.isCurrentStep ? 'visible' : 'hidden'};
  @media only screen and (min-width: ${breakpoints.sm}) {
    visibility: visible;
  }
`;

const TimelineProgress: FunctionComponent<TimelineProgressProps> = ({ items, currentStep }) => {
  return (
    <TimelineProgressWrapper>
      <TrackBackground />
      <TrackValue
        percentage={((currentStep - 1) / (items.length - 1)) * 100}
        currentStep={currentStep}
      />
      <FlexContainer justifyContent="space-between">
        {items.map((item, index) => (
          <FlexContainer key={item}>
            <StepCircle isCompleted={currentStep >= index + 1}>
              <small>{index + 1}</small>
            </StepCircle>
            <ItemLabel isCurrentStep={currentStep === index + 1}>
              <small>{item}</small>
            </ItemLabel>
          </FlexContainer>
        ))}
      </FlexContainer>
    </TimelineProgressWrapper>
  );
};

export default TimelineProgress;
