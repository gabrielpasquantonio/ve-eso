import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import TwitterPage from './TwitterPage';

describe('<TwitterPage />', () => {
  test('should render', () => {
    render(<TwitterPage />);

    const twitterPage = screen.getByTestId('TwitterPage');

    expect(twitterPage).toBeInTheDocument();
  });
});
