import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import LogOutButton from './LogOutButton';
import {handleLogout} from "./LogOutButton";

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";




// export   const LogoutButton = () => {
//     const { instance } = useMsal();

//     const handleLogout = (logoutType) => {
//         if (logoutType === "popup") {
//             instance.logoutPopup({
//                 postLogoutRedirectUri: "/",
//                 mainWindowRedirectUri: "/"
//             });
//         } else if (logoutType === "redirect") {
//             instance.logoutRedirect({
//                 postLogoutRedirectUri: "/",
//             });
//         }
//     }
//     return (
//       <button  data-testid = "logOutButtonTest" onClick={() => handleLogout("popup")}   variant="contained" color="primary" className="button">
//                   Sign out 
//                   </button>
//     );
// };
function Navbar() {
  // const [sidebar, setSidebar] = useState(true);

  // const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
    <IconContext.Provider value={{ color: '#fff' }} data-testid="navTest">
      {/* <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div> */}
      <div className='navbar' data-testid="navDivTest"> 
       <LogOutButton handleLogout={handleLogout} data-testid = "button"/>
      <nav className= 'nav-menu active' data-testid="stylingNavTest">
        <ul className='nav-menu-items' data-testid="listTest">
          <li className='navbar-toggle' data-testid="listItemTest">
            <div className = 'menu-bars' data-testid="menuBarDivTest">
            
            <FaIcons.FaBars  />
            
            </div>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName} data-testid = {item.testId}>
                <Link to={item.path}>
                  {item.icon}
                  <span id = "spanID">{item.title}</span>
                </Link>
              </li>
            );
          })}
          
        </ul>
      </nav>
      </div>
    </IconContext.Provider>
  </>
  );
}

export default Navbar;

