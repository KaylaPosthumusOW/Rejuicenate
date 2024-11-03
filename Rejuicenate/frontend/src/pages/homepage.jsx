import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/homepage.css";
import { useUser } from '../context/UserContext';
import JuiceCard from "../components/juiceCard";
import axios from "axios";
import Footer from "../components/footer";

import AboutUsImage from "../assets/aboutUs-img.jpg"

function Homepage() {
  const { user } = useUser();
  const [juices, setJuices] = useState([]);
  const [filteredJuices, setFilteredJuices] = useState([]);
  const [personalData, setPersonalData] = useState(null); // State to hold personal data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(''); // State to manage error messages
  const [trackingCards, setTrackingCards] = useState([]); // State for tracking cards data

  // Fetch personal data
  useEffect(() => {
    const fetchPersonalData = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5001/personalInfo/${user._id}`);
          setPersonalData(response.data);

          // Fetch tracking data
          const trackingResponse = await axios.get(`http://localhost:5001/trackedData/${user._id}`);
          setTrackingCards(trackingResponse.data);
        } catch (err) {
          setError('Error fetching personal data.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPersonalData();
  }, [user]);

  // Fetch juices data and filter based on health conditions
  useEffect(() => {
    const fetchJuices = async () => {
      try {
        const response = await axios.get("http://localhost:5001/juices");
        setJuices(response.data);

        // Filter juices based on user's health conditions after personal data is fetched
        if (personalData && personalData.healthConditions) {
          const categoryIds = personalData.healthConditions; // Assuming healthConditions is an array of IDs
          const suggestedJuices = response.data.filter(juice => 
            categoryIds.includes(juice.category_id)
          );
          setFilteredJuices(suggestedJuices);
        }
      } catch (error) {
        console.error("Error fetching juices:", error);
      }
    };
    fetchJuices();
  }, [personalData]); // Dependency on personalData to re-fetch juices when personal data is available

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  // Calculate progress
  const filledPercentage = (trackingCards.length / (personalData?.fastDuration || 1)) * 100;

  return (
    <>
      <Container className="mt-5">
        <h1>Welcome {user ? user.name : "Guest"}!</h1>
        <p>Your path to better health starts here.</p>

        {filledPercentage > 0 && (
          <div className="progress-line">
            <h4>Your amazing progress</h4>
            <div className="tracking-line">
              <div className="filled-line" style={{ width: `${filledPercentage}%` }}></div>
            </div>
          </div>
        )}


        <h2 className="mt-5 mb-3">Suggested Juices</h2>
        <p>Based on your health conditions</p>
        
        {/* Pass the filtered juices to JuiceCard */}
        <JuiceCard juices={filteredJuices} />


        {/* About us sections */}
        <Row className="mt-5">
          <Col lg="4">
            <div className="aboutUs-bg"></div>
            <img className="aboutus-img" src={AboutUsImage} />
          </Col>
          <Col lg="1"></Col>
          <Col lg="5">
            <h1 className="my-5">ABOUT Rejuicenate</h1>
            <h4 className="ourMission-green">OUR MISSION</h4>
            <p>At ReJuicenate, we believe that small, healthy habits can spark big changes. We're here to make wellness simple, delicious, and accessible through a curated selection of juices designed to nourish your body and elevate your well-being. Whether you’re managing health challenges or just want to feel your best, we’re in your corner—one sip at a time.</p>
          </Col>
        </Row>
      </Container>
      {/* <div className="aboutUs-bg"></div> */}

      <Footer />
    </>
  );
}

export default Homepage;
