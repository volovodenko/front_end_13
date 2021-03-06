const initialState = ['My home playlist', 'My works playlist'];

//reducer
//A reducing function returns the new state of Redux store
//as any time the action will be created with dispatch, reducer will be called.
//at the first call 'stateStore = initialState' and result initialize Redux store with data in 'stateStore'
//at the second call 'stateStore' will come from Redux store
export default function playLists (stateStore = initialState, action) { //stateStore - previous state
    if (action.type === 'ADD_PLAYLIST') {
        return [...stateStore, action.payload]; //return new state
    } else if (action.type === 'DEL_PLAYLIST') {
        return stateStore;
    }

    return stateStore;
}
