import React, {Component} from 'react';

import MenuMain from './MenuMain';
import MenuAuth from './MenuAuth';

import './menu.scss';


class Menu extends Component {
    render() {
        return (
            <nav className='menu'>
                <MenuMain userRole={this.props.auth.userRole}/>
                <MenuAuth
                    userName={this.props.auth.userName}
                    isAuthenticated={this.props.auth.isAuthenticated}
                    onLogOut={this.props.onLogOut}
                />
            </nav>
        )
    }
}

export default Menu;
