import { FETCH_PREF, API, API_ERROR } from './types';
import { fetchUserPreferenceUrl } from './apiUrlEndPoints';
export function fetchUserPref(data) {
  let query = '?email=' + data;
  return apiAction({

    url: fetchUserPreferenceUrl + query,
    data: null,
    onSuccess: fetchPreference,
    onFailure: fetchUserPrefError,
    label: FETCH_PREF
  });
}

export function fetchUserPrefError(error) {
  console.log("error in fetching user pref", error);
  return {
    type: API_ERROR,
    payload: FETCH_PREF
  }
}

export function fetchPreference(data) {
  if(data===undefined || data.id===undefined || data.gridConfig===undefined) {
    return {
      type : API_ERROR,
      payload : FETCH_PREF
  }
 }
  localStorage.setItem("Id", data.id);
  let obj = {
    type: FETCH_PREF,
    payload: {
      id : data.id,
       email : data.emailId,
       preference : data.gridConfig!=="" ? JSON.parse(data.gridConfig) : {}
    } 
  };
  return obj;
}

function apiAction({
  url,
  method = 'GET',
  data,
  onSuccess = () => { },
  onFailure = () => { },
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