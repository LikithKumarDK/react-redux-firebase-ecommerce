import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS

import { resetPassword, resetAllAuthForms } from '../../redux/user/user.actions';

import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput"
import Button from "../forms/button"

import './styles.scss';

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError
})

const EmailPassword = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAllAuthForms());
      history.push('/login');
    }
  }, [resetPasswordSuccess])

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    }
  }, [resetPasswordError])

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
  }

  const configAuthWrapper = {
    headline: "Email Password"
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

        <form onSubmit={handleSubmit}>

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit">
            Email Password
          </Button>

        </form>
      </div>
    </AuthWrapper>
  );
}

export default EmailPassword;