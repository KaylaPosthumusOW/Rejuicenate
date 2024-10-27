import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../styles/homepage.css";
import { useUser } from '../context/UserContext';
import JuiceCard from "../components/juiceCard";
import axios from "axios";

function Homepage() {
  const { user } = useUser();
  const [juices, setJuices] = useState([]);

  // Fetch the juices data from the backend
  useEffect(() => {
    const fetchJuices = async () => {
      try {
        const response = await axios.get("http://localhost:5001/juices");
        console.log("Fetched juices:", response.data);
        setJuices(response.data);
      } catch (error) {
        console.error("Error fetching juices:", error);
      }
    };
    fetchJuices();
  }, []);

  // Get only the first 4 juices
  const firstFourJuices = juices.slice(0, 4);

  return (
    <>

      <Container className="mt-5">
        <h1>Welcome {user ? user.name : "Guest"}!</h1>
        <p>Your path to better health starts here.</p>

        <div className="progress-line">
          <h4>Your amazing progress</h4>
          <div className="line"></div>
        </div>

        <h2 className="mt-5 mb-3">Suggested Juices</h2>
        
        {/* Pass only the first four juices to JuiceCard */}
        <JuiceCard juices={firstFourJuices} />
      </Container>
    </>
  );
}

export default Homepage;
