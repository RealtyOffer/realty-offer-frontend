import React, { useState, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RouteComponentProps } from '@reach/router';
import { Button, FlexContainer, Heading, Card, Seo, ClientOnly } from '../../../components';
import { updateAgentProfile } from '../../../redux/ducks/agent';
import { RootState } from '../../../redux/ducks';
import { ActionResponseType } from '../../../redux/constants';

const ConfirmPayment: FunctionComponent<RouteComponentProps> = () => {
  const [confirmed, setConfirmed] = useState(false);
  const agent = useSelector((state: RootState) => state.agent);
  const dispatch = useDispatch();

  const fakeConfirmPayment = () => {
    dispatch(
      updateAgentProfile({
        id: agent.id,
        agentId: agent.agentId,
        brokerName: agent.brokerName,
        brokerPhoneNumber: agent.brokerPhoneNumber,
        cities: agent.signupData.cities,
        genderId: 0,
        agentLanguages: [],
        aboutMe: '',
        certificates: '',
      })
    ).then((response: ActionResponseType) => {
      if (response && !response.error) {
        setConfirmed(true);
      }
    });
  };

  return (
    <ClientOnly>
      <Card
        cardTitle={confirmed ? 'Confirmed' : 'Confirm Payment'}
        cardSubtitle={
          confirmed ? 'You have successfully completed your profile!' : 'Total Amount Due:'
        }
      >
        <Seo title="Confirm Payment" />
        {confirmed ? (
          <FlexContainer height="100px">
            <Button type="link" to="/agent/listings/new">
              Get Started
            </Button>
          </FlexContainer>
        ) : (
          <FlexContainer justifyContent="center" flexDirection="column">
            <Heading as="h2">$2,388</Heading>
            <p>Will be paid from Card ending in: 9876</p>
            <Button type="button" color="primary" block onClick={() => fakeConfirmPayment()}>
              Confirm Payment
            </Button>
            <FlexContainer height="100px">
              <small>
                By clicking &quot;Confirm Payment&quot;, I agree to the{' '}
                <a href="/terms" target="_blank">
                  Terms &amp; Conditions
                </a>
                .
              </small>
            </FlexContainer>
          </FlexContainer>
        )}
      </Card>
    </ClientOnly>
  );
};

export default ConfirmPayment;
