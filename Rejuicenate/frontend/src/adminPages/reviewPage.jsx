import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import EditReviewCard from "../adminComponents/editReview";

import Footer from "../components/footer";

function ReviewPage() {
    const [flaggedReviews, setFlaggedReviews] = useState([]);
    const [users, setUsers] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchFlaggedReviews = async () => {
            try {
                const response = await axios.get(`${apiUrl}/reviews`);
                const flagged = response.data.filter(review => review.isFlagged);
                setFlaggedReviews(flagged);
            } catch (error) {
                console.error("Error fetching flagged reviews:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchFlaggedReviews();
        fetchUsers();
    }, []);

    // Handle unflagging a review
    const handleUnflag = async (reviewId) => {
        try {
            await axios.put(`${apiUrl}/reviews/${reviewId}/unflag`, { isFlagged: false });
            const response = await axios.get("${apiUrl}/reviews");
            const flagged = response.data.filter(review => review.isFlagged);
            setFlaggedReviews(flagged);
        } catch (error) {
            console.error("Error unflagging review:", error);
        }
    };

    // Handle deleting a review
    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(`${apiUrl}/reviews/${reviewId}`);
            setFlaggedReviews(prevReviews => prevReviews.filter(review => review._id !== reviewId));
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    return (
        <>
            <Container className="editReview-Container">
                <h2 className="mt-5">Flagged Reviews</h2>
                {flaggedReviews.length === 0 ? (
                    <p>No flagged reviews available.</p>
                ) : (
                    <Row className="mt-4">
                        {flaggedReviews.map((review) => {
                            const user = users.find(user => user._id === review.userId);
                            return (
                                <Col md={6} key={review._id}>
                                    <EditReviewCard
                                        commentText={review.commentText}
                                        personalTip={review.personalTip}
                                        userProfileImage={user ? user.profile_image : null}
                                        userName={user ? `${user.name} ${user.surname}` : "Unknown User"}
                                        rating={review.rating}
                                        isFlagged={review.isFlagged}
                                        onUnflag={() => handleUnflag(review._id)} // Unflagging handler
                                        onDelete={() => handleDelete(review._id)} // Deleting handler
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </Container>
            <Footer />
        </>
    );
}

export default ReviewPage;
