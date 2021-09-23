import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

export const handleLogout = (instance, storage) => {
    
    storage.clear();
    instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/"
    });

}

  const LogOutButton = (props) => {
    const { instance } = useMsal();

    
    return (
      <button  data-testid = "logOutButtonTest" onClick={()=>{props.handleLogout(instance, localStorage)}}   variant="contained" color="primary" className="button">
                  Sign out 
                  </button>
    );
};

export default LogOutButton;