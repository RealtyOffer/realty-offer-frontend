import React, { FunctionComponent } from 'react';
import creditCardType from 'credit-card-type';
import styled from 'styled-components';
import PaymentIcon from 'react-payment-icons';

import { FlexContainer } from '.';
import { halfSpacer, baseSpacer, doubleSpacer, breakpoints } from '../styles/size';
import { darkGray, white } from '../styles/color';
import { z1Shadow } from '../styles/mixins';
import { fontFamilyMonospace } from '../styles/typography';
import { unformattedCreditCardValue } from '../utils/creditCard';

type CreditCardProps = {
  values: {
    cardNumber: string;
    cardExpirationMonth: string;
    cardExpirationYear: string;
    cardholderName: string;
  };
};

const getBgColor = (value: string) => {
  switch (value) {
    case 'mastercard':
      return 'rgb(23, 71, 122)';
    case 'visa':
      return 'rgb(59, 89, 165)';
    case 'amex':
      return 'rgb(17, 121, 167)';
    case 'discover':
      return 'rgb(243, 130, 49)';
    case 'generic':
    default:
      return darkGray;
  }
};

export const getCreditCardIconType = (accountType: string) => {
  switch (accountType) {
    case 'mastercard':
      return 'mastercard';
    case 'visa':
      return 'visa';
    case 'american-express':
      return 'amex';
    case 'discover':
      return 'discover';
    default:
      return 'generic';
  }
};

export const getCreditCardType = (value: string) => {
  const card = creditCardType(value);
  return value.length > 2 && card[0] ? card[0].type : 'generic';
};

const StyledCreditCard = styled.div`
  border-radius: ${halfSpacer};
  font-family: ${fontFamilyMonospace};
  color: ${white};
  background-color: ${(props: { cardColor: string }) => getBgColor(props.cardColor)};
  box-shadow: ${z1Shadow};
  position: relative;
  width: 100%;
  margin: 0 auto ${doubleSpacer};
  padding-top: 62.962963%; /* 2.125 in x 3.375 Aspect Ratio */
`;

const StyledCreditCardInner = styled.div`
  position: absolute;
  top: ${baseSpacer};
  left: ${baseSpacer};
  right: ${baseSpacer};
  bottom: ${baseSpacer};
  @media only screen and (min-width: ${breakpoints.md}) {
    top: ${doubleSpacer};
    left: ${doubleSpacer};
    right: ${doubleSpacer};
    bottom: ${doubleSpacer};
  }
`;

const CreditCard: FunctionComponent<CreditCardProps> = ({ values }) => {
  const unformattedCardValue = unformattedCreditCardValue(values.cardNumber);
  return (
    <StyledCreditCard cardColor={getCreditCardIconType(getCreditCardType(unformattedCardValue))}>
      <StyledCreditCardInner>
        <FlexContainer
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
          height="100%"
        >
          <PaymentIcon
            id={getCreditCardIconType(getCreditCardType(unformattedCardValue))}
            style={{ width: 100 }}
          />
          <div style={{ width: '100%' }}>
            <FlexContainer justifyContent="space-between">
              <div>
                {values.cardNumber.toString().replace(/[0-9]/g, '*')}
                &nbsp;
              </div>
              <div>
                {values.cardExpirationMonth || 'XX'}/{values.cardExpirationYear || 'XX'}
              </div>
            </FlexContainer>
          </div>
          <div>{values.cardholderName}</div>
        </FlexContainer>
      </StyledCreditCardInner>
    </StyledCreditCard>
  );
};

export default CreditCard;
