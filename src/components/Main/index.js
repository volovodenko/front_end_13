import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Tracks from '../Tracks';
import About from '../About';
import About2 from '../About2';
import NotFound from '../NotFound';
import Login from '../Login';
import Dashboard from '../Dashboard';

import './main.css';

class Main extends Component {

    login(){
        return ()=> (
            <Login
                isAuthenticated = {this.props.auth.isAuthenticated}
                onLogin = {this.props.onLogin}
            />
        )
    }

    dashboard(){
        return ()=> (
            this.props.auth.userRole === 'admin' ? <Dashboard/> : <NotFound/>
        )
    }

    logout(){
        return ()=> <Redirect to='/'/>
    }

    tracks(){
        return ()=> (
            <Tracks
                tracksFilter={this.props.tracksFilter}
                onFindTrack={this.props.onFindTrack}
                onAddTrack={this.props.onAddTrack}
                onGetTracks={this.props.onGetTracks}
            />
        )
    }


    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' render={this.tracks()} />
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/about/:about' component={About2}/>
                    <Route exact path='/login' render={this.login()}/>
                    <Route exact path='/logout' render={this.logout()}/>
                    <Route exact path='/dashboard' render={this.dashboard()}/>
                    <Route component={NotFound}/>
                </Switch>
            </main>
        );
    }

}

export default Main;