// @Selectors from state
const selectUser = (state) => state.usersReducer.get('user')

const selectIsAuthenticated = (state) => state.usersReducer.get('user').isAuthenticated

export {selectUser, selectIsAuthenticated}
