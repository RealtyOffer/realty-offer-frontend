import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { Button, Card, FlexContainer, Seo } from '../components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotFoundPage = (_: RouteComponentProps) => (
  <>
    <Seo title="404: Not found" />
    <Card cardTitle="404: Page Not Found">
      <FlexContainer>
        <p>
          We could not find the page you were looking for. Please try again or visit the home page.
        </p>
        <Button type="link" to="/" color="primary">
          Home
        </Button>
      </FlexContainer>
    </Card>
  </>
);

export default NotFoundPage;
