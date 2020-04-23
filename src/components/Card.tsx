import React, { FunctionComponent } from 'react';

import Row from './Row';
import Column from './Column';
import Box from './Box';
import FlexContainer from './FlexContainer';
import Heading from './Heading';

type CardProps = {
  cardTitle: string;
  cardSubtitle?: string;
};

const Card: FunctionComponent<CardProps> = ({ cardTitle, cardSubtitle, children }) => (
  <Row>
    <Column md={6} mdOffset={3}>
      <div>
        <Box backgroundAccent>
          <FlexContainer flexDirection="column">
            <Heading styledAs="title" align="center">
              {cardTitle}
            </Heading>
            {cardSubtitle && (
              <Heading as="h2" styledAs="subtitle" align="center">
                {cardSubtitle}
              </Heading>
            )}
          </FlexContainer>
          {children}
        </Box>
      </div>
    </Column>
  </Row>
);

export default Card;
