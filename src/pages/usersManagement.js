import React from 'react';
import Grid from '../components/grid/Grid';
import Navbar from '../components/NavBar/Navbar';
import '../components/grid/Grid.css'
import { useHistory } from 'react-router-dom';

function UsersManagement() {

  const history = useHistory();
  var Email = localStorage.getItem("Email");
  var UserRole = localStorage.getItem("userRole");

  if (Email == null) {
    history.push("/");
    return (<>
    </>
    );
  }


  if (Email !== null && UserRole !== "admin") {

    history.push("/pricingView");
    return (<>
    </>
    );

  }

  return (
    
    <div data-testid="usersPage">
      <div data-testid="navBar">
        <Navbar />
      </div>
      <h3 className='h3'>User Management</h3>
      <div className='home'>
        <div data-testid="usersGrid">
          <Grid />
        </div>
      </div>
    </div>
  );

}

export default UsersManagement;