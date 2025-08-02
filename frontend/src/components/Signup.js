import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    contactNo: '',
    userName: '',
    password: '',
    confirmPassword: ''
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        contactNo: formData.contactNo,
        userName: formData.userName,
        password: formData.password
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          let message = 'Registration failed';
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
      alert(data.message || 'Signup successful! You can now login.');
      navigate('/login');
    })
    .catch(err => {
      setError(err.message);
    });
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact No:
          <input
            type="tel"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
          />
        </label>
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
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
