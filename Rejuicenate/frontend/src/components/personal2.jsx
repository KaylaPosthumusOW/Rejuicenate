import React, { useState, useEffect } from "react";
import { Form, Badge, Container, Row, Col } from "react-bootstrap";
import PrimaryBtn from "../Buttons/primaryBtn";
import SecondaryBtn from "../Buttons/secondaryBtn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 
import "../styles/personalInfo.css";

function PersonalTwo({ onNext, handleInputChange, personalInfo, onPrevious }) {
  const [categories, setCategories] = useState([]);
  const [selectedHealthConditions, setSelectedHealthConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMedications, setHasMedications] = useState(false);
  const [medicationDetails, setMedicationDetails] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        const shuffled = data.sort(() => 0.5 - Math.random());
        const randomCategories = shuffled.slice(0, 10);
        setCategories(randomCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Update personalInfo's healthConditions when selectedHealthConditions changes
  useEffect(() => {
    setInputHealthConditions();
  }, [selectedHealthConditions]);

  const setInputHealthConditions = () => {
    handleInputChange({
      target: {
        name: "healthConditions",
        value: selectedHealthConditions.join(", "),
      }
    });
  };

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedHealthConditions((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId); // Remove if already selected
      } else {
        return [...prevSelected, categoryId]; // Add if not selected
      }
    });
  };

  // Handle medication change
  const handleMedicationChange = (e) => {
    const { value } = e.target;
    setHasMedications(value === "yes");
    handleInputChange(e); // Call the parent function to keep state in sync
  };

  // Handle medication details change
  const handleMedicationDetailsChange = (e) => {
    const { value } = e.target;
    setMedicationDetails(value);
    handleInputChange(e); // Call the parent function to keep state in sync
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(); // Move to the next step
  };

  return (
    <div className="container background-yellow mt-5">
      <Container className="headerPersonal mb-2">
            <Row className="d-flex justify-content-between align-items-center">
                <Col xs={12} md={6}>
                    <h2>Your Personalised Juice Journey</h2>
                </Col>
                <Col xs={12} md={6} className="text-md-end mt-md-0">
                    <p>Step 2/3</p>
                </Col>
            </Row>
        </Container>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="healthConditions">
          <Form.Label>Do you have any health conditions we should know about?</Form.Label>
          <div>
            {loading ? (
              <p>Loading categories...</p>
            ) : (
              categories.map((category) => (
                <Badge
                  key={category._id}
                  className="me-2 mb-2 fs-6 g-5 pills"
                  onClick={() => handleCategoryClick(category._id)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedHealthConditions.includes(category._id) ? "#201E1F" : "#E0E0E0",
                    color: selectedHealthConditions.includes(category._id) ? "#B57A06" : "#000000",
                  }}
                >
                  {category.category}
                </Badge>
              ))
            )}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="allergies">
          <Form.Label>Are there any foods you need to avoid?</Form.Label>
          <Form.Select
            name="allergies"
            style={{ border: "2px solid #B57A06" }}
            onChange={handleInputChange}
            required
          >
            <option value="">Allergies?</option>
            {["Dairy", "Gluten", "Peanuts", "Shellfish", "Other", "None"].map((allergyOption, index) => (
              <option key={index} value={allergyOption}>
                {allergyOption}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="medications">
          <Form.Label>Are you taking any medications/supplements?</Form.Label>
          <div className="d-flex">
            <Form.Check
              type="radio"
              label="Yes"
              name="medications"
              value="yes"
              onChange={handleMedicationChange}
              className="me-3"
              required
            />
            <Form.Check
              type="radio"
              label="No"
              name="medications"
              value="no"
              onChange={handleMedicationChange}
              required
            />
          </div>
          {hasMedications && (
            <Form.Control
              style={{ border: "2px solid #B57A06" }}
              className="mt-2"
              type="text"
              placeholder="Please specify your medications or supplements"
              value={medicationDetails}
              onChange={handleMedicationDetailsChange}
              required
            />
          )}
        </Form.Group>

        <div className="mt-4 justify-content-inbetween">
        <SecondaryBtn onClick={onPrevious} label={
              <>
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Previous
              </>
          } />

          <PrimaryBtn type="submit" label="Next" />
        </div>
      </Form>
    </div>
  );
}

export default PersonalTwo;
