const initialState = {
    userName: null,
    userRole: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

//reducer
//A reducing function returns the new state of Redux store
//as any time the action will be created with dispatch, reducer will be called.
//at the first call 'stateStore = initialState' and result initialize Redux store with data in 'stateStore'
//at the second call 'stateStore' will come from Redux store
export default function auth (stateStore = initialState, action) { //stateStore - previous state
    if (action.type === 'LOGIN_USER_SUCCESS') {
        return Object.assign({}, stateStore, {
            isAuthenticating: false,
            isAuthenticated: true,
            userName: action.payload.userName,
            userRole: action.payload.userRole,
            statusText: 'You have been successfully logged in.'
        });
    } else if (action.type === 'LOGOUT_USER') {
        return initialState;
    }

    return stateStore;
}
