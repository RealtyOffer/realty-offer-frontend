import React from 'react';

import Row from './Row';
import Column from './Column';
import Box from './Box';
import FlexContainer from './FlexContainer';
import Heading from './Heading';

type CardProps = {
  cardTitle: string;
  cardSubtitle?: string;
  children: any;
}

const Card = (props: CardProps) => (
  <Row>
    <Column md={6} mdOffset={3}>
      <div>
        <Box backgroundAccent>
          <FlexContainer flexDirection="column">
            <Heading styledAs="title" align="center">{props.cardTitle}</Heading>
            {
              props.cardSubtitle && (
                <Heading as="h2" styledAs="subtitle" align="center">{props.cardSubtitle}</Heading>
              )
            }
          </FlexContainer>
          {props.children}
        </Box>
      </div>
    </Column>
  </Row>
);

export default Card;
