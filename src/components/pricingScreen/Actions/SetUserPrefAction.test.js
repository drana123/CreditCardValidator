import './SetUserPrefAction'
import { setUserPref,setPreference, setPreferenceError ,apiAction } from './SetUserPrefAction';
import { SET_PREF, API, API_ERROR } from './types';


test("Set preference", () => {
    let preference = setPreference("abc");
    expect(preference).toStrictEqual({"type": SET_PREF, "payload": "abc"})
});


test("Error in set preference", () => {
    let errorInSetPreference = setPreferenceError("abc");
    expect(errorInSetPreference).toStrictEqual({"type":API_ERROR,"payload":SET_PREF})
});

describe('should test User Preference Action' , ()=>{
    const responseObject = setUserPref("abc");
    expect(responseObject.type).toEqual(API);
    expect(responseObject.payload.data).toEqual("abc");
    
});

