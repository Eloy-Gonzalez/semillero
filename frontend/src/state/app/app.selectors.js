const selectLoading = state => state.appReducer.get('loading');

const selectServerErrors = state => state.appReducer.get('serverErrors');

const selectStatusError = state => state.appReducer.get('statusError');

const selectServerSuccess = state => state.appReducer.get('serversuccess');


const selectModal = state => state.appReducer.get('modal');

export {
	selectLoading,
	selectServerErrors,
	selectStatusError,
	selectModal,
	selectServerSuccess
};