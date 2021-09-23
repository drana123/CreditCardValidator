import React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useForm } from "../hooks/useForm"
import { Form } from "../Controls/Form"
import Button from '../Controls/Button';
import Input from '../Controls/Input';
import './apiConfiguration.css'
import axios from 'axios';
import SimpleMenu , {handleClick} from '../Controls/Menu';
import { GET_URL, POST_URL, PUT_URL } from '../constants/apiConfigurationConstants';
import Navbar from '../components/NavBar/Navbar';
import { useHistory } from 'react-router';
import callApi from './callApi'
const modelObject = {
  apiEndpointId: '',
  apiEndpointUrl: '',
  region: '',
  symbols: '',
  apiHost: '',
  apiKey: '',
  frequency: 'Daily'

};
const modelObjectRef = {
  apiEndpointId: '',
  apiEndpointUrl: '',
  region: '',
  symbols: '',
  apiHost: '', 
  apiKey: '',
  frequency: 'Daily'

};


export function ApiConfiguration() {
  const {
    values,
    setValues,
    handleInputChange,
    resetForm
  } = useForm(modelObject);
  // const callApi = wrapperCallApi;
  const handleSubmit = e => {
    e.preventDefault();
    // send request 
    // console.log(values)
    if (responseObject.apiEndpointId === "") {
      callApi("POST", values, setValues, setResponseObject);
    }
    else {
      callApi("PUT",values,setValues,setResponseObject);
    }

  }


  const [responseObject, setResponseObject] = useState(modelObjectRef)
  useEffect(() => {
    // console.log("hit")
    callApi("GET", values, setValues, setResponseObject);

  }, [])

  const history = useHistory();
  var Email = localStorage.getItem("Email");
  var UserRole = localStorage.getItem("userRole");

  if (Email == null) {
    history.push("/");
    return (<>
    </>
    );
  }

  if (Email != null && UserRole != "admin") {

    history.push("/pricingView");
    return (<>
    </>
    );

  }

  //console.log(requestType)
  return (
    <div data-testid="unique">
    <Navbar/>
    <div class="center" >
      <h1>API Configuration</h1>
      <Form onSubmit={handleSubmit}>
        <Grid class container>
          <Grid item justifyContent="center" xs={12}>
            <Input datatestid="endpointInput" name="apiEndpointId" label ="API Endpoint Id" value={values.apiEndpointId} onChange={handleInputChange} />
            <Input name="apiEndpointUrl" label="Endpoint URL" value={values.apiEndpointUrl} onChange={handleInputChange} />
            <Input name="region" label="Region" value={values.region} onChange={handleInputChange} />
            <Input name="symbols" label="Symbols *Enter comma separated symbols" value={values.symbols} onChange={handleInputChange} />
            <Input name="apiHost" label="API Host" value={values.apiHost} onChange={handleInputChange} />
            <Input name="apiKey" label="API Key" value={values.apiKey} onChange={handleInputChange} /><br />
            <SimpleMenu menuNameValue={values.frequency} handleClick = {handleClick} />
            <Button type="submit" text="Submit" onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Form>
    </div>
    </div>
  );
}
