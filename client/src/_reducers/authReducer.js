import { AUTH_USER } from '../_actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.payload || false;
    default:
      return state;
  }
};
