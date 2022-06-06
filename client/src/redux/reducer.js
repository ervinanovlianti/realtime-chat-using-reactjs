const inititalState = {
  users: [],
  userDetail: {},
  loggedUser: {},
  loading: false,
  error: false,
};

const reducer = (state = inititalState, actions) => {
  const { type, payload } = actions;

  switch (type) {
    case "FETCH_USERS":
      return { ...state, users: [...payload] };
    case "FETCH_USER_BY_ID":
      return { ...state, userDetail: { ...payload } };
    case "FETCH_LOGGED_USER":
      return { ...state, loggedUser: { ...payload } };
    case "SET_LOADING":
      return { ...state, loading: payload };
    case "SET_ERROR":
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default reducer;
