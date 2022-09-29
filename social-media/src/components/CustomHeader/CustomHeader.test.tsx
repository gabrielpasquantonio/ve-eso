import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import CustomHeader from './CustomHeader';

describe('<CustomHeader />', () => {
  test('should render', () => {
    render(<CustomHeader />);

    const customHeader = screen.getByTestId('CustomHeader');

    expect(customHeader).toBeInTheDocument();
  });
});
