import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import PostCard from './PostCard';

describe('<PostCard />', () => {
  test('should render', () => {
    render(<PostCard />);

    const postCard = screen.getByTestId('PostCard');

    expect(postCard).toBeInTheDocument();
  });
});
