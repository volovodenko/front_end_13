import {combineReducers} from 'redux';

import tracks from './tracks';
import playLists from './playlists';
import filterTrack from './filterTracks';
import auth from './auth';


export default combineReducers(
    //вертається обєкт з масивом tracks + playLists
    {
        tracks,
        playLists,
        filterTrack,
        auth
    }
)


// const initialState = ['Hello world2', 'Enter Sandman'];
//
//
// //reducer
// //A reducing function returns the new state of Redux store
// //as any time the action will be created with dispatch, reducer will be called.
// //at the first call 'stateStore = initialState' and result initialize Redux store with data in 'stateStore'
// //at the second call 'stateStore' will come from Redux store
// const playList = (stateStore, action) => { //stateStore - previous state
//     if (action.type === 'ADD_TRACK') {
//         return [...stateStore, action.payload]; //return new state
//     }
//
//     return stateStore;
// };