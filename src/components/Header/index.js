import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from "../../firebase/utils"

import './styles.scss'

import Logo from '../../assets/SelfDevlpr_Cart-removebg-preview.png'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const Header = props => {
    const { currentUser } = useSelector(mapState);

    return (
        <header className='header'>
            <div className='wrap'>
                <div className='logo'>
                    <Link to="/">
                        <img src={Logo} alt="SelfDevlpr LOGO" />
                    </Link>
                </div>

                <div className="callToActions">
                    {currentUser && (
                        <ul>
                            <li>
                                <Link to="/dashboard" >
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <span onClick={() => auth.signOut()}>
                                    LogOut
                                </span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/registration" >
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
}

// TACKELED WITH REDUX HOOKS
// const mapStateProps = ({ user }) => ({
//     currentUser: user.currentUser
// });

// export default connect(mapStateProps, null)(Header);

export default Header;