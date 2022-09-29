import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  test('should render', () => {
    render(<HomePage />);

    const homePage = screen.getByTestId('HomePage');

    expect(homePage).toBeInTheDocument();
  });
});
