import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import PinkPattern from '../assets/pink pattern.png';
import PrimaryBtn from "../Buttons/primaryBtn";
import '../styles/SignUpIn.css';
import { useUser } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { setUser } = useUser();
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${apiUrl}/users/login`, {
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
        navigate('/homepage');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials.');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="container-fluid">
      <Row>
        <Col lg="8" xs="12" className="logInform">
          <h2>Welcome Back to Rejuicenate!</h2>
          <p>Log in to access your account and continue your rejuvenation journey through juicing.</p>
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <PrimaryBtn label="Log In" type="submit" />
            <p className="mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className="link2">
                Sign Up
              </Link>
            </p>
          </Form>
        </Col>
        <Col lg="4">
          <img className="signUp-img d-none d-md-block" src={PinkPattern} alt="Fruit and Veg Pattern" />
        </Col>
      </Row>
      </div>
    </div>
  );
}

export default LogIn;
