import { useEffect, useState } from "react";
import AdminNav from "../components/adminComponents/adminNav";
import NavBar from "../components/navbar";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ReviewCard from "../components/review"; // Assuming you have a ReviewCard component for displaying each review

function ReviewPage() {
    const [flaggedReviews, setFlaggedReviews] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchFlaggedReviews = async () => {
            try {
                const response = await axios.get("http://localhost:5001/reviews");
                const flagged = response.data.filter(review => review.isFlagged); // Filter for flagged reviews
                setFlaggedReviews(flagged);
            } catch (error) {
                console.error("Error fetching flagged reviews:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5001/users"); // Fetch users
                setUsers(response.data); // Store user data
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchFlaggedReviews();
        fetchUsers();
    }, []);

    // Define the handleFlag function to manage flagging reviews
    const handleFlag = async (reviewId) => {
        try {
            await axios.put(`http://localhost:5001/reviews/${reviewId}/flag`);
            // Refetch flagged reviews
            const response = await axios.get("http://localhost:5001/reviews");
            const flagged = response.data.filter(review => review.isFlagged);
            setFlaggedReviews(flagged);
        } catch (error) {
            console.error("Error flagging review:", error);
        }
    };

    return (
        <>
            <NavBar />
            <AdminNav />
            <Container>
                <h2 className="mt-5">Flagged Reviews</h2>
                {flaggedReviews.length === 0 ? (
                    <p>No flagged reviews available.</p>
                ) : (
                    <Row className="mt-4">
                        {flaggedReviews.map((review) => {
                            // Find the user that matches the review's userId
                            const user = users.find(user => user._id === review.userId);
                            return (
                                <Col md={4} key={review._id}>
                                    <ReviewCard
                                        commentText={review.commentText}
                                        personalTip={review.personalTip}
                                        userProfileImage={user ? user.profile_image : null} // Use user profile image
                                        userName={user ? `${user.name} ${user.surname}` : "Unknown User"} // Use user's name
                                        rating={review.rating}
                                        isFlagged={review.isFlagged} // Pass the flagged status
                                        onFlag={() => handleFlag(review._id)} // Handle flagging with review ID
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </Container>
        </>
    );
}

export default ReviewPage;
