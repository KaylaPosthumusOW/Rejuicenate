import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/trackProgress.css";
import TrackingCard from "../components/trackingCard";
import axios from 'axios';
import { useUser } from '../context/UserContext'; // Import the context
import Footer from "../components/footer";

function TrackProgress() {
  const { user } = useUser(); // Get user ID from context
  const [personalData, setPersonalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonalData = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5001/personalInfo/${user._id}`);
          setPersonalData(response.data);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <>
      <div className="tracking-yellow-bg"></div>
      <Container>
        <h2 className="mt-5">Track Your Journey, One Sip at a Time</h2>
        <Row>
            <Col lg="4" className="text-center"> {/* Center content for better alignment */}
                <h3 className="rotated-header">User Goals</h3>
                <p className="gm-text"> {personalData?.healthGoals || "No health goals set."}</p> {/* Display user health goals */}
            </Col>
            <Col lg="4" className="text-center mt-5">
                <h3 className="rotated-header">User Motivations</h3>
                <p className="gm-text">{personalData?.motivation || "No motivations set."}</p> {/* Display user motivations */}
            </Col>
            <Col lg="4">
                <div className="progress-tracker">
                <p className="tracking-text">Day 1 of 8</p>
                </div>
            </Col>
        </Row>


        <Row className="mt-5">
          <h4>Celebrate Every Step Forward!</h4>
          <p>
            Keep an eye on how far you've come. Whether it’s trying new juices, managing health symptoms, or staying consistent—every milestone counts.
            <br />
            Track what works, log how you feel, and celebrate small wins on your journey toward wellness.
          </p>

          <Col lg="4" sm="6">
            <TrackingCard />
          </Col>
          <Col lg="4" sm="6">
            <TrackingCard />
          </Col>
          <Col lg="4" sm="6">
            <TrackingCard />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default TrackProgress;
