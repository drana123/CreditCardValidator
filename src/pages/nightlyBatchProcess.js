import React, { Fragment } from 'react';
import '../components/NightlyBatch/Grid.css'
import Navbar from '../components/NavBar/Navbar';
import {useHistory} from 'react-router-dom';
import CollapsibleTable from "../components/NightlyBatch/NightlyBatchTable";
function NightlyBatchProcess() 
{
  const history=useHistory();
  var Email= localStorage.getItem("Email");
  var UserRole= localStorage.getItem("userRole");

  if(Email == null)
 {
   history.push("/");
return(<></>);
}
            if(Email!=null && UserRole != "admin")
            {
                history.push("/pricingView");
        return(<></>);

            }
  
  
  return (

  
<div data-testid ="nightlyBatchTest">
  <div data-testid ="navDataTest">
       <Navbar/>
       </div>
       <h3 className = 'h3' data-testid="headingTest"> Nightly Batch Process </h3>
    <div className='home' data-testid="gridDataTest">
   
      < CollapsibleTable/>
    </div>

</div>
          );}

export default NightlyBatchProcess;







