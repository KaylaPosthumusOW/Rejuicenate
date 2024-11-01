import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useUser } from '../context/UserContext';

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
        const trackingData = {
            userId: user._id,
            day,
            dayDescription,
            modifications,
            feelings,
            juiceId,
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Tracking Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDayDescription">
                        <Form.Label>Day Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={dayDescription}
                            onChange={(e) => setDayDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formModifications">
                        <Form.Label>Modifications Made</Form.Label>
                        <Form.Control
                            type="text"
                            value={modifications}
                            onChange={(e) => setModifications(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formFeelings">
                        <Form.Label>How You're Feeling</Form.Label>
                        <Form.Control
                            type="text"
                            value={feelings}
                            onChange={(e) => setFeelings(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formJuiceSelect">
                        <Form.Label>Juice</Form.Label>
                        <Form.Control
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
                    <Button variant="primary" type="submit">Save Tracking Data</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default TrackingModal;
