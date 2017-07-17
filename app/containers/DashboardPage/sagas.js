import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { CREATE_INSTITUTE } from './constants';
import { instituteCreated, instituteCreateError } from './actions';

import request from 'utils/request';
// Individual exports for testing

export function* createInstitute() {
	const headers = {
    method: 'GET',
    body: {"client_id":"BhLYZ8OAi1MuVOsqyGIwnswTaar9cZiM","client_secret":"2xMpbUHIa9w0APcSJmGcmN9a5m9-bVdD6ZUwYNgyHYSvIScMEF8bBoY-4dHcnfcp","audience":"https://rajiv.au.auth0.com/api/v2/","grant_type":"client_credentials"},
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const requestURL = `https://rajiv.au.auth0.com/api/v2/users`;
 

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL, headers);
    yield put(instituteCreated(repos, username));
  } catch (err) {
    yield put(instituteCreateError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* defaultSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(CREATE_INSTITUTE, createInstitute);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
