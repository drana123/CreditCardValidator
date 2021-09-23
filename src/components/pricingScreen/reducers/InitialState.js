import { Email } from "@material-ui/icons";
import setDefaultpreferences from "./setDefaultpreferences"

const InitialState = {
    rows : [],
    preference : setDefaultpreferences(),
    loadingStatus :  {
       marketPriceLoadingStatus : false,
       userPrefLoadingStatus : false,
       saveUserLoadingStatus : false,
    },
    ErrorStatus : {
      marketPriceErrorStatus : false,
      userPrefErrorStatus : false,
      saveUserErrorStatus : false,
    },
    isHavingPreference : 0  
}

export default InitialState;

