// Loader
const selectLoading = state => state.appReducer.get('loading')

// Server
const selectServerErrors = state => state.appReducer.get('serverErrors')
const selectStatusError = state => state.appReducer.get('statusError')
const selectServerSuccess = state => state.appReducer.get('serversuccess')

// Alerts
const selectModal = state => state.appReducer.get('modal')
const selectDialogConfirm = state => state.appReducer.get('dialogConfirm')

export {
	selectLoading,
	selectServerErrors,
	selectStatusError,
	selectModal,
	selectServerSuccess,
	selectDialogConfirm
}