import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import CustomToast from './CustomToast';

describe('<CustomToast />', () => {
  test('deve montar', () => {
    render(<CustomToast isOpen />);

    const customToast = screen.getByTestId('CustomToast');

    expect(customToast).toBeInTheDocument();
  });
});
