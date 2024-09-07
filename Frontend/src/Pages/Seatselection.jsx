import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';

// Simulated seat data
const initialSeatData = [
  { id: 'A-1', status: 'available' },
  { id: 'A-2', status: 'occupied' },
  { id: 'A-3', status: 'available' },
  { id: 'A-4', status: 'occupied' },
    { id: 'A-5', status: 'available' },
    { id: 'B-1', status: 'available' },  
    { id: 'B-2', status: 'available' },
    { id: 'B-3', status: 'available' },
    { id: 'B-4', status: 'available' },
    { id: 'B-5', status: 'available' },
    { id: 'C-1', status: 'available' },  // ... continue for all rows and columns
    { id: 'C-2', status: 'available' },
    { id: 'C-3', status: 'available' },
    { id: 'C-4', status: 'available' },
    { id: 'C-5', status: 'available' },
    { id: 'D-1', status: 'available' },
    { id: 'D-2', status: 'available' },
    { id: 'D-3', status: 'available' },
    { id: 'D-4', status: 'available' },
    { id: 'D-5', status: 'available' },
    { id: 'E-1', status: 'available' },
    { id: 'E-2', status: 'available' },
    { id: 'E-3', status: 'available' },
    { id: 'E-4', status: 'available' },
    { id: 'E-5', status: 'available' }
];

function SeatSelection({ onSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (seat.status === 'occupied') return; // No action for occupied seats

    const isSelected = selectedSeats.includes(seat.id);
    const newSelectedSeats = isSelected
      ? selectedSeats.filter((s) => s !== seat.id)
      : [...selectedSeats, seat.id];

    setSelectedSeats(newSelectedSeats);
    onSelect(newSelectedSeats);
  };

  return (
    <Box p={4} bgcolor="#1e1e1e" color="white" minHeight="100vh">
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">BAS Mall - Baniyas</Typography>
          <Typography variant="body1">PG15</Typography>
      </Box>

      {/* Sub-header */}
      <Typography variant="body2" mb={2}>SCREEN 4, 06 SEP FRI, 11:00 PM</Typography>

      {/* Seat Selection Info */}
      <Typography variant="body2" mb={4}>
        You have selected {selectedSeats.length} seat(s). Seat number(s): {selectedSeats.join(', ')}
      </Typography>

      {/* Screen Label */}
      <Box mb={2}>
        <Typography variant="h6" align="center">
          SCREEN 4
        </Typography>
        <Box
          mt={1}
          height="3px"
          width="100%"
          bgcolor="yellow"
          margin="auto"
        />
      </Box>

      {/* Seat Layout */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, 40px)"
        justifyContent="center"
        gap="40px"
        mt={4}
       
      >
        {initialSeatData.map((seat) => (
          <Button
            key={seat.id}
            onClick={() => handleSeatClick(seat)}
            variant={selectedSeats.includes(seat.id) ? 'contained' : 'outlined'}
            color={seat.status === 'occupied' ? 'secondary' : 'primary'}
            disabled={seat.status === 'occupied'}
            sx={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: selectedSeats.includes(seat.id) ? '#FFFF00' : seat.status === 'occupied' ? '#333' : '#555',
              color: selectedSeats.includes(seat.id) ? 'black' : seat.status === 'occupied' ? '#888' : 'white',
              '&:hover': {
                backgroundColor: selectedSeats.includes(seat.id) ? '#FFFF00' : seat.status === 'occupied' ? '#333' : '#777',
              },
            }}
          >
            {seat.id.split('-')[1]} {/* Displays seat number */}
          </Button>
        ))}
      </Box>

      {/* Bottom Text */}
      <Typography variant="body2" align="center" mt={4}>
        Handicap seats are available from the Box office
      </Typography>
    </Box>
  );
}

// Define PropTypes for the component
SeatSelection.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default SeatSelection;
