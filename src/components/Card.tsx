import React, { FunctionComponent } from 'react';

import Row from './Row';
import Column from './Column';
import Box from './Box';
import FlexContainer from './FlexContainer';
import Heading from './Heading';

type CardProps = {
  cardTitle: string;
  cardSubtitle?: string;
  fullWidth?: boolean;
};

const Card: FunctionComponent<CardProps> = ({ cardTitle, cardSubtitle, children, fullWidth }) => (
  <div>
    <Box backgroundAccent>
      <Row>
        <Column md={fullWidth ? 12 : 6} mdOffset={fullWidth ? 0 : 3}>
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
        </Column>
      </Row>
    </Box>
  </div>
);

export default Card;
