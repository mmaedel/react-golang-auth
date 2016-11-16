/*********************************************************************
||  Import required modules
*********************************************************************/
import {fromJS, Map} from 'immutable'

/*********************************************************************
||  Define the state tree
*********************************************************************/
export const INITIAL_STATE = fromJS({
  Username: "",
  Password: "",
  IsLoggedIn: false,
  AccountType: "",
  AuthToken: "",
  Email: ""
})

const fetchProjectMetadataURL = 'http://api.lokalna.dev:8080/project'

/*********************************************************************
||  The reducer
*********************************************************************/
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "setUserFieldValue":
      return state.set(action.key, action.value)
    case "setUserCredentials":
      return state.merge(action.credentials)
    case "logout":
      return state.set("IsLoggedIn", false)
  }
  return state;
}

/*********************************************************************
||  Allowed Actions
*********************************************************************/

// Sets a field value
export function setUserFieldValue(key, value) {
  return({
    type: "setUserFieldValue",
    key: key,
    value: value
  })
}

// Deletes the container record at the given index
export function login(creds) {
  var request = {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      "x-authentication": "my little friend"
    }
  }
  return dispatch => {
    fetch("http://api.lokalna.dev:8080/auth/login", request)
      .then( response => response.json())
      .then( json => {
        console.log(json)
        dispatch({type:"setUserCredentials", credentials: json})
      })
  }
}
