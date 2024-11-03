import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Form, Row } from "react-bootstrap";
import JuiceModal from "../adminComponents/juiceModal"; // Import your modal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import EditJuiceCards from "../adminComponents/editJuiceCards";

import Footer from "../components/footer";

import "../adminStyles/editJuices.css"

const ITEMS_PER_PAGE = 12;

function EditJuices() {
    const [juices, setJuices] = useState([]);
    const [filteredJuices, setFilteredJuices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedJuice, setSelectedJuice] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for the search input

    useEffect(() => {
        const fetchJuices = async () => {
            try {
                const response = await axios.get("http://localhost:5001/juices");
                setJuices(response.data);
                setFilteredJuices(response.data);
            } catch (error) {
                console.error("Error fetching juices:", error);
            }
        };
        fetchJuices();
    }, []);

    useEffect(() => {
        // Filter juices whenever the search query changes
        const filtered = juices.filter((juice) =>
            juice.juiceName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredJuices(filtered);
        setCurrentPage(1); // Reset to first page when filtering
    }, [searchQuery, juices]); // Run this effect when searchQuery or juices change

    const handleJuiceClick = (juice) => {
        setSelectedJuice(juice);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedJuice(null);
    };

    const indexOfLastJuice = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstJuice = indexOfLastJuice - ITEMS_PER_PAGE;
    const currentJuices = filteredJuices.slice(indexOfFirstJuice, indexOfLastJuice);
    const totalPages = Math.ceil(filteredJuices.length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query state
    };

    const handleJuiceUpdated = (updatedJuice) => {
        setJuices((prevJuices) => prevJuices.map((juice) => (juice._id === updatedJuice._id ? updatedJuice : juice)));
    };
    
    const handleJuiceDeleted = (deletedJuiceId) => {
        // Update state or perform actions needed after juice deletion
        console.log("Juice deleted with ID:", deletedJuiceId);
        // Example: Remove the deleted juice from a list
        setJuices(prevJuices => prevJuices.filter(juice => juice._id !== deletedJuiceId));
    };
    
    

    return (
        <div>
            <Container className="mt-5 mb-3">
            <Row className="align-items-center">
                <Col xs={12} md={6}>
                    <h2>Edit or Delete Juices</h2>
                </Col>
                <Col xs={12} md={6} className="d-flex justify-content-md-end mt-2 mt-md-0">
                    <div className="search-container d-flex align-items-center">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className="search-input me-2" // Add margin end for spacing
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </div>
                </Col>
            </Row>
        </Container>
            {/* Juice Cards */}
            <EditJuiceCards juices={currentJuices} onJuiceClick={handleJuiceClick} />

            {/* Modal for editing juice */}
            <JuiceModal
                show={showModal}
                handleClose={handleCloseModal}
                juice={selectedJuice}
                onJuiceUpdated={handleJuiceUpdated}
                onJuiceDeleted={handleJuiceDeleted} // Pass the deletion handler
            />


<Footer />
        </div>
    );
}

export default EditJuices;
