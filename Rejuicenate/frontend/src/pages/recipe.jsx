import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get route params
import NavBar from "../components/navbar";
import { Button, Col, Container, Row } from "react-bootstrap";
import '../styles/recipe.css';
import axios from "axios";

function JuiceRecipe() {
  const { juiceId } = useParams(); // Get the juiceId from the route
  const [juice, setJuice] = useState(null); // State to hold juice data

  // Fetch juice details using juiceId
  useEffect(() => {
    const fetchJuice = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/juices/${juiceId}`);
        const juiceData = response.data;

        // Log the juice data to check structure
        console.log("Juice Data:", juiceData);

        // Set the juice data directly since category details are included
        setJuice(juiceData);
      } catch (error) {
        console.error("Error fetching juice details:", error);
      }
    };

    fetchJuice(); // Call the function to fetch juice data
  }, [juiceId]);

  if (!juice) {
    return <p>Loading...</p>; // Display loading state
  }

  return (
    <div>
      <NavBar />
      <Container className="mt-5">
        <Row>
          <Col md={8}>
            <h1>{juice.juiceName}</h1>
            {/* Directly access category name from the category_id object */}
            <Button>{juice.category_id ? juice.category_id.category : 'No Category'}</Button> 
            <p>{juice.description}</p>
            <h4>Dietary Modification:</h4>
            <p>{juice.category_id ? juice.category_id.dietaryMods : 'No dietary modification information available.'}</p>
            <h3>Ingredients:</h3>
            <p>{juice.ingredients.join(', ')}</p>
            <h3>Instructions</h3>
            <p>{juice.instructions.join('. ')}</p>
          </Col>
          <Col md={4}>
            <img src={`http://localhost:5001/${juice.image}`} alt={juice.juiceName} className="juice-image" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default JuiceRecipe;
