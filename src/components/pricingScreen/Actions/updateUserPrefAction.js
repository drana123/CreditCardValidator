import { UPDATE_PREF, API, API_ERROR } from './types';
import {updateUserPreferenceeUrl} from './apiUrlEndPoints';
export function updateUserPrefAction(data) { 
  return apiAction({

    url : updateUserPreferenceeUrl,
    data: data,
    onSuccess: updatePreference,
    onFailure: updatePreferenceError,
    label: UPDATE_PREF
  });
}

export function updatePreference(data) {
  
  return {
    type: UPDATE_PREF,
    payload: data
  };
}
export function updatePreferenceError(data) {
  return {
    type: API_ERROR,
    payload: UPDATE_PREF
  };
}

function apiAction({
  url,
  method = 'PUT',
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