import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import CustomButton from './CustomButton';

describe('<CustomButton />', () => {
  test('should render', () => {
    render(<CustomButton text="teste" />);

    const customButton = screen.getByTestId('CustomButton');

    expect(customButton).toBeInTheDocument();
  });
});
