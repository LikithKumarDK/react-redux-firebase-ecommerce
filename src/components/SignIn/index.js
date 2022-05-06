import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { signInUser, signInWithGoogle, resetAllAuthForms } from '../../redux/user/user.actions';

import AuthWrapper from '../AuthWrapper';
import FormInput from "../forms/FormInput";
import Button from '../forms/button';

import "./styles.scss";

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess
});

const SignIn = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { signInSuccess } = useSelector(mapState);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (signInSuccess) {
            console.log("mmmmmm");
            resetForm();
            dispatch(resetAllAuthForms());
            history.push('/');
        }
    }, [signInSuccess])

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signInUser({email, password}));
    }

    const handleGoogleSignIn = () => {
      dispatch(signInWithGoogle());
    }

    const configAuthWrapper = {
        headline: 'LogIn'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>

                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder={"Email"}
                        handleChange={e => setEmail(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder={"Password"}
                        handleChange={e => setPassword(e.target.value)}
                    />

                    <Button type="submit">
                        LogIn
                    </Button>

                    <div className="socialSignIn">
                        <div className="row">
                            <Button onClick={handleGoogleSignIn}>
                                Sign in with Google
                            </Button>
                        </div>
                    </div>

                    <div className="links">
                        <Link to="/recovery">
                            Reset Password
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
}

export default SignIn;