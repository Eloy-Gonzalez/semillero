const selectLoading = (state) => state.authReducer.get('loading');
const selectUser = (state) => state.authReducer.get('user');
const selectIsAuthenticated = (state) =>
  state.authReducer.get('user').isAuthenticated;

export { selectUser, selectIsAuthenticated, selectLoading };
