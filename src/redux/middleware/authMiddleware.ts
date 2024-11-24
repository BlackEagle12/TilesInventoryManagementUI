// authMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../reducer';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const authMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  // Check if the action is an API call
  if (action.type.endsWith('/pending')) {
    const token = cookies.get('auth-session');

    // Check if the action payload contains a request object
    if (action.meta?.arg?.fetch && token) {
      // Modify headers to include Authorization
      action.meta.arg.fetch.headers = {
        ...action.meta.arg.fetch.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return next(action);
};
