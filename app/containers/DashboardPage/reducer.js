/*
 *
 * InstituteStuff reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_INSTITUTE,
  CREATE_INSTITUTE_SUCCESS,
  CREATE_INSTITUTE_ERROR
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
});
function dashboardPageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_INSTITUTE:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case CREATE_INSTITUTE_SUCCESS:
    console.log('response------------', action.response);
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case CREATE_INSTITUTE_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default dashboardPageReducer;
