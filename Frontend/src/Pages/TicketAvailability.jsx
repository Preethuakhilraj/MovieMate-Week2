import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CancelIcon from '@mui/icons-material/Cancel';

function getStatusStyles(status) {
  switch (status) {
    case 'Available':
      return { color: 'green', icon: <CheckCircleOutlineIcon /> };
    case 'Fast Filling':
      return { color: 'orange', icon: <WarningAmberIcon /> };
    case 'Housefull':
      return { color: 'red', icon: <CancelIcon /> };
    default:
      return { color: 'gray', icon: null };
  }
}

function TicketAvailability({ ticketStatus }) {
  const { color, icon } = getStatusStyles(ticketStatus);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f4f4f4"
      borderRadius="10px"
      p={2}
      mt={2}
      boxShadow="0 3px 6px rgba(0,0,0,0.1)"
    >
      <Typography variant="h6" color="black" mr={2}>
        Ticket Availability
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center">
        {icon && <Box mr={1}>{icon}</Box>}
        <Typography
          variant="h6"
          color={color}
          sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
        >
          {ticketStatus}
        </Typography>
      </Box>
    </Box>
  );
}

export default TicketAvailability;
