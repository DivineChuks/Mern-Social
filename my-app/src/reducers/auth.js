import { REGISTER_SUCCESS, REGISTER_FAILURE } from "../action/types";

const initialState = {
  loading: true,
  isAuthenticated: null,
  user: null,
  token: localStorage.getItem("token"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        ...action.payload
        
      };
    case REGISTER_FAILURE:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        loading: true,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
