import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import PrimaryBtn from '../Buttons/primaryBtn';

function TrackingModal({ show, handleClose, addTrackedData }) {
    const { user } = useUser();
    const [day, setDay] = useState(1);
    const [dayDescription, setDayDescription] = useState('');
    const [modifications, setModifications] = useState('');
    const [feelings, setFeelings] = useState('');
    const [juiceId, setJuiceId] = useState('');
    const [juices, setJuices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const resetForm = () => {
        setDayDescription('');
        setModifications('');
        setFeelings('');
        setJuiceId('');
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (!user || !user._id) {
            console.error("User ID is not available.");
            return;
        }
        const selectedJuice = juices.find(juice => juice._id === juiceId);
        const trackingData = {
            userId: user._id,
            day,
            dayDescription,
            modifications,
            feelings,
            juiceId,
            juiceName: selectedJuice?.juiceName || '', // Add juiceName if found
        };
    
        try {
            const response = await axios.post("http://localhost:5001/trackedData/add", trackingData);
            addTrackedData(response.data); // Pass the new tracking data to the parent
            setDay(day + 1);
            resetForm();
        } catch (error) {
            console.error("Error adding tracking data:", error);
        }
    };    

    useEffect(() => {
        const fetchJuices = async () => {
            try {
                const response = await axios.get('http://localhost:5001/juices');
                setJuices(response.data);
            } catch (error) {
                console.error('Error fetching juices:', error);
            }
        };

        fetchJuices();
    }, []);

    useEffect(() => {
        const fetchCurrentDay = async () => {
            if (user) {
                const response = await axios.get(`http://localhost:5001/trackedData/${user._id}`);
                setDay(response.data.length + 1); // Sets day based on the current count + 1
            }
        };
        fetchCurrentDay();
    }, [user]);

    const filteredJuices = juices.filter(juice =>
        juice.juiceName && juice.juiceName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title><h2>Add Tracking Data</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDayDescription">
                        <Form.Label>Day Description</Form.Label>
                        <Form.Control
                        style={{ border: "2px solid #F1A208" }}
                            as="textarea"
                            rows={2}
                            value={dayDescription}
                            onChange={(e) => setDayDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formModifications">
                        <Form.Label>Modifications Made</Form.Label>
                        <Form.Control
                        style={{ border: "2px solid #F1A208" }}
                            as="textarea"
                            rows={2}
                            value={modifications}
                            onChange={(e) => setModifications(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formFeelings">
                        <Form.Label>How You're Feeling</Form.Label>
                        <Form.Control
                        style={{ border: "2px solid #F1A208" }}
                            type="text"
                            value={feelings}
                            onChange={(e) => setFeelings(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formJuiceSelect">
                        <Form.Label>What Juice did you drink?</Form.Label> 
                        <Form.Control
                        style={{ border: "2px solid #F1A208" }}
                            as="select"
                            value={juiceId}
                            onChange={(e) => setJuiceId(e.target.value)}
                            required
                        >
                            <option value="">Select Juice</option>
                            {filteredJuices.map(juice => (
                                <option key={juice._id} value={juice._id}>
                                    {juice.juiceName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <PrimaryBtn label="Save Tracking Data" variant="primary" type="submit"/>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default TrackingModal;
