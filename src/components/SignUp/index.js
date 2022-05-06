import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { signUpUser, resetAllAuthForms } from '../../redux/user/user.actions';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from "../forms/button"

import "./styles.scss";

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
})

const SignUp = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { signUpSuccess, signUpError } = useSelector(mapState);

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (signUpSuccess) {
            reset();
            dispatch(resetAllAuthForms());
            history.push('/');
        }
    }, [signUpSuccess])

    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0) {
            setErrors(signUpError);
        }
    }, [signUpError])

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors('');
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        dispatch(signUpUser({
            displayName,
            email,
            password,
            confirmPassword
        }))
    }

    const configAuthWrapper = {
        headline: "Registartion"
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">

                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            )
                        })}
                    </ul>
                )}

                <form onSubmit={handleFormSubmit}>

                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={(e) => setDisplayName(e.target.value)}
                    />

                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={(e) => setEmail(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={(e) => setPassword(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button>
                        Register
                    </Button>

                </form>
            </div>
        </AuthWrapper>
    );
}

export default SignUp;