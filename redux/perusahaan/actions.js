import {
  ERROR_PERUSAHAAN,
  GET_ALL_PERUSAHAAN,
  SET_PAGE,
  SET_SEARCH,
} from "./types";
import { get } from "../../services/perusahaan";
import debounce from "debounce-promise";

const debouncedGet = debounce(get, 1000);

const setSearch = (search) => {
  return {
    type: SET_SEARCH,
    search,
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
    type: GET_ALL_PERUSAHAAN,
    allData,
    totalPage,
  };
};

const setError = (error) => {
  return {
    type: ERROR_PERUSAHAAN,
    error,
  };
};

const fetchPerusahaan = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().perusahaanReducers?.page || 1,
      limit: getState().perusahaanReducers?.limit || 25,
      search: getState().perusahaanReducers?.search || "",
    };

    const response = await debouncedGet(
      params?.page,
      params?.limit,
      params?.search
    );
    if (response?.data?.statusCode === 200) {
      dispatch(setGet(response?.data?.data, response?.data?.totalPage));
    } else {
      dispatch(setError(response));
    }
  };
};

export { fetchPerusahaan, setSearch, setPage };
