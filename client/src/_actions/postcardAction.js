import axios from 'axios';

import {
  FETCH_POSTCARDS,
  UPLOAD_POSTCARD,
  HIDE_ADD_BTN,
  FIX_SCROLLBAR,
  MODAL_POSTCARD,
} from './types';

export const fetchPostcards = () => async (dispatch) => {
  const res = await axios.get('/api/postcards');

  dispatch({ type: FETCH_POSTCARDS, payload: res.data.reverse() });
};

export const uploadPostcard = (dataToSubmit, history) => async (dispatch) => {
  const res = await axios.post('/api/postcards/upload', dataToSubmit, {
    header: { 'content-type': 'multipart/form-data' },
  });

  history.push('/postcards');
  dispatch({ type: UPLOAD_POSTCARD, payload: res.data });
};

export const hideAddBtn = (changeAction) => (dispatch) => {
  dispatch({ type: HIDE_ADD_BTN, payload: changeAction });
};

export const fixScrollbar = (changeAction) => (dispatch) => {
  dispatch({ type: FIX_SCROLLBAR, payload: changeAction });
};

export const modalPostcard = (changeAction) => (dispatch) => {
  console.log('modal postcard', changeAction);
  dispatch({ type: MODAL_POSTCARD, payload: changeAction });
};
