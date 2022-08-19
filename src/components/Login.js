import React, { useEffect, useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnFunc, setbtnFunc] = useState(true);

  const btnCheck = () => {
    const validEmail = /\S+@\S+\.\S+/;
    const minPassword = 6;

    if (password.length > minPassword && validEmail.test(email)) {
      setbtnFunc(false);
    } else {
      setbtnFunc(true);
    }
  };

  useEffect(() => btnCheck(), [email, password]);

  return (
    <div>
      <input
        data-testid="email-input"
        value={ email }
        onChange={ (event) => {
          setEmail(event.target.value);
        } }
      />
      <input
        data-testid="password-input"
        value={ password }
        onChange={ (event) => {
          setPassword(event.target.value);
        } }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ btnFunc }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
