import { ERROR_PRODUCT, GET_ALL_PRODUCT, SET_NAME, SET_PAGE } from "./types";
import { get } from "../../services/product";
import debounce from "debounce-promise";

const debouncedGet = debounce(get, 250);

const setName = (name) => {
  return {
    type: SET_NAME,
    name,
  };
};

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGet = (allData, totalPage) => {
  return {
    type: GET_ALL_PRODUCT,
    allData,
    totalPage,
  };
};

const setError = (error) => {
  return {
    type: ERROR_PRODUCT,
    error,
  };
};

const fetchProduct = (id) => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().productReducers?.page || 1,
      limit: getState().productReducers?.limit || 25,
      name: getState().productReducers?.name || "",
    };

    const response = await debouncedGet(
      id,
      params?.page,
      params?.limit,
      params?.name
    );
    if (response?.data?.statusCode === 200) {
      dispatch(setGet(response?.data?.data, response?.data?.totalPage));
    } else {
      dispatch(setError(response));
    }
  };
};

export { fetchProduct, setName, setPage };
