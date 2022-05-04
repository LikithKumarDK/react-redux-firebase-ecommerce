import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss'

import Logo from '../../assets/SelfDevlpr_Cart-removebg-preview.png'

const Header = props => {
    return (
        <header className='header'>
            <div className='wrap'>
                <div className='logo'>
                    <Link to="/">
                        <img src={Logo} alt="SelfDevlpr LOGO" />
                    </Link>
                </div>

                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="/registration" >
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;