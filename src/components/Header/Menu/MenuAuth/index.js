import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

import './menuAuth.scss';

class MenuAuth extends Component {

    userName() {
        return this.props.isAuthenticated ? this.props.userName : 'Guest';
    }


    auth() {
        return this.props.isAuthenticated
            ? <Link to='/logout' onClick={this.props.onLogOut}>
                Logout
                <i className='fa fa-sign-out'></i>
            </Link>
            : <NavLink to='/login' activeClassName='active'>Login <i className='fa fa-sign-in'></i></NavLink>
    }


    render() {

        return (
            <ul className='menu-auth'>
                <li className='menu-auth__userName'>
                    Hello <b>{this.userName()}</b>
                </li>
                <li>{this.auth()}</li>
            </ul>
        )
    }
}

export default MenuAuth;