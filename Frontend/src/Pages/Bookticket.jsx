import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import SeatSelection from "./SeatSelection"; // Import the SeatSelection component
import axiosInstance from "./axiosinterceptor"; // Import axios
import RenderRazorpay from "./Payment";

export default function BookTicket() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketStatus, setTicketStatus] = useState("Available"); // Default status
  const ticketPrice = 100;

  useEffect(() => {
    // Check ticket availability based on selected seats
    if (selectedSeats.length === 0) {
      setTicketStatus("Available");
    } else if (selectedSeats.length < 10) {
      // Example condition
      setTicketStatus("Fast Filling");
    } else {
      setTicketStatus("Housefull");
    }
  }, [selectedSeats]);

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };

  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    currency: null,
    amount: null,
  });
  const rzpKeyId = "rzp_test_MWAJneIEOdvo1h";
  const rzpKeySecret = "fYI3blnDVnJFWMqWBBZwRvrP";

  const handleCreateOrder = async (amount, currency) => {
    const response = await axiosInstance.post("/payment/order", {
      amount: amount,
      currency,
      keyId: rzpKeyId,
      keySecret: rzpKeySecret,
    });
    if (response && response.data && response.data.order_id) {
      setOrderDetails({
        orderId: response.data.order_id,
        currency: response.data.currency,
        amount: response.data.amount,
      });
      setDisplayRazorpay(true);
    }
  };

  const handleClose = () => {
    setDisplayRazorpay(false);
    window.location.reload();
    handleBookTicket();
  };

  const handleBookTicket = () => {
      // Use the user's email fetched from the backend
      const user = localStorage.getItem('user');
      if (user) {
        const parsed = JSON.parse(user);
        const email = parsed.email;
        axiosInstance
          .post("/api/book-ticket", { seats: selectedSeats, email: email })
          .then((response) => {
            alert(
              `Tickets booked successfully! Confirmation sent to ${email}`
            );
            // Reset selection
            console.log(response);
            setSelectedSeats([]);
          })
          .catch((error) => console.error("Error booking tickets:", error));
      } else {
        alert("Tickets are not available for booking.");
      }
  };

  const totalAmount = selectedSeats.length * ticketPrice;

  return (
    <Box
      p={4}
      marginTop={20}
      display="flex"
      flexDirection="column"
      gap={4}
      bgcolor="#1e1e1e"
      color="white"
    >
      <Typography variant="h6">Ticket Availability</Typography>
      <Typography>{ticketStatus}</Typography>

      {/* Container for Seat Selection and Booking Summary */}
      <Box display="flex" gap={4}>
        {/* Seat Selection */}
        <Box flex={2} bgcolor="#1e1e1e" color="white" p={4} borderRadius={2}>
          <SeatSelection
            // movie={{
            //   cinemaName: 'BAS Mall - Baniyas',
            //   title: 'THE GREATEST OF ALL TIME (TAMIL)',
            //   rating: 'PG15',
            //   screeningInfo: 'SCREEN 4, 06 SEP FRI, 11:00 PM',
            //   screenLabel: 'SCREEN 4'
            // }}
            selectedSeats={selectedSeats}
            onSelect={handleSeatSelection}
          />
        </Box>

        {/* Booking Summary and Proceed Button */}
        <Box
          flex={1}
          bgcolor="#1e1e1e"
          color="white"
          p={4}
          borderRadius={2}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Box>
            <Typography variant="h6">Booking Summary</Typography>
            <Typography>
              <strong>Number of Seats:</strong> {selectedSeats.length}
            </Typography>
            <Typography>
              <strong>Total Amount:</strong> ${totalAmount}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
            onClick={() => handleCreateOrder(10000*selectedSeats.length, "INR")}
          >
            Proceed to Payment
          </Button>
          {displayRazorpay && (
            <RenderRazorpay
              amount={orderDetails.amount}
              currency={orderDetails.currency}
              orderId={orderDetails.orderId}
              keyId={rzpKeyId}
              keySecret={rzpKeySecret}
              onClose={handleClose}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
