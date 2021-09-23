import {msalConfig , loginRequest , graphConfig} from './authConfig';
import {ourClientId, ourAuthority, ourRedirectUri, ourGraphMeEndpoint} from './constants/authConfigConstants';

describe('Handles data provided in authConfig' , ()=>{
    test('should test contents of auth' , ()=>{
        expect(msalConfig.auth).toEqual(
            {
                clientId: ourClientId,
                authority: ourAuthority,
                // redirectUri: "https://ase-price-frontend-intg-01.azurewebsites.net",
                navigateToLoginRequestUrl: true,
                //redirectUri : ourRedirectUri
            }
        );
    });

    test('should test contents of cache' , ()=>{
        expect(msalConfig.cache).toEqual(
            {
                cacheLocation: "sessionStorage", 
                storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
            }
        );
    });
    
});

describe('Handles Callback function' , ()=>{
    const LogLevel = {
        Error : 0,
        Warning : 1,
        Info : 2,
        Verbose : 3
    }
    test('should return error message when level is 0' , ()=>{
        console.error = jest.fn();
        msalConfig.system.loggerOptions.loggerCallback(0,"Error Has Occured", false);
        expect(console.error).toHaveBeenCalledWith('Error Has Occured');
    });

    test('should return Warning message when level is 1' , ()=>{
        console.warn = jest.fn();
        msalConfig.system.loggerOptions.loggerCallback(1,"System Needs Help", false);
        expect(console.warn).toHaveBeenCalledWith('System Needs Help');
    });

    test('should return Information message when level is 2' , ()=>{
        console.info = jest.fn();
        msalConfig.system.loggerOptions.loggerCallback(2,"Information is logged", false);
        expect(console.info).toHaveBeenCalledWith('Information is logged');
    });


    test('should return debug message when level is 3' , ()=>{
        console.debug = jest.fn();
        msalConfig.system.loggerOptions.loggerCallback(3,"Information is logged", false);
        expect(console.debug).toHaveBeenCalledWith('Information is logged');
    });
    test('should return undefined when containsPii is true' , ()=>{
        const value = msalConfig.system.loggerOptions.loggerCallback(3,"Information is logged", true);
        expect(value).toEqual(undefined);
    });
    
});

describe('Handles data provided in login Request' , ()=>{
    test('should return the same content as in login request object' , ()=>{
        expect(loginRequest.scopes).toEqual(["User.Read"]);
    });
});


describe('Handles data provided in graph Config' , ()=>{
    test('should return the same content as in graph Config object' , ()=>{
        expect(graphConfig.graphMeEndpoint).toEqual(ourGraphMeEndpoint);
    });
});
