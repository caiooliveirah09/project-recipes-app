import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnFunc, setBtnFunc] = useState(true);
  const history = useHistory();

  const emailCheck = () => {
    const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return email.match(validEmail);
  };

  const passwordCheck = () => {
    const MIN_NUM = 6;
    return password.length > MIN_NUM;
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  useEffect(() => {
    if (emailCheck() && passwordCheck()) {
      setBtnFunc(false);
    } else {
      setBtnFunc(true);
    }
  }, [email, password]);

  return (
    <fieldset>
      <input
        type="text"
        data-testid="email-input"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        type="text"
        data-testid="password-input"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ btnFunc }
        onClick={ handleSubmit }
      >
        Enter
      </button>
    </fieldset>
  );
}

export default Login;
