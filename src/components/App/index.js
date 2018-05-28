import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from '../Header';
import Main from '../Main';
import {getTracks} from '../../actions/tracks';

import './app.scss';
import 'font-awesome/css/font-awesome.css';


class App extends Component {


    render() {
        return (
            <div id ='wrapper'>
                <Header {...this.props}/>
                <Main {...this.props}/>
            </div>
        );

    }
}

//as any time the store is updated, mapStateToProps will be called.
//the results of mapStateToProps must be a plain object,
// which will be merged into the component’s props.
//first argument is the entire Redux store’s state
const mapStateToProps = (state) => {
    return {
        ...state,

        // tracks: state.tracks //добавляеться в props свойство tracks с значением state
        tracksFilter: state.tracks.filter(track => track.name.includes(state.filterTrack))
    }
};



//result must be a plain object
//each function inside result it is assumed to be a Redux action creator.
// An object with the same function names, will be merged into the component’s props.
//it will be called with dispatch as the first parameter
const mapDispatchToProps = (dispatch) => {
    return {
        onLogOut: () => {
            dispatch({type: 'LOGOUT_USER'})
        },
        //добавляеться в props метод onAddTrack, на вход которого в trackName подаються данные
        onAddTrack: (trackName) => {
            const payload = {
                id: Date.now().toString(),
                name: trackName
            };

            dispatch({type: 'ADD_TRACK', payload: payload});
        },

        onFindTrack: (trackName) => {
            dispatch({type: 'FIND_TRACK', payload: trackName});
        },

        onGetTracks: () => {
            dispatch(getTracks());
        },

        onLogin: (userName) => {
            const userRole= userName.toLowerCase()==='admin' ? 'admin' : 'user';

            dispatch({type: 'LOGIN_USER_SUCCESS', payload: {userName: userName, userRole: userRole}})
        }
    }

};

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(App);

// Оказывается, что connect метод библиотеки react-redux использует 'pure' component
// для обёртки подключаемого элемента. Именно поэтому CSS стили не считаются изменениями компонента.
// Всё что нужно - это отключить опцию pure в методе connect при подключении компонента.
//
//     export default connect(mapStateToProps, null, null, { pure: false })(Header);