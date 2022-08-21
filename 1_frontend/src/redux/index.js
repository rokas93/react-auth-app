import { combineReducers } from 'redux';
import {
  userDetailsReducer,
  userLoginReducer,
  userSignupReducer,
} from './reducers/userReducer';

export const reducer = combineReducers({
  signup: userSignupReducer,
  login: userLoginReducer,
  userDetails: userDetailsReducer,
});

const tokenFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : undefined;

export const initialState = {
  login: {
    user: tokenFromStorage,
  },
};

console.log(initialState);
