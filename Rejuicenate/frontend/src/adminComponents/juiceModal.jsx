import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const JuiceModal = ({ show, handleClose, juice, onJuiceUpdated, onJuiceDeleted }) => {
    const { register, handleSubmit, setValue } = useForm();
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (juice) {
            setValue('juiceName', juice.juiceName || '');
            setValue('ingredients', juice.ingredients.join(', ') || ''); // Join for display
            setValue('instructions', juice.instructions.join(', ') || ''); // Join for display
            setValue('category_id', juice.category_id || '');
            setImage(null); // Reset image state
        }
    }, [juice, setValue]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Set the selected file to state
    };

    const handleUpdate = async (data) => {
        const formDataToSend = new FormData();
        formDataToSend.append('juiceName', data.juiceName);
        formDataToSend.append('ingredients', JSON.stringify(data.ingredients.split(',').map(item => item.trim())));
        formDataToSend.append('instructions', JSON.stringify(data.instructions.split(',').map(item => item.trim())));
        formDataToSend.append('category_id', data.category_id);
        if (image) {
            formDataToSend.append('image', image);
        }
    
        try {
            const response = await axios.put(`http://localhost:5001/juices/update/${juice._id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Juice updated successfully:", response.data);
            onJuiceUpdated(response.data.juice);
            handleClose();
        } catch (error) {
            console.error("Error updating juice:", error);
            alert("Failed to update juice. Please try again.");
        }
    };
    
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5001/juices/delete/${juice._id}`);
            console.log("Juice deleted successfully");
            onJuiceDeleted(juice._id);
            handleClose();
        } catch (error) {
            console.error("Error deleting juice:", error);
            alert("Failed to delete juice. Please try again.");
        }
    };
    
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Juice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleUpdate)}>
                    <Form.Group controlId="formJuiceImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange} // Now defined
                        />
                    </Form.Group>
                    <Form.Group controlId="formJuiceName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            {...register('juiceName')}
                            placeholder="Enter juice name"
                        />
                    </Form.Group>
                    <Form.Group controlId="formJuiceIngredients">
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control
                            type="text"
                            {...register('ingredients')}
                            placeholder="Enter ingredients (comma separated)"
                        />
                    </Form.Group>
                    <Form.Group controlId="formJuiceInstructions">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control
                            type="text"
                            {...register('instructions')}
                            placeholder="Enter instructions (comma separated)"
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete Juice
                        </Button>
                        <Button variant="primary" type="submit">
                            Update Juice
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default JuiceModal;
