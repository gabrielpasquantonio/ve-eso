import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import ContainerToast from './ContainerToast';

describe('<ContainerToast />', () => {
  test('deve montar', () => {
    render(<ContainerToast />);

    const containerToast = screen.getByTestId('ContainerToast');

    expect(containerToast).toBeInTheDocument();
  });
});
