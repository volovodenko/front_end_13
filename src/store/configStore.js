// Создание хранилища с передачей редьюсера и начального состояния Redux store
//описывается что для Redux store редюсером будет 'reducer'
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; //можна диспатчити функції
import { composeWithDevTools } from 'redux-devtools-extension'; //для роботи redux devtools в хромі
import reducer from '../reducers';

export default function configStore() {
    const env = process.env.NODE_ENV;
    const devMode = env === 'development';

    const store = createStore(
        reducer,
        // initialState, //начальное состояние store

        //for enable Redux DevTools Extension (without composeWithDevTools)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        // or (with composeWithDevTools)
        devMode ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
    );

    return store;
}