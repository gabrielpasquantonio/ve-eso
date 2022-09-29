import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import CustomTextArea from './CustomTextArea';

describe('<CustomTextArea />', () => {
  test('should render', () => {
    render(<CustomTextArea value onChange />);

    const customTextArea = screen.getByTestId('CustomTextArea');

    expect(customTextArea).toBeInTheDocument();
  });
});
