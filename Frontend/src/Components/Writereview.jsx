import { useState } from "react";   
import { Box, Button, TextField, Typography, Rating, CircularProgress } from "@mui/material";
import axiosInstance from "../Pages/axiosinterceptor";
import { useNavigate, useParams } from "react-router-dom";

const WriteReview = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: movieId } = useParams();
  const navigate = useNavigate();

  const handleSubmitReview = async () => {
    setLoading(true);
  
    try {
      const storedUser = sessionStorage.getItem('user');
      if (!storedUser || storedUser === "undefined") {
        alert("Please log in to submit a review.");
        setLoading(false);
        return;
      }
  
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.userId) {
        alert("Invalid user data. Please log in again.");
        setLoading(false);
        return;
      }
  
      const userId = parsedUser.userId;
      if (!reviewText.trim()) {
        alert("Please enter a review.");
        setLoading(false);
        return;
      }
  
      if (rating === 0) {
        alert("Please provide a rating.");
        setLoading(false);
        return;
      }
  
      const response = await axiosInstance.post(`/user/movies/${movieId}/review`, {
        userId,
        review: reviewText,
        rating,
      });
  
      console.log("Review submitted successfully:", response.data);
      alert("Review submitted successfully!");
      navigate('/userdashboard');
      setReviewText("");
      setRating(0);
  
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error.message);
      alert("Failed to submit the review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#121212"
    >
      <Box
        padding={4}
        bgcolor="#1e1e1e"
        borderRadius={2}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        maxWidth="600px"
        width="100%"
        margin="auto"
      >
        <Typography variant="h5" color="#FFC107" gutterBottom textAlign="center">
          Write a Review
        </Typography>
        <TextField
          fullWidth
          label="Your Review"
          multiline
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{
            marginBottom: 3,
            backgroundColor: '#2c2c2c',
            borderRadius: 1,
            '& .MuiInputBase-root': { color: '#fff' },
            '& .MuiInputLabel-root': { color: '#BDBDBD' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFC107' },
          }}
        />
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom={3}>
          <Rating
            name="movie-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
            sx={{
              color: '#FFC107',
              '& .MuiRating-icon': {
                border: '1px solid #fff', // Outline around stars
                borderRadius: '50%',
              }
            }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleSubmitReview}
          disabled={loading}
          sx={{
            bgcolor: '#FFC107',
            color: '#000',
            '&:hover': { bgcolor: '#FFD54F' },
            width: '100%',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Review"}
        </Button>
        <Button
  variant="outlined"
  fullWidth
  onClick={() => navigate('/userdashboard')} // Corrected navigation handler
  sx={{
    mt: 2,
   // margin-left shorthand
    color: '#ffeb3b',
    borderColor: '#ffeb3b',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#ffeb3b',
      color: '#000',
    },
  }}
>
  Cancel
</Button>
      </Box>
    </Box>
  );
};

export default WriteReview;
