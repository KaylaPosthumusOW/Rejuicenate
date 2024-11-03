import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import GreenPattern from '../assets/green pattern.png';
import PrimaryBtn from "../Buttons/primaryBtn";
import '../styles/SignUpIn.css';
import { useUser } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      surname,
      email,
      password,
      user_type: 'standard',
      profile_image: 'https://images.app.goo.gl/zkhQbtxLMPSUNj4t8', // Default profile image
    };

    try {
      // Register the user
      await axios.post('http://localhost:5001/users/add', newUser);

      // Log the user in immediately after registration
      const loginResponse = await axios.post('http://localhost:5001/users/login', {
        email,
        password,
      });

      const { token, user } = loginResponse.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      // Redirect to appropriate page based on user type
      if (user.user_type === 'admin') {
        navigate('/admin/addJuice');
      } else {
        navigate('/personalinfo');
      }
    } catch (error) {
      console.error('Signup or login error:', error);
      alert("There was an issue with signup or login. Please try again.");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col lg="8" xs="12" className="signUpform">
          <h2>Welcome to Rejuicenate!</h2>
          <p>Create your account to start your journey towards rejuvenation, and a better you through the power of juicing.</p>
          <Form onSubmit={handleSignUp}>
            <Form.Group className="mb-3" controlId="firstname">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="formInput"
                type="text"
                placeholder="Enter your first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="surname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                className="formInput"
                type="text"
                placeholder="Enter your surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="formInput"
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
                  className="formInput"
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

            <PrimaryBtn label="Sign Up" type="submit" />
            <p className="mt-3">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Log In
              </Link>
            </p>
          </Form>
        </Col>
        <Col lg="4">
          <img className="signUp-img d-none d-md-block" src={GreenPattern} alt="Fruit and Veg Pattern" />
        </Col>
      </Row>
    </div>
  );
}

export default SignUp;
