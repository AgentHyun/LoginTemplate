import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    dispatch(loginUser(body))
      .then((response) => {
        if (response.payload.loginSuccess) {
          navigate('/');
        } else {
          alert('Error');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>

        {/* Add a Link to the Register page */}
        <Link to="/register" style={{ 
          marginTop: '10px' , alignSelf: 'center'}}>
          Register
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
