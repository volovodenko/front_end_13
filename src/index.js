import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';


import App from './components/App';
import configStore from './store/configStore';


const store = configStore();

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

const env = process.env.NODE_ENV;
const devMode = env === 'development';
if (!devMode) {
    registerServiceWorker();
}







// import {createStore} from 'redux';
//
// const initialState = [];
//
//
// //reducer
// const playList = (stateStore = [], action) => {
//     // console.log(action);
//     if (action.type === 'ADD_TRACK') {
//         return [...stateStore, action.payload];
//     }
//
//     return stateStore;
// };
//
//
// const store = createStore(playList, initialState);
//
//
// store.subscribe(() => {
//     const list = document.querySelectorAll('.list')[0];
//     const li = document.createElement('li');
//     const dataStore = store.getState();
//
//     const track = dataStore[dataStore.length - 1];
//
//     li.textContent = track;
//     list.appendChild(li);
//
// });
//
// const addTrackBtn = document.querySelectorAll('.addTrack')[0];
// const trackInput = document.querySelectorAll('.trackInput')[0];
//
//
// addTrackBtn.addEventListener('click', () => {
//     const trackName = trackInput.value;
//     trackInput.value = '';
//
//     store.dispatch({type: 'ADD_TRACK', payload: trackName});
// });
//
