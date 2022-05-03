import React from 'react';
import './styles.scss'

import Logo from '../assets/SelfDevlpr_Cart-removebg-preview.png'

const Header = props => {
    return (
        <header className='header'>
            <div className='wrap'>
                <div className='logo'>
                    <img src={Logo} alt="SelfDevlpr LOGO" />
                </div>
            </div>
        </header>
    )
}

export default Header;