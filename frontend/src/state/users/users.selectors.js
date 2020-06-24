// @Selectors from state
const selectUser = (state) => state.usersReducer.get('user')
const selectProfiles = (state) => state.usersReducer.get('profiles')
const selectRepresentant = (state) => state.usersReducer.get('representant')
const selectUbication = (state) => state.usersReducer.get('ubication')
const selectIsAuthenticated = (state) => state.usersReducer.get('user').isAuthenticated

const selectFormStep = (state) => state.usersReducer.get('registerFormStep')

export {
	selectUser,
	selectProfiles,
	selectRepresentant,
	selectUbication,
	selectIsAuthenticated,
	selectFormStep
}