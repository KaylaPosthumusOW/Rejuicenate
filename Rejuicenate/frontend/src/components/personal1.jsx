import React, { useState } from "react";
import { Form, Button, InputGroup, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PrimaryBtn from "../Buttons/primaryBtn";

import '../styles/personalInfo.css'
import SecondaryBtn from "../Buttons/secondaryBtn";

function PersonalOne() {
  return (
    <div className="container background mt-5">
      <h2 className="mb-3">Your Personalised Juice Journey</h2>
      <p>Step 1/3</p>

      <Form>
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>How young are you feeling today?</Form.Label>
          <Form.Control type="number" placeholder="Age" required />
        </Form.Group>

        <Form.Group className="mb-2" controlId="gender">
          <Form.Label>What is your gender</Form.Label>
          <Form.Select required>
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2" controlId="profession">
          <Form.Label>What do you do for a living</Form.Label>
          <Form.Control type="text" placeholder="Profession" required />
        </Form.Group>

        <Form.Group className="mb-2" controlId="weightHeight">
          <Form.Label>Could you share your weight and height?</Form.Label>
          <Row className="gy-2">
            <Col xs={6}>
              <Form.Control type="number" placeholder="Weight (kg)" required />
            </Col>
            <Col xs={6}>
              <Form.Control type="number" placeholder="Height (cm)" required />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-2" controlId="activityLevel">
            <Form.Label>How active are you on a typical day?</Form.Label>
            <Form.Select required>
                <option value="">Select your activity level</option>
                <option value="low">Little or no exercise, mostly sitting.</option>
                <option value="moderate">Moderate exercise or physical activity.</option>
                <option value="high">Hard exercise or physical activity.</option>
                <option value="very-high">Very hard exercise or physical activity.</option>
            </Form.Select>
        </Form.Group>


        <br />
        <SecondaryBtn label="Skip" />
        <PrimaryBtn label="Next" />
      </Form>
    </div>
  );
}

export default PersonalOne;
