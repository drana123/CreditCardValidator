import axios from 'axios'
import { GET_URL, POST_URL, PUT_URL } from '../constants/apiConfigurationConstants';
export default function callApi(reqType, values, setValues, setResponseObject) {
  console.log(reqType)
  if (reqType === "GET") {
    fetch(GET_URL)
      .then(response => response.json())
      .then((result) => {
        console.log("GET Request")
        setValues(result);
        setResponseObject(result)
        console.log(result)
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      });


  }
  else if (reqType === "PUT") {
    console.log("PUT REQUEST SENT")
    axios.put(PUT_URL, values)
      .then((response) => { console.log(response.data) })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }
  else {
    console.log("POST REQUEST SENT")
    axios.post(POST_URL, values)
      .then((response) => { console.log(response.data) })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }
}


  // export function track(){
  //   console.log("Blah")
  // }

