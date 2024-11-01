import { useEffect, useState } from "react"; 
import { Col, Container, Row } from "react-bootstrap";
import "../styles/trackProgress.css";
import axios from 'axios';
import { useUser } from '../context/UserContext'; 
import Footer from "../components/footer";
import TrackingModal from "../components/trackingModal";
import TrackedDataCard from "../components/trackedData";
import CongratsModal from "../components/congratsModal"; // Import the CongratsModal

function TrackProgress() {
  const { user } = useUser(); 
  const [personalData, setPersonalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trackingCards, setTrackingCards] = useState([]); 
  const [showModal, setShowModal] = useState(false); 
  const [showCongrats, setShowCongrats] = useState(false); // State for the congrats modal

  const filledHeight = (trackingCards.length / (personalData?.fastDuration || 1)) * 100;

  useEffect(() => {
    const fetchPersonalData = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5001/personalInfo/${user._id}`);
          setPersonalData(response.data);
    
          const trackingResponse = await axios.get(`http://localhost:5001/trackedData/${user._id}`);
          const trackingDataWithJuices = trackingResponse.data.map((data) => {
            const juiceName = data.juiceId.juiceName || "Unknown Juice"; 
            return {
              ...data,
              juiceName: juiceName,
            };
          });
          setTrackingCards(trackingDataWithJuices);
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
  
  const getJuiceName = async (juiceId) => {
    if (!juiceId) return null; 
    try {
      const response = await axios.get(`http://localhost:5001/juices/${juiceId}`);
      return response.data.juiceName;
    } catch (error) {
      console.error(`Error fetching juice with ID ${juiceId}:`, error);
      return null; 
    }
  };

  useEffect(() => {
    // Check if the user has completed their fast duration
    if (personalData && trackingCards.length === personalData.fastDuration) {
      setShowCongrats(true); // Show the congrats modal
    }
  }, [trackingCards.length, personalData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseCongrats = () => setShowCongrats(false); // Function to close the congrats modal

  const addTrackedData = async (newData) => {
    const juiceName = await getJuiceName(newData.juiceId); 
    const newCard = {
      ...newData,
      juiceName: juiceName || "Unknown Juice",
    };
    setTrackingCards((prevCards) => [...prevCards, newCard]);
    setShowModal(false);
  };

  return (
    <>
      <div className="tracking-yellow-bg"></div>
      <Container>
        <h2 className="mt-5">Track Your Journey, One Sip at a Time</h2>
        <Row>
          <Col lg="4" className="text-center">
            <h3 className="rotated-header">User Goals</h3>
            <p className="gm-text">{personalData?.healthGoals || "No health goals set."}</p>
          </Col>
          <Col lg="4" className="text-center mt-5">
            <h3 className="rotated-header">User Motivations</h3>
            <p className="gm-text">{personalData?.motivation || "No motivations set."}</p>
          </Col>
          
          <Col lg="4" className="progress-tracker">
            <div className="progress-circle">
              <div className="progress-fill"
                style={{
                  height: `${(trackingCards.length / (personalData?.fastDuration || 1)) * 100}%`, 
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
          {/* Conditionally render the Add Data button */}
          {trackingCards.length < personalData?.fastDuration && (
            <div onClick={handleShowModal} style={{ cursor: 'pointer', color: 'blue' }}>
              +Add Data
            </div>
          )}
          {trackingCards.map((card, index) => (
            <Col lg="4" sm="6" key={index}>
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
      <CongratsModal show={showCongrats} handleClose={handleCloseCongrats} /> {/* Add CongratsModal here */}
      <Footer />
    </>
  );
}

export default TrackProgress;
