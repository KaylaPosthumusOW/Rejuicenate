import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';

const JuiceModal = ({ show, handleClose, juice, onJuiceUpdated, onJuiceDeleted }) => {
    const { register, handleSubmit, setValue, control } = useForm();
    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: 'ingredients'
    });
    const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
        control,
        name: 'instructions'
    });

    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (juice) {
            setValue('juiceName', juice.juiceName || '');
            setValue('category_id', juice.category_id || '');

            const ingredients = JSON.parse(juice.ingredients[0] || '[]');
            ingredients.forEach(item => appendIngredient({ value: item }));

            const instructions = JSON.parse(juice.instructions[0] || '[]');
            instructions.forEach(step => appendInstruction({ value: step }));

            setPreviewImage(`http://localhost:5001/${juice.image}`);
        }
    }, [juice, setValue, appendIngredient, appendInstruction]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file)); // Preview the selected file
    };

    const handleUpdate = async (data) => {
        const formDataToSend = new FormData();
        formDataToSend.append('juiceName', data.juiceName);
        formDataToSend.append('ingredients', JSON.stringify(data.ingredients.map(i => i.value)));
        formDataToSend.append('instructions', JSON.stringify(data.instructions.map(i => i.value)));
        formDataToSend.append('category_id', data.category_id);
        if (image) formDataToSend.append('image', image);

        try {
            const response = await axios.put(`http://localhost:5001/juices/update/${juice._id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onJuiceUpdated(response.data.juice);
            handleClose();
        } catch (error) {
            console.error("Error updating juice:", error);
            alert("Failed to update juice. Please try again.");
        }
    };

    const handleDelete = async () => {
        const juiceId = juice._id.toString(); // Convert to string
        console.log("Deleting juice with ID:", juiceId);
    
        try {
            // Attempt to delete liked juices
            const likedResponse = await axios.delete(`http://localhost:5001/likedJuices/deleteByJuiceId/${juiceId}`);
            if (likedResponse.data.deletedCount > 0) {
                console.log("Liked juices deleted:", likedResponse.data);
            } else {
                console.log("No liked juices to delete for this juice ID.");
            }
        } catch (error) {
            console.error("Error deleting liked juices:", error);
            return; // Stop if this fails
        }
    
        try {
            // Attempt to delete reviews
            const reviewsResponse = await axios.delete(`http://localhost:5001/reviews/deleteByJuiceId/${juiceId}`);
            if (reviewsResponse.data.deletedCount > 0) {
                console.log("Reviews deleted:", reviewsResponse.data);
            } else {
                console.log("No reviews to delete for this juice ID.");
            }
        } catch (error) {
            console.error("Error deleting reviews:", error);
            alert("Failed to delete reviews. Please check the server.");
            return; // Stop if this fails
        }
    
        try {
            // Finally delete the juice
            const deleteResponse = await axios.delete(`http://localhost:5001/juices/delete/${juiceId}`);
            console.log("Juice deleted:", deleteResponse.data);
            onJuiceDeleted(juiceId);
            handleClose();
        } catch (error) {
            console.error("Error deleting juice:", error);
            alert("Failed to delete juice. Please check the server.");
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
                        {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100%', marginBottom: '10px' }} />}
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                    </Form.Group>

                    <Form.Group controlId="formJuiceName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" {...register('juiceName')} placeholder="Enter juice name" />
                    </Form.Group>

                    <Form.Label>Ingredients</Form.Label>
                    {ingredientFields.map((item, index) => (
                        <div key={item.id} className="d-flex mb-2">
                            <Form.Control type="text" {...register(`ingredients.${index}.value`)} placeholder={`Ingredient ${index + 1}`} />
                            <Button variant="danger" onClick={() => removeIngredient(index)}>-</Button>
                        </div>
                    ))}
                    <Button variant="success" onClick={() => appendIngredient({ value: '' })}>+ Add Ingredient</Button>

                    <Form.Label>Instructions</Form.Label>
                    {instructionFields.map((item, index) => (
                        <div key={item.id} className="d-flex mb-2">
                            <Form.Control type="text" {...register(`instructions.${index}.value`)} placeholder={`Step ${index + 1}`} />
                            <Button variant="danger" onClick={() => removeInstruction(index)}>-</Button>
                        </div>
                    ))}
                    <Button variant="success" onClick={() => appendInstruction({ value: '' })}>+ Add Step</Button>

                    <div className="d-flex justify-content-between mt-4">
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete Juice</Button>
                        <Button variant="primary" type="submit">Update Juice</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default JuiceModal;
