import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import PinkPattern from '../assets/pink pattern.png';
import PrimaryBtn from "../Buttons/primaryBtn";
import '../styles/SignUpIn.css';
import { useUser } from '../context/UserContext';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5001/users/login', {
        email,
        password,
      });
  
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      setUser(user);
  
      if (user.user_type === 'admin') {
        navigate('/admin/addJuice');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials.');
    }
  };

  return (
    <div>
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
