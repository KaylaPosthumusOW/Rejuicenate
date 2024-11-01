import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CongratsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Congratulations!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You've successfully completed your juice fast! Great job!</p>
        <p>Keep up the great work on your health journey!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CongratsModal;
