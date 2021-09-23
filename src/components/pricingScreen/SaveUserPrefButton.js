import {connect} from 'react-redux';
import {setUserPref} from './Actions/setUserPrefAction';
import {updateUserPrefAction} from './Actions/updateUserPrefAction';
import { SET_PREF } from './Actions/types';
import Button from '@material-ui/core/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SuccessNotification , ErrorNotification} from './Notification';
import React from 'react';
export function SaveUserPrefButton({CurrentUserDefinedStates ,isHavingPreference,loadingStatus,ErrorStatus ,handleSavePreference,handleUpdatePreference,resetSavePrefStatus}) {

  return (
    <div>
        <Button data-testid = {"savePrefBtn"}
                 variant="contained" color="primary" onClick = {()=>{     
                const userPreferenceString = JSON.stringify(CurrentUserDefinedStates); 
                const email = localStorage.getItem("Email");
                if (isHavingPreference === 0)
                {
                  handleSavePreference({emailId : email , gridConfig : userPreferenceString});
                }
                else
                {
                  const userId = localStorage.getItem("Id");
                  handleUpdatePreference({emailId : email , gridConfig : userPreferenceString , id : userId});
                }
                if (loadingStatus.saveUserLoadingStatus ===  true) 
                {
                  if (ErrorStatus.saveUserErrorStatus === false) 
                  SuccessNotification("Preferences saved");
                  else 
                  ErrorNotification("Error in saving preferences");

                  resetSavePrefStatus();
                }
            }}>
                Save Preference
        </Button>
        <ToastContainer/>
    </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSavePreference : (data) => {
          dispatch(setUserPref(data))
        },
        handleUpdatePreference : (data) => {
          dispatch(updateUserPrefAction(data))
        },
        resetSavePrefStatus : () => {
          dispatch({type : "RESET_SAVE_PREF" , payload : SET_PREF});
        },
    }
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(SaveUserPrefButton);