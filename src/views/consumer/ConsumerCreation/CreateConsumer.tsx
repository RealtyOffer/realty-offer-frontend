import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { FaChevronRight } from 'react-icons/fa';

import {
  Box,
  Button,
  FlexContainer,
  Heading,
  Row,
  Column,
  Seo,
} from '../../../components';


const CreateConsumer: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="Ready to buy or sell a home?" />
    <Row>
      <Column md={6} mdOffset={3}>
        <div>
          <Box backgroundAccent>
            <FlexContainer flexDirection="column">
              <Heading align="center" styledAs="title">Ready to buy or sell a home?</Heading>
              <Heading as="h2" align="center" styledAs="subtitle">No contracts, no obligation, no awkward negotiations</Heading>
            </FlexContainer>
            <Box>
              <Heading as="h3" styledAs="subtitle">Sell My Home</Heading>
              <p>
                Within 24 hours, multiple agents will offer less than commission to sell your home,
                in order to win your business!
              </p>
              <Button
                type="link"
                to="/sell"
                block
                iconRight={<FaChevronRight />}
              >
                Sell Your Home
              </Button>
            </Box>
            <Box>
              <Heading as="h3" styledAs="subtitle">Buy A Home</Heading>
              <p>
                Within 24 hours, multiple agents will offer part of their commission in order to pay
                for your closing costs, in order to win your business!
              </p>
              <Button
                type="link"
                to="/sell"
                block
                iconRight={<FaChevronRight />}
              >
                Buy A Home
              </Button>
            </Box>
            <Box>
              <Heading as="h3" styledAs="subtitle">Buy &amp; Sell A Home</Heading>
              <p>
                Within 24 hours, multiple agents will offer less commission to sell your home,
                or part of their commission to find you a home!
              </p>
              <Button
                type="link"
                to="/sell"
                block
                iconRight={<FaChevronRight />}
              >
                Buy &amp; Sell A Home
              </Button>
            </Box>
          </Box>
        </div>
      </Column>
    </Row>
  </>
);

export default CreateConsumer;
