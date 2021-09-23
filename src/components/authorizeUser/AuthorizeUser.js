import { useHistory } from "react-router";

export default function AuthorizeUser() {
    
    const history=useHistory();
    var Email= localStorage.getItem("Email");
    var UserRole= localStorage.getItem("userRole");

    if(Email == null)
    {
    history.push("/");
    return(<></>);
    }
    if(Email!=null && UserRole==="risk analyst")
    {
    history.push("/pricingView");
    return(<></>);
    }
}
