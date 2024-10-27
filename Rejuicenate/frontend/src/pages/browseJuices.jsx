import { useEffect, useState } from "react";
import '../styles/browseJuices.css';
import { Container, Pagination } from "react-bootstrap";
import JuiceCard from "../components/juiceCard";
import Filter from "../components/offcanvasFilter";
import axios from "axios";
import SecondaryBtn from "../Buttons/secondaryBtn";
import Footer from "../components/footer";

const ITEMS_PER_PAGE = 12;

function BrowseJuices() {
  const [juices, setJuices] = useState([]);
  const [filteredJuices, setFilteredJuices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch all juices data from the backend
  useEffect(() => {
    const fetchJuices = async () => {
      try {
        const response = await axios.get("http://localhost:5001/juices");
        setJuices(response.data);
        setFilteredJuices(response.data); // Initialize filtered juices
      } catch (error) {
        console.error("Error fetching juices:", error);
      }
    };
    fetchJuices();
  }, []);

  // Update filtered juices based on selected categories
  useEffect(() => {
    if (selectedCategories.length > 0) {
      const filtered = juices.filter(juice =>
        selectedCategories.includes(juice.category_id) // Assuming juice.category_id is the category ID
      );
      setFilteredJuices(filtered);
    } else {
      setFilteredJuices(juices); // No filters applied, show all juices
    }
  }, [selectedCategories, juices]);

  // Calculate pagination
  const indexOfLastJuice = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstJuice = indexOfLastJuice - ITEMS_PER_PAGE;
  const currentJuices = filteredJuices.slice(indexOfFirstJuice, indexOfLastJuice);
  const totalPages = Math.ceil(filteredJuices.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (categories) => {
    setSelectedCategories(categories);
    setCurrentPage(1); // Reset to the first page whenever the filter changes
  };

  // Function to handle clearing all filters
  const handleClearFilters = () => {
    setSelectedCategories([]); // Clear selected categories
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div>
      <Container className="mt-5 mb-3 d-flex justify-content-between align-items-center">
        <div>
          <h1>Sip Your Way to Wellness</h1>
          <p>Explore our refreshing collection of juices...</p>
        </div>
        <div className="align-self-end filters">
          <Filter className="me-2" onFilterChange={handleFilterChange} />
          <SecondaryBtn className="clear-btn ms-2" label="Clear All" onClick={handleClearFilters} /> {/* Add margin-left */}
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

      <Footer />
    </div>
  );
}

export default BrowseJuices;
