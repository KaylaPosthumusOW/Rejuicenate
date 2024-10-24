import NavBar from "../components/navbar";
import GreenPattern from '../assets/green pattern.png';

import '../styles/SignUpIn.css';
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import PrimaryBtn from "../Buttons/primaryBtn";
import axios from 'axios';

function SignUp() {
  // State to handle user input
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType] = useState('standard'); // Default user_type is 'standard'
  const [profileImage] = useState('https://images.app.goo.gl/zkhQbtxLMPSUNj4t8'); // Default profile image

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newUser = {
      name,
      surname,
      email,
      password,
      user_type: userType,  // Default is 'standard'
      profile_image: profileImage,  // Default profile image
    };

    try {
      // Axios POST request to save the user in the database
      const response = await axios.post('http://localhost:5001/users/add', newUser);
      console.log(response.data); // Response after successfully saving the user
      alert("User registered successfully!");
    } catch (error) {
      console.error('Error adding user:', error);
      alert("Error registering user.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <img className="signUp-img" src={GreenPattern} alt="Fruit and Veg Pattern" />
          </div>
          <div className="col-8 signUpform">
            <h2>Welcome to Rejuicenate! </h2>
            <p>Create your account to start your journey towards rejuvenation, and a better you through the power of juicing.</p>
            <Form onSubmit={handleSubmit}>
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
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputGroup.Text></InputGroup.Text>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
