import { getUsers, getUserById, getLoggedUser } from "../api/user-api";

export const usersActions = {
  getUsers: () => {
    return async (dispatch) => {
      dispatch(usersActions.setLoading(true));

      let response = await getUsers();

      if (response.status === "success") {
        dispatch({
          type: "FETCH_USERS",
          payload: response.data,
        });
      } else {
        dispatch(usersActions.setError(true));
      }
      dispatch(usersActions.setLoading(false));
    };
  },

  getUserById: (id) => {
    return async (dispatch) => {
      dispatch(usersActions.setLoading(true));
      let response = await getUserById(id);

      if (response.status === "success") {
        dispatch({
          type: "FETCH_USER_BY_ID",
          payload: response.data,
        });
      } else {
        dispatch(usersActions.setError(true));
      }
      dispatch(usersActions.setLoading(false));
    };
  },

  getLoggedUser: () => {
    return async (dispatch) => {
      dispatch(usersActions.setLoading(true));
      let response = await getLoggedUser();

      if (response.status === "success") {
        dispatch({
          type: "FETCH_LOGGED_USER",
          payload: response.data,
        });
      } else {
        dispatch(usersActions.setError(true));
      }
      dispatch(usersActions.setLoading(false));
    };
  },

  setLoading: (payload) => {
    return {
      type: "SET_LOADING",
      payload,
    };
  },

  setError: (payload) => {
    return {
      type: "SET_ERROR",
      payload,
    };
  },
};
