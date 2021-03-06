import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  address: null,
  phone: null,
  pets: null,
  isVet: null,
  users: [],
  detailUSer: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };
    case "ADD_USERS":
      return { ...state, users: [...action.payload] };
    case "ADD_USER_DETAIL":
      return { ...state, detailUser: action.payload };

    default:
      return state;
  }
}
