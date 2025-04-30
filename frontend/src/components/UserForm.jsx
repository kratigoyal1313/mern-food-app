import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const UserForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Hook to navigate to next page

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can log the data or handle it further if needed, but no need to store it for now
    console.log({ name, phone, email });

    // After form submission, navigate to the Home page (food menu)
    navigate('/home');
  };

  return (
    <div className="form-container">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default UserForm;
