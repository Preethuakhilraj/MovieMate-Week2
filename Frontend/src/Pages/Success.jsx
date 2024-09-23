import { Box, Typography, Button } from "@mui/material"; 
import { useLocation, useNavigate } from "react-router-dom"; 

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { seatNumbers } = location.state || {};

  const handleDashboardRedirect = () => {
    navigate("/booked-tickets");
  };

  return (
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="#1e1e1e"  // Black background
      color="white"      // White text
      minHeight="100vh"
      textAlign="center"
    >
      {/* Main Heading */}
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ color: '#ffeb3b', fontWeight: 'bold' }}  // Yellow text for main heading
      >
        Booking Confirmed! Thank you!
      </Typography>

      {/* Subtitle */}
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ color: '#bdbdbd' }}  // Grey text for subtitle
      >
        Your seats have been successfully booked.
      </Typography>

      {/* Seat Numbers or Confirmation Message */}
      {seatNumbers && seatNumbers.length > 0 ? (
        <Typography 
          variant="body1" 
          gutterBottom
          sx={{ color: '#ffffff' }}  // White text for seat numbers
        >
          <strong>Seat Numbers:</strong> {seatNumbers.join(", ")}
        </Typography>
      ) : (
        <Typography 
          variant="body1" 
          gutterBottom
          sx={{ color: '#ffffff' }}  // White text for confirmation message
        >
          Mail confirmation and booking details sent to your mail!
        </Typography>
      )}

      {/* Outlined Button to Booked Tickets List */}
      <Button
        variant="outlined"  // Outlined button style
        sx={{
          mt: 4,
          borderColor: '#ffeb3b',  // Yellow border
          color: '#ffeb3b',        // Yellow text
          '&:hover': {
            backgroundColor: '#ffeb3b',  // Yellow background on hover
            color: '#1e1e1e',            // Black text on hover
          },
        }}
        onClick={handleDashboardRedirect}
      >
        Booked Tickets List
      </Button>
    </Box>
  );
};

export default Success;
