import { GET_ALL_DASHBOARD, ERROR_DASHBOARD } from "./types";

const initialState = {
  registered: 0,
  notRegistered: 0,
  error: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DASHBOARD:
      return {
        ...state,
        registered: action.registered,
        notRegistered: action.notRegistered,
      };

    case ERROR_DASHBOARD:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducers;
