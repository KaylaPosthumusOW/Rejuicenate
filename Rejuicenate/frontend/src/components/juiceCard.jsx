import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import '../styles/browseJuices.css';
import PrimaryBtn from "../Buttons/primaryBtn";

function JuiceCard({ juices }) {
  return (
    <Container>
      <Row className="g-3">
        {juices.length > 0 ? (
          juices.map((juice) => (
            <Col key={juice._id} xs={6} sm={6} md={3} lg={3}>
              <Link to={`/juiceRecipe/${juice._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card overlay">
                  <img
                    src={`http://localhost:5001/${juice.image}`}
                    alt={juice.juiceName}
                    className="juice-img"
                  />
                  <div className="card-content">
                    <h2 className="mb-3">{juice.juiceName}</h2>
                    <PrimaryBtn label="Recipe" />
                  </div>
                </div>
              </Link>
            </Col>
          ))
        ) : (
          <p>No juices found. <Link className="browse-link" to="/browseJuices">Browse Juices!</Link></p>
        )}
      </Row>
    </Container>
  );
}

export default JuiceCard;
