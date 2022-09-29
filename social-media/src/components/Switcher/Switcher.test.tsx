import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import Switcher from './Switcher';

describe('<Switcher />', () => {
  test('should render', () => {
    render(<Switcher options optionChecked onChange />);

    const switcher = screen.getByTestId('Switcher');

    expect(switcher).toBeInTheDocument();
  });
});
