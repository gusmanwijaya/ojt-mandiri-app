import {
  ERROR_PERUSAHAAN,
  GET_ALL_PERUSAHAAN,
  SET_PAGE,
  SET_SEARCH,
} from "./types";

const initialState = {
  search: "",
  page: 1,
  limit: 25,
  totalPage: 1,
  allData: [],
  error: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PERUSAHAAN:
      return {
        ...state,
        allData: action.allData,
        totalPage: action.totalPage,
      };

    case ERROR_PERUSAHAAN:
      return {
        ...state,
        error: action.error,
      };

    case SET_SEARCH:
      return {
        ...state,
        search: action.search,
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
