import actionTypes from "./Types";
import axios from "axios";

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("email");
  return {
    type: actionTypes.Logout,
  };
};

const checkTimeout = (expirationTime) => {
  return (dispatch) => {
    setInterval(() => {
      dispatch(Logout());
    }, expirationTime * 1000);
  };
};
const authStart = () => {
  return {
    type: actionTypes.authStart,
  };
};

const authSuccess = (token, username, email) => {
  return {
    type: actionTypes.authSuccess,
    token,
    username,
    email,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.authFail,
    error,
  };
};

export const auth = (Email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: Email,
      passwordHash: password,
    };
    axios
      .post("http://localhost:5000/api/v1/auth/login", authData)
      .then((response) => {
        console.log(response.data);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expireIn * 1000
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("email", response.data.email);
        dispatch(
          authSuccess(
            response.data.token,
            response.data.username,
            response.data.email
          )
        );
        dispatch(checkTimeout(response.data.expireIn));
      })
      .catch((error) => {
        console.log(error.response.data.error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(Logout());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationDate"));
      if (expirationTime <= new Date()) {
        dispatch(Logout());
      } else {
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        dispatch(authSuccess(token, username, email));
        dispatch(
          checkTimeout((expirationTime.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
