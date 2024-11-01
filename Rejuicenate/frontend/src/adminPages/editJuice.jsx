import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import JuiceModal from "../adminComponents/juiceModal"; // Import your modal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import EditJuiceCards from "../adminComponents/editJuiceCards";
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
        setJuices((prevJuices) => prevJuices.filter((juice) => juice._id !== deletedJuiceId));
    };
    

    return (
        <div className="editJuice-container">
            <Container className="mt-5 mb-3 justify-content-between align-content-center">
                <h2>Edit or Delete Juices</h2>
                <Row>
                    <Col xs="auto">
                        <div className="search-container">
                            <Form.Control
                            type="text"
                            placeholder="Search"
                            className="search-input"
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
                onClose={handleCloseModal}
                juice={selectedJuice}
                // Pass other props to handle update/delete actions
            />
        </div>
    );
}

export default EditJuices;
