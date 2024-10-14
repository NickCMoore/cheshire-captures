import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq, axiosRes } from '../api/axiosDefaults';

const RatingComponent = ({ id }) => { // Update prop name here to match 'id'
    const currentUser = useCurrentUser();
    const [userRating, setUserRating] = useState(null); 
    const [averageRating, setAverageRating] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const { data } = await axiosReq.get(`/api/photos/photos/${id}/ratings/`); // Make sure 'id' is used here

                if (Array.isArray(data)) {
                    const userRatingData = data.find(r => r.user === currentUser?.username);
                    if (userRatingData) {
                        setUserRating(userRatingData.rating); 
                    }
                }

                setAverageRating(data.average_rating || 0);
            } catch (error) {
                console.error("Error fetching ratings:", error);
            }
        };

        if (currentUser) {
            fetchRatings();
        }
    }, [id, currentUser]); // 'id' is correctly referenced here

    const handleRating = async (newRating) => {
        if (!currentUser) {
            console.error("You need to be logged in to rate this photo.");
            return;
        }

        setIsSubmitting(true);

        try {
            const { data } = await axiosRes.post(`/api/photos/photos${id}/rate/`, { rating: newRating }); // 'id' is used here too
            setUserRating(newRating);
            if (data.new_average_rating !== undefined) {
                setAverageRating(data.new_average_rating);  
            }
            console.log(data.detail);
        } catch (error) {
            console.error("Error submitting rating:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="rating-component">
            <h4>Rate this Photo</h4>
            <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                    <span
                        key={star}
                        onClick={() => !isSubmitting && handleRating(star)}
                        style={{ color: star <= userRating ? 'gold' : 'gray', cursor: 'pointer' }}
                    >
                        ★
                    </span>
                ))}
            </div>
            <p>Your Rating: {userRating || "Not yet rated"}</p>
            <p>Average Rating: {averageRating !== null ? averageRating.toFixed(2) : "No ratings yet"}</p>
        </div>
    );
};

// Add prop-types for validation
RatingComponent.propTypes = {
    id: PropTypes.number.isRequired, // Ensure that 'id' is passed as a prop
};

export default RatingComponent;
