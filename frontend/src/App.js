import React, { useEffect, useState } from "react";
import "./styles.css"; // Importing the CSS file for styling
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // Use navigate hook
import UserForm from './components/UserForm';
import Home from './screens/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<UserForm />} />  
        
        {/* Home Page - Food menu */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
