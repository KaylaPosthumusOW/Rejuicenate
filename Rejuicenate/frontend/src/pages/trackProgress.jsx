// TrackProgress.js
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/trackProgress.css";
import axios from 'axios';
import { useUser } from '../context/UserContext'; 
import Footer from "../components/footer";
import TrackingModal from "../components/trackingModal";
import TrackedDataCard from "../components/trackedData";
import CongratsModal from "../components/congratsModal";
import PrimaryBtn from "../Buttons/primaryBtn";
import LoadingScreen from "../components/loadingscreen";

function TrackProgress() {
  const { user } = useUser(); 
  const [personalData, setPersonalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trackingCards, setTrackingCards] = useState([]); 
  const [showModal, setShowModal] = useState(false); 
  const [showCongrats, setShowCongrats] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const filledHeight = (trackingCards.length / (personalData?.fastDuration || 1)) * 100;

  useEffect(() => {
    const fetchPersonalData = async () => {
      if (user) {
        try {
          const response = await axios.get(`${apiUrl}/personalInfo/${user._id}`);
          setPersonalData(response.data);

          const trackingResponse = await axios.get(`${apiUrl}/trackedData/${user._id}`);
          const trackingData = trackingResponse.data;

          // Set tracking cards directly with juice name from data
          setTrackingCards(trackingData);
        } catch (err) {
          setError('Error fetching data.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };    

    fetchPersonalData();
  }, [user]);

  useEffect(() => {
    if (personalData && trackingCards.length === personalData.fastDuration) {
      setShowCongrats(true);
    }
  }, [trackingCards.length, personalData]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>{error}</p>;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseCongrats = () => setShowCongrats(false);

  const addTrackedData = async (newData) => {
    const newCard = {
      ...newData,
      juiceName: newData.juiceName || "Unknown Juice",
    };
    setTrackingCards((prevCards) => [...prevCards, newCard]);
    setShowModal(false);
  };

  return (
    <>
      <div className="tracking-yellow-bg"></div>
      <Container>
          <h2 className="trackh1 mt-5">Track Your Journey</h2>
          <p>Monitor your daily progress to see how far you’ve come! <span className="trackMobileText">Stay motivated by logging your progress and <br />celebrating every milestone on your journey to a healthier you</span></p>
          {trackingCards.length < personalData?.fastDuration && (
              <PrimaryBtn 
                  label={`+ Add Day ${trackingCards.length + 1} data`} 
                  onClick={handleShowModal} 
                  style={{ cursor: 'pointer', color: 'blue' }}
              />
          )}
        <Row>
          <Col lg="7" className="mt-5 goalsAndMotivations">
          <div className="goals">
            <h3 className="rotated-header">Your <span className="goal-span">GOALS</span></h3>
            <p className="gm-text">{personalData?.healthGoals || "No health goals set."}</p>
          </div> 
          <div className="goalsMotivationline"/>
          <div className="motivations">
            <h3 className="rotated-header mt-5">Your <span className="goal-span">MOTIVATIONS</span></h3>
            <p className="gm-text">{personalData?.motivation || "No motivations set."}</p>
          </div>
          </Col>
          <Col lg="5" className="progress-tracker">
            <div className="progress-circle">
              <div className="progress-fill"
                style={{
                  height: `${filledHeight}%`, 
                  transition: 'height 0.5s ease',
                }}
              ></div>
              <p className="tracking-text">
                Day <br /><span className="bolder-text">{trackingCards.length} of {personalData.fastDuration || "N/A"}</span> <br /> completed!
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <h4>Celebrate Every Step Forward!</h4>
          <p>
            Keep an eye on how far you've come. Track what works, log how you feel, and celebrate small wins on your journey toward wellness!
          </p>
          <div className="mb-3">
          

          </div>
          {trackingCards.map((card, index) => (
            <Col lg="4"key={index}>
              <TrackedDataCard 
                day={card.day}
                dayDescription={card.dayDescription}
                modifications={card.modifications}
                feelings={card.feelings}
                juiceName={card.juiceName}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <TrackingModal show={showModal} handleClose={handleCloseModal} addTrackedData={addTrackedData} />
      <CongratsModal show={showCongrats} handleClose={handleCloseCongrats} />
      <Footer />
    </>
  );
}

export default TrackProgress;
