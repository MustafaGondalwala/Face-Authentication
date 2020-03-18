import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});


export const login = user => dispatch =>{  
  console.log(user)
    localStorage.FaceIdentification = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
}

export const logout = () => dispatch => {
  localStorage.removeItem("FaceIdentification");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};
