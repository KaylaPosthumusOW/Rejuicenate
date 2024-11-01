import React from 'react';

function TrackedDataCard({ day, dayDescription, modifications, feelings, juiceName }) {
    return (
        <div className="tracking-card-bg mb-4">
            <h4>Day {day} Progress</h4>
            <p>{dayDescription}</p>
            <div className="spacer-line"></div>
            <p><strong>What juice did you drink?</strong></p>
            <p>{juiceName}</p>
            <div className="spacer-line"></div>
            <p><strong>Modifications Made:</strong></p>
            <p>{modifications}</p>
            <div className="spacer-line"></div>
            <p><strong>How You're Feeling:</strong></p>
            <p>{feelings}</p>
        </div>
    );
}

export default TrackedDataCard;
