import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import AddPost from './AddPost';

describe('<AddPost />', () => {
  test('should render', () => {
    render(<AddPost />);

    const addPost = screen.getByTestId('AddPost');

    expect(addPost).toBeInTheDocument();
  });
});
