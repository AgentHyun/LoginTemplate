import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook from React Router

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

        let body = {
            email: email,
            password: password,
            name: name,
        };

        dispatch(registerUser(body))
            .then((response) => {
                if (response.payload.success) {
                    navigate('/login'); // Use navigate instead of withRouter
                } else {
                    alert('Failed to sign up');
                }
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

                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button type="submit">
                    회원 가입
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;
