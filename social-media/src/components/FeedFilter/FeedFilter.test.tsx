import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import FeedFilter from './FeedFilter';

describe('<FeedFilter />', () => {
  test('should render', () => {
    render(<FeedFilter selectedMode />);

    const feedFilter = screen.getByTestId('FeedFilter');

    expect(feedFilter).toBeInTheDocument();
  });
});
