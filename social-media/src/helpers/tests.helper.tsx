import React from 'react';
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'store/store';

export function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult {
  return rtlRender(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>,
    options
  );
}

export * from '@testing-library/react';
