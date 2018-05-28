import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Redirect} from 'react-router-dom';

import './login.scss';

class Login extends Component {

    login() {
        const userName = ReactDom.findDOMNode(this.refs.userName).value;
        userName.length < 3 ? alert('User name must have 3 or more chars') : this.props.onLogin(userName);
    }



    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/'/>
        }

        return (
            <section className='login'>
                <fieldset>
                    <legend>
                        Login
                    </legend>

                    <input type='text' ref='userName' placeholder='User name'/>
                    <button onClick={::this.login}>Login</button>
                </fieldset>
            </section>
        );
    }
}

export default Login;