import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import PrimaryBtn from "../Buttons/primaryBtn";
import '../styles/personalInfo.css';

function PersonalOne({ onNext, handleInputChange, personalInfo }) {
  return (
    <div className="container background mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>Your Personalised Juice Journey</h2>
        </div>
        <div>
          <p>Step 1/3</p>
        </div>
      </div>

      <Form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <Form.Group className="mb-2" controlId="age">
          <Form.Label>How young are you feeling today?</Form.Label>
          <Form.Control
            name="age"
            value={personalInfo.age}
            style={{ border: '2px solid #397051' }}
            type="number"
            placeholder="Age"
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>What is your gender?</Form.Label>
          <Form.Select
            name="gender"
            value={personalInfo.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="occupation">
          <Form.Label>What do you do for a living?</Form.Label>
          <Form.Control
            name="occupation"
            type="text"
            value={personalInfo.occupation}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="weightHeight">
          <Form.Label>Could you share your weight and height?</Form.Label>
          <Row>
            <Col xs={6}>
              <Form.Control
                name="weight"
                style={{ border: '2px solid #397051' }}
                type="number"
                placeholder="Weight (kg)"
                value={personalInfo.weight}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col xs={6}>
              <Form.Control
                name="height"
                style={{ border: '2px solid #397051' }}
                type="number"
                placeholder="Height (cm)"
                value={personalInfo.height}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-2" controlId="activityLevel">
          <Form.Label>How active are you on a typical day?</Form.Label>
          <Form.Select
            name="activityLevel"
            style={{ border: '2px solid #397051' }}
            value={personalInfo.activityLevel}
            onChange={handleInputChange}
            required
          >
            <option value="">Select your activity level</option>
            <option value="low">Little or no exercise, mostly sitting.</option>
            <option value="moderate">Moderate exercise or physical activity.</option>
            <option value="high">Hard exercise or physical activity.</option>
            <option value="very-high">Very hard exercise or physical activity.</option>
          </Form.Select>
        </Form.Group>

        <br />
        <PrimaryBtn type="submit" className="btn btn-primary" label="Next" />
      </Form>
    </div>
  );
}

export default PersonalOne;
