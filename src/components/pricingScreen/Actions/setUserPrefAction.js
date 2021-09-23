import { SET_PREF, API, API_ERROR } from './types';
import {addUserPreferenceUrl} from './apiUrlEndPoints';
export function setUserPref(data) { 
  return apiAction({
  
    url : addUserPreferenceUrl,
    data: data,
    onSuccess: setPreference,
    onFailure: setPreferenceError,
    label: SET_PREF
  });
}

export function setPreference(data) {
  return {
    type: SET_PREF,
    payload: data
  };
}
export function setPreferenceError(data) {
  return {
    type: API_ERROR,
    payload: SET_PREF
  };
}

export function apiAction({
  url,
  method = 'POST',
  data,
  onSuccess = () => {},
  onFailure = () => {},
  label
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label
    }
  };
}