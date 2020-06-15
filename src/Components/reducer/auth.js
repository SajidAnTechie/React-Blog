import actionTypes from "../actions/Types";
const initialState = {
  username: "",
  token: null,
  email: "",
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.authStart:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.authSuccess:
      return {
        ...state,
        token: action.token,
        username: action.username,
        email: action.email,
        loading: false,
        error: null,
      };
    case actionTypes.authFail:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.Logout:
      return {
        ...state,
        username: "",
        token: null,
        email: "",
      };
    default:
      return state;
  }
};

export default authReducer;
