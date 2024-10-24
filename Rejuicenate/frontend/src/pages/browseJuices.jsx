import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import '../styles/browseJuices.css';
import { Container, Pagination } from "react-bootstrap";
import JuiceCard from "../components/juiceCard";
import Filter from "../components/offcanvasFilter";
import axios from "axios";

const ITEMS_PER_PAGE = 12; // Set the number of juices per page to 8

function BrowseJuices() {
  const [juices, setJuices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all juices data from the backend
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

  // Calculate the index of the first and last juice on the current page
  const indexOfLastJuice = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstJuice = indexOfLastJuice - ITEMS_PER_PAGE;
  const currentJuices = juices.slice(indexOfFirstJuice, indexOfLastJuice);

  // Calculate total number of pages
  const totalPages = Math.ceil(juices.length / ITEMS_PER_PAGE);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <NavBar />

      <Container className="mt-5 d-flex justify-content-between align-items-center">
        <div>
          <h1>Browse Juices</h1>
          <p>Some text about why juices...</p>
        </div>
        <div className="align-self-end filters">
          <Filter />
        </div>
      </Container>


      <JuiceCard juices={currentJuices} />

      {/* Pagination Controls */}
      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item 
            key={page + 1} 
            active={page + 1 === currentPage} 
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default BrowseJuices;
