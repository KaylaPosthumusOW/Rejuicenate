import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import '../styles/browseJuices.css';
import PrimaryBtn from "../Buttons/primaryBtn";
import LoadingScreen from "./loadingscreen";

function JuiceCard({ juices }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  return (
    <Container>
      <Row className="g-3">
        {juices.length > 0 ? (
          juices.map((juice) => (
            <Col key={juice._id} xs={6} sm={6} md={3} lg={3}>
              <Link to={`/juiceRecipe/${juice._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card overlay">
                  <img
                    src={`${apiUrl}/${juice.image}`}
                    alt={juice.juiceName}
                    className="juice-img"
                  />
                  <div className="card-content">
                    <h3 className="mb-3">{juice.juiceName}</h3>
                    <PrimaryBtn label="Recipe" />
                  </div>
                </div>
              </Link>
            </Col>
          ))
        ) : (
          <LoadingScreen />
        )}
      </Row>
    </Container>
  );
}

export default JuiceCard;
