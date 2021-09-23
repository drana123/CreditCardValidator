import {  API_END, API_ERROR } from './types';

export const apiEnd = label => ({
  type: API_END,
  payload: label
});

export const apiError = error => ({
  type: API_ERROR,
  error
});
