import React, {Component} from 'react';

import './header.scss';
import Menu from './Menu'

class Header extends Component {
    render() {
        return (
            <header className='header'>
               <Menu {...this.props} />
            </header>
        );
    }
}

export default Header;