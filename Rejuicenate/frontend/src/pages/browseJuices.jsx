import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext"; // Import the user context
import '../styles/browseJuices.css';
import { Container, Pagination } from "react-bootstrap";
import JuiceCard from "../components/juiceCard";
import Filter from "../components/offcanvasFilter";
import axios from "axios";
import SecondaryBtn from "../Buttons/secondaryBtn";
import Footer from "../components/footer";

const ITEMS_PER_PAGE = 12;

function BrowseJuices() {
  const { user } = useUser(); // Access the user details from context
  const [juices, setJuices] = useState([]);
  const [filteredJuices, setFilteredJuices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch all juices data from the backend
  useEffect(() => {
    const fetchJuices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/juices`);
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
      {/* Conditionally render AdminNav if user is admin */}
      
      <Container className="mt-5 mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-start">
        <div className="mb-3 mb-sm-0">
          <h1>Sip Your Way to Wellness</h1> 
          <p>Explore our refreshing collection of juices, crafted to fuel your day and nourish your body. <br />Find your favorites, save the ones you love, and start sipping towards a healthier you!</p>
        </div>
        <div className="d-flex align-items-center filters"> 
          <div className="me-3">
            <Filter className="me-2" onFilterChange={handleFilterChange} />
          </div>
          <div>          
            <SecondaryBtn className="clear-btn ms-2" label="Clear All" onClick={handleClearFilters} />
          </div>
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
