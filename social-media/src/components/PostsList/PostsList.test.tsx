import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import PostsList from './PostsList';

describe('<PostsList />', () => {
  test('should render', () => {
    render(<PostsList />);

    const postslist = screen.getByTestId('PostsList');

    expect(postslist).toBeInTheDocument();
  });
});
