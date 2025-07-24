import { getParsedLocalStorage } from "../utils/localStorageUtils";

const initialState = {
  authData: getParsedLocalStorage("profile"),
  loading: false,
  error: false,
  updateLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };

    case "AUTH_SUCCESS":
      if (action?.data) {
        localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      }
      return { ...state, authData: action.data, loading: false, error: false };

    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };

    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false };

    case "UPDATING_SUCCESS":
      console.log("✅ Reducer received updated user data:", action.data);
      localStorage.setItem("profile", JSON.stringify(action.data));
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        error: false,
      };

    case "UPDATING_FAIL":
      return { ...state, updateLoading: false, error: true };

    case "LOG_OUT":
      console.log("🚪 Logging out and clearing localStorage.");
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
        updateLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
