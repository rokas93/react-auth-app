import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants';

import api from '../../shared/api';

export const signupUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });
    const data = await api.signup(user);

    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data.token });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.token });

    localStorage.setItem('user', JSON.stringify(data.token));
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.message });
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const data = await api.login(user);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.token });

    localStorage.setItem('user', JSON.stringify(data.token));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('user');

  dispatch({ type: USER_LOGOUT });
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      login: { user },
    } = getState();

    if (!user) {
      dispatch({ type: USER_DETAILS_FAIL, payload: 'User is not logged' });
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${user}`,
      },
    };

    const data = await api.account(config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
  }
};
