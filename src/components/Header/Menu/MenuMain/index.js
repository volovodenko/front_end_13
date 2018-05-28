import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import './menuMain.scss';

class MenuMain extends  Component {

    isAdmin(){
        return this.props.userRole==='admin'
            ? <li><NavLink exact to='/dashboard' activeClassName='active'>Dashboard</NavLink></li>
            : null
    }

    render () {

        return (
            <ul className='menu-main'>
                <li><NavLink exact to='/' activeClassName='active' className='fa fa-home'/></li>
                <li><NavLink exact to='/about' activeClassName='active'>About</NavLink></li>
                <li><NavLink exact to='/about/hello' activeClassName='active'>About2-Hello</NavLink></li>
                <li><NavLink exact to='/about/world' activeClassName='active'>About2-World</NavLink></li>
                {this.isAdmin()}
            </ul>
        )
    }
}


export default MenuMain;