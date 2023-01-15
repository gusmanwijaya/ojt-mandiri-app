import { GET_ALL_PRODUCT, SET_NAME, SET_PAGE, ERROR_PRODUCT } from "./types";

const initialState = {
  name: "",
  page: 1,
  limit: 25,
  totalPage: 1,
  allData: [],
  error: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      return {
        ...state,
        allData: action.allData,
        totalPage: action.totalPage,
      };

    case ERROR_PRODUCT:
      return {
        ...state,
        error: action.error,
      };

    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    default:
      return state;
  }
};

export default reducers;
