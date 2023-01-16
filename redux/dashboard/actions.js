import { ERROR_DASHBOARD, GET_ALL_DASHBOARD } from "./types";
import { get } from "../../services/dashboard";
import debounce from "debounce-promise";

const debouncedGet = debounce(get, 250);

const setGet = (registered, notRegistered) => {
  return {
    type: GET_ALL_DASHBOARD,
    registered,
    notRegistered,
  };
};

const setError = (error) => {
  return {
    type: ERROR_DASHBOARD,
    error,
  };
};

const fetchDashboard = () => {
  return async (dispatch) => {
    const response = await debouncedGet();
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGet(
          response?.data?.data?.registered,
          response?.data?.data?.notRegistered
        )
      );
    } else {
      dispatch(setError(response));
    }
  };
};

export { fetchDashboard };
