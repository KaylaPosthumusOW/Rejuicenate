import React from 'react';

function TrackedDataCard({ day, dayDescription, modifications, feelings, juiceName }) {
    return (
        <div className="tracking-card-bg mb-4">
            <h4 className="mx-2">Day {day} Progress</h4>
            <p className="mx-2">{dayDescription}</p>
            <div className="spacer-line"></div>
            <p className="tracked-header mx-2"><strong>What juice did you drink?</strong></p>
            <p className="mx-2">{juiceName}</p>
            <div className="spacer-line"></div>
            <p className="tracked-header mx-2"><strong>Modifications Made:</strong></p>
            <p className="mx-2">{modifications}</p>
            <div className="spacer-line"></div>
            <p className="tracked-header mx-2"><strong>How You're Feeling:</strong></p>
            <p className="mx-2">{feelings}</p>
        </div>
    );
}

export default TrackedDataCard;
