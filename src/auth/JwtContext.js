import PropTypes from "prop-types";
import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
// utils
import axios from "../utils/axios";
import localStorageAvailable from "../utils/localStorageAvailable";
//
import { isValidToken, setSession } from "./utils";
import { http } from "../_apiConfig/http";
import {
  fromDate,
  fromDefaulDate,
  toDate,
  toDefaultDate,
} from "../components/date-input/FromDateToDate";
import { userService } from "../_services/userControllerService";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // const response = await axios.get("/api/account/my-account");

        const { user } = [];

        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  // const clearLocalStorageAtMidnight = () => {
  //   const now = new Date();
  //   const hours = now.getHours();
  //   const minutes = now.getMinutes();
  //   const seconds = now.getSeconds();

  //   // Check if it's midnight (00:00:00)
  //   if (hours == 17 && minutes == 0 && seconds == 0) {
  //     // Clear the local storage
  //     localStorage.clear();
  //     console.log("Local storage cleared at midnight");
  //   }
  // };

  useEffect(() => {
    initialize();
    // clearLocalStorageAtMidnight();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password, ip) => {
    const response = await http.post(
      "/T247ApiAnalytics/api/user-login",
      {
        email_id: email,
        password: password,
        ip_address: ip,
      },
      false
    );

    const { token, company_name, user_id, user_email_service_query_id } =
      response.Data;
    localStorage.removeItem("dashboardStatics");
    localStorage.setItem("user_name", company_name);
    localStorage.setItem(
      "user_email_service_query_id",
      user_email_service_query_id
    );
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("from_date", fromDefaulDate());
    localStorage.setItem("to_date", toDefaultDate());

    setSession(token);

    dispatch({
      type: "LOGIN",
      payload: {
        company_name,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const response = await axios.post("/api/account/register", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem("accessToken", accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("dashboardStatics");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_email_service_query_id");
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "jwt",
      login,
      register,
      logout,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
