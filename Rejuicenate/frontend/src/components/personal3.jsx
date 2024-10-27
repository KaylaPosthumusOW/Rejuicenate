import React from "react";
import { Form } from "react-bootstrap";
import PrimaryBtn from "../Buttons/primaryBtn";
import SecondaryBtn from "../Buttons/secondaryBtn";
import '../styles/personalInfo.css';

function PersonalThree({ onNext, onPrevious, handleInputChange, personalInfo }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure healthGoals and healthGoalLevel are part of personalInfo
    // It's critical that handleInputChange is correctly implemented
    onNext(e); // Pass the event to onNext
  };

  return (
    <div className="container background-pink mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>Your Health Goals</h2>
        </div>
        <div>
          <p>Step 3/3</p>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="healthGoals">
          <Form.Label>What are your health goals?</Form.Label>
          <Form.Control
            as="textarea"
            name="healthGoals"
            style={{ border: '2px solid #95445D' }}
            value={personalInfo.healthGoals}
            onChange={handleInputChange}
            required
            placeholder="Please describe your health goals."
          />
        </Form.Group>

        <Form.Group controlId="motivation">
          <Form.Label>What motivates you to start this journey?</Form.Label>
          <Form.Control
            style={{ border: '2px solid #95445D' }}
            as="textarea"
            name="motivation"
            value={personalInfo.motivation}
            onChange={handleInputChange}
            required
            placeholder="Your motivation."
          />
        </Form.Group>

        <Form.Group controlId="fastDuration">
          <Form.Label>How long do you want to fast for?</Form.Label>
          <Form.Control
            style={{ border: '2px solid #95445D' }}
            name="fastDuration"
            type="number"
            value={personalInfo.fastDuration}
            onChange={handleInputChange}
            placeholder="Enter number of days"
            required
          />
        </Form.Group>

        {/* Slider for setting a health goal level */}
        <Form.Group controlId="healthGoalLevel">
          <Form.Label>Set your health goal level (1-10): {personalInfo.healthGoalLevel || 5}</Form.Label>
          <Form.Control
            style={{ border: '2px solid #95445D' }}
            type="range"
            name="healthGoalLevel"
            min="1"
            max="10"
            value={personalInfo.healthGoalLevel || 5} // Default value
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-3">
          <SecondaryBtn label="Back" onClick={onPrevious} />
          <PrimaryBtn type="submit" label="Submit" />
        </div>
      </Form>
    </div>
  );
}

export default PersonalThree;
