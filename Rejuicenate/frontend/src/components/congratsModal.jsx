import React, { useEffect, useState } from 'react';
import { Modal, Button, ModalHeader } from 'react-bootstrap';
import Confetti from 'react-confetti';

const CongratsModal = ({ show, handleClose }) => {
  const [confettiActive, setConfettiActive] = useState(false);
  const [confettiWidth, setConfettiWidth] = useState(window.innerWidth);
  const [confettiHeight, setConfettiHeight] = useState(window.innerHeight);
  const [fadeOut, setFadeOut] = useState(false);

  // Function to start confetti
  const startConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setConfettiActive(false);
        setFadeOut(false); // Reset fade out state
      }, 1000); // Wait for fade out animation to finish
    }, 5000); // Keep confetti active for 5 seconds
  };

  useEffect(() => {
    if (show) {
      startConfetti();
    }

    // Update confetti dimensions on resize
    const handleResize = () => {
      setConfettiWidth(window.innerWidth);
      setConfettiHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [show]);

  return (
    <>
      {confettiActive && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10, // Higher than modal
            opacity: fadeOut ? 0 : 1, // Fade out effect
            transition: 'opacity 1s ease', // Smooth transition for fading out
          }}
        >
          <Confetti
            width={confettiWidth}
            height={confettiHeight}
            numberOfPieces={200} // Adjust for desired density
            run={confettiActive}
          />
        </div>
      )}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body style={{ position: 'relative', overflow: 'hidden' }}>
          <ModalHeader>
          <h3>Congratulations!</h3>
          </ModalHeader>
          <p className="mt-3">You've successfully completed your juice fast! Great job!</p>
          <p>Keep up the great work on your health journey!</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CongratsModal;
