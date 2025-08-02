import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsLoggedIn, setUsername }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://192.168.1.9:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: formData.userName,
        password: formData.password
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          let message = 'Login failed';
          try {
            const data = JSON.parse(text);
            message = data.message || message;
          } catch {
            message = text;
          }
          throw new Error(message);
        });
      }
      return res.json();
    })
    .then(data => {
      setError('');
      setIsLoggedIn(true);
      setUsername(data.user.userName);
      navigate('/');
    })
    .catch(err => {
      setError(err.message);
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          User Name:
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
