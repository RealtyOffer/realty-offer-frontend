import React from 'react';
import { render, act } from '@testing-library/react';
import BusinessInformation from './BusinessInformation';

test('checkout button is disabled upon initial load', async () => {
  const { getByText } = render(
    <BusinessInformation path="/business-information" />,
  );
  const checkoutButton = getByText('Checkout');
  await act(async () => {});
  expect(checkoutButton.hasAttribute('disabled'));
});
