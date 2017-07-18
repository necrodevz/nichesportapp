/*
 *
 * InstituteStuff actions
 *
 */

import {
  CREATE_INSTITUTE,
  CREATE_INSTITUTE_SUCCESS,
  CREATE_INSTITUTE_ERROR
} from './constants';

export function createInstitute() {
  return {
    type: CREATE_INSTITUTE,
  };
}

export function instituteCreated(repos, username) {
  return {
    type: CREATE_INSTITUTE_SUCCESS,
    repos,
    username,
  };
}

export function instituteCreateError(error) {
  return {
    type: CREATE_INSTITUTE_ERROR,
    error,
  };
}
