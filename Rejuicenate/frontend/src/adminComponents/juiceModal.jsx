import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import SecondaryBtn from '../Buttons/secondaryBtn';
import PrimaryBtn from '../Buttons/primaryBtn';

const JuiceModal = ({ show, handleClose, juice, onJuiceUpdated, onJuiceDeleted }) => {
    const { register, handleSubmit, setValue, control, reset } = useForm();
    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: 'ingredients'
    });
    const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
        control,
        name: 'instructions'
    });

    const apiUrl = process.env.REACT_APP_API_URL;

    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (show) {
            setImage(null);
            setPreviewImage(null);
            reset();

            if (juice) {
                setValue('juiceName', juice.juiceName || '');
                setValue('category_id', juice.category_id || '');

                const ingredients = JSON.parse(juice.ingredients[0] || '[]');
                ingredients.forEach(item => appendIngredient({ value: item }));

                const instructions = JSON.parse(juice.instructions[0] || '[]');
                instructions.forEach(step => appendInstruction({ value: step }));

                setPreviewImage(`${apiUrl}/${juice.image}`);
            }
        }
    }, [show, juice, setValue, appendIngredient, appendInstruction, reset]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleUpdate = async (data) => {
        const formDataToSend = new FormData();
        formDataToSend.append('juiceName', data.juiceName);
        formDataToSend.append('ingredients', JSON.stringify(data.ingredients.map(i => i.value)));
        formDataToSend.append('instructions', JSON.stringify(data.instructions.map(i => i.value)));
        formDataToSend.append('category_id', data.category_id);
        if (image) formDataToSend.append('image', image);

        try {
            const response = await axios.put(`${apiUrl}/juices/update/${juice._id}`, formDataToSend, {
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
        if (!juice || !juice._id) {
            console.error("Juice ID is undefined");
            return;
        }

        try {
            await axios.delete(`${apiUrl}/juices/deleteJuice/${juice._id}`);
            await axios.delete(`${apiUrl}/likedjuices/juice/${juice._id}`);
            await axios.delete(`${apiUrl}/reviews/juice/${juice._id}`);
            onJuiceDeleted(juice._id);
            handleClose();
        } catch (error) {
            console.error("Error deleting juice and associated data:", error);
            alert("Failed to delete juice and associated data. Please try again.");
        }
    };

    return (
        <Modal className="editJuiceModal" show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title><h3>Update or Delete Juice</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleUpdate)}>
                    <Row>
                        <Col lg="6">
                            <Form.Group controlId="formJuiceImage">
                                <Form.Label>Juice Image:</Form.Label>
                                {previewImage && <img className="previewImage" src={previewImage} alt="Preview" style={{ width: '100%', marginBottom: '10px' }} />}
                                <div className="file-input-container">
                                    <label htmlFor="file-upload" className="custom-juiceimg-upload">
                                        Update Profile Image
                                    </label>
                                    <input id="file-upload" className="transparent" type="file" onChange={handleImageChange} />
                                </div>                            </Form.Group>

                            <Form.Group controlId="formJuiceName">
                                <Form.Label>Juice Name:</Form.Label>
                                <Form.Control type="text" {...register('juiceName')} placeholder="Enter juice name" />
                            </Form.Group>
                        </Col>
                        <Col lg="6">
                            <Form.Label>Ingredients:</Form.Label>
                            {ingredientFields.map((item, index) => (
                                <div key={item.id} className="d-flex mb-2">
                                    <Form.Control type="text" {...register(`ingredients.${index}.value`)} placeholder={`Ingredient ${index + 1}`} />
                                    <Button className="removeIngredient-Instruction" onClick={() => removeIngredient(index)}>-</Button>
                                </div>
                            ))}
                            <Button className="addIngredient-Instruction" onClick={() => appendIngredient({ value: '' })}>+ Add Ingredient</Button>
<br />
                            <Form.Label className="mt-3">Instructions:</Form.Label>
                            {instructionFields.map((item, index) => (
                                <div key={item.id} className="d-flex mb-2">
                                    <Form.Control type="text" {...register(`instructions.${index}.value`)} placeholder={`Step ${index + 1}`} />
                                    <Button className="removeIngredient-Instruction" onClick={() => removeInstruction(index)}>-</Button>
                                </div>
                            ))}
                            <Button className="addIngredient-Instruction" onClick={() => appendInstruction({ value: '' })}>+ Add Step</Button>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <SecondaryBtn variant="danger" onClick={handleDelete} label="Delete Juice"/>
                        <PrimaryBtn variant="primary" type="submit" label="Update Juice"/>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default JuiceModal;
