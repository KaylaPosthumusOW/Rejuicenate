import AddJuiceComponent from "../components/addJuiceComponent";
import { Container } from "react-bootstrap";
import '../adminStyles/addJuice.css'
import Footer from "../components/footer";

function AdminAddJuice() {
 

  return (
    <>
    <Container className="addJuice-container">
      <h2 className="mt-5 mb-3">Add a New Juice</h2>
      
      <AddJuiceComponent />
    </Container>

    <Footer />
    </>
  );
}

export default AdminAddJuice;
