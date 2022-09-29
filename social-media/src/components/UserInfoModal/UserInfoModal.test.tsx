import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import UserInfoModal from './UserInfoModal';

describe('<UserInfoModal />', () => {
  test('should render', () => {
    render(<UserInfoModal onCloseModal userId />);

    const userInfoModal = screen.getByTestId('UserInfoModal');

    expect(userInfoModal).toBeInTheDocument();
  });
});
