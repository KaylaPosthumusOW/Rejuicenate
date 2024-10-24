import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/navbar";
import PinkPattern from '../assets/pink pattern.png';
import PrimaryBtn from "../Buttons/primaryBtn";
import '../styles/SignUpIn.css';
import { useUser } from '../context/UserContext'; // Import useUser

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser(); // Access the setUser function from context
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/users/login', {
        email,
        password,
      });

      const { token, user } = response.data; // Assuming response contains user data
      localStorage.setItem('token', token); // Store JWT token in localStorage
      localStorage.setItem('user', JSON.stringify(user)); // Store user details

      setUser(user); // Save user in context
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <img className="signUp-img" src={PinkPattern} alt="Fruit and Veg Pattern" />
          </div>
          <div className="col-8 form2">
            <h2>Welcome back to Rejuicenate!</h2>
            <p>We're excited to see you again. Let's continue your journey towards better health, one juice at a time!</p>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="formInput2"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    className="formInput2"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <PrimaryBtn label="Log In" />
              <p className="mt-3">
                Don't have an account?{" "}
                <Link to="/signUp" className="link2">Sign Up</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
