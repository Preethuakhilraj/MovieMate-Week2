// import { useState, useEffect } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import SeatSelection from "./SeatSelection";
// import axiosInstance from "./axiosinterceptor";
// import RenderRazorpay from "./Payment";
// import { useNavigate, useParams } from "react-router-dom";

// export default function BookTicket() {
//   const { id } = useParams(); // Ensure the parameter name matches exactly with your route definition.
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [ticketStatus, setTicketStatus] = useState("Available");
//   const [displayRazorpay, setDisplayRazorpay] = useState(false);
//   const [orderDetails, setOrderDetails] = useState({});
//   const ticketPrice = 100;
//   const navigate = useNavigate();
  
//   const RAZORPAY_KEY_ID = "rzp_test_MWAJneIEOdvo1h";  // Move KeyID to a constant or environment variable

//   useEffect(() => {
//     console.log("Movie ID from useParams:", id); // Helpful for debugging
//   }, [id]);

//   useEffect(() => {
//     // Update ticket status based on selected seats count
//     if (selectedSeats.length === 0) {
//       setTicketStatus("Available");
//     } else if (selectedSeats.length < 10) {
//       setTicketStatus("Fast Filling");
//     } else {
//       setTicketStatus("Housefull");
//     }
//   }, [selectedSeats]);

//   const handleSeatSelection = (seats) => {
//     setSelectedSeats(seats); // Update selected seats
//   };

//   const handleCreateOrder = async (amount, currency) => {
//     try {
//       const response = await axiosInstance.post("/payment/order", {
//         amount,
//         currency,
//       });
//       console.log("Backend order creation response:", response.data);
      
//       if (response.data && response.data.id) {
//         setOrderDetails({
//           orderId: response.data.id,
//           currency: response.data.currency,
//           amount: response.data.amount,
//         });
//         setDisplayRazorpay(true);  // Trigger Razorpay modal once order is created
//       } else {
//         console.error("Invalid order data from backend:", response.data);
//         alert("Failed to create payment order. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error while creating payment order:", error.response?.data || error.message);
//       alert("Failed to create payment order. Please try again.");
//     }
//   };

//   const handlePaymentSuccess = async (paymentDetails) => {
//     setDisplayRazorpay(false);  // Close Razorpay modal
//     const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from local storage
    
//     if (!user) {
//       alert("User not found. Please log in again.");
//       return;
//     }
    
//     try {
//       const response = await axiosInstance.post(`/booking/bookticket/${id}`, {
//         seats: selectedSeats,
//         email: user.email,
//         paymentDetails,  // Pass payment details for record keeping if necessary
//       });

//       alert(`Tickets booked successfully! Confirmation sent to ${user.email}`);
//       const seatNumbers = response.data.seats;
//       navigate("/success", { state: { seatNumbers } }); // Redirect to success page with seat details
//       setSelectedSeats([]);  // Clear selected seats after booking
//       window.location.reload();
//     } catch (error) {
//       console.error("Error booking tickets:", error);
//       alert("Error booking tickets, please try again.");
//     }
//   };

//   const handleClosePayment = () => {
//     setDisplayRazorpay(false);  // Close the Razorpay modal if payment is cancelled
//   };

//   const totalAmount = selectedSeats.length * ticketPrice;  // Calculate total amount

//   return (
//     <Box
//       p={4}
//       marginTop={20}
//       display="flex"
//       flexDirection="column"
//       gap={4}
//       bgcolor="#1e1e1e"
//       color="white"
//     >
//       <Typography variant="h6">Ticket Availability</Typography>
//       <Typography>{ticketStatus}</Typography>

//       <Box display="flex" gap={4}>
//         <Box flex={2} bgcolor="#1e1e1e" color="white" p={4} borderRadius={2}>
//           <SeatSelection
//             selectedSeats={selectedSeats}
//             onSelect={handleSeatSelection}
//           />
//         </Box>

//         <Box
//           flex={1}
//           bgcolor="#1e1e1e"
//           color="white"
//           p={4}
//           borderRadius={2}
//           sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//         >
//           <Box>
//             <Typography variant="h6">Booking Summary</Typography>
//             <Typography>
//               <strong>Number of Seats:</strong> {selectedSeats.length}
//             </Typography>
//             <Typography>
//               <strong>Total Amount:</strong> ₹{totalAmount}
//             </Typography>
//           </Box>

//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ mt: 4 }}
//             onClick={() => handleCreateOrder(totalAmount * 100, "INR")}  // Amount in paisa
//           >
//             Proceed to Payment
//           </Button>
          
//           {displayRazorpay && (
//             <RenderRazorpay
//               amount={orderDetails.amount}
//               currency={orderDetails.currency}
//               orderId={orderDetails.orderId}
//               keyId={RAZORPAY_KEY_ID}  // Use keyId from constant
//               onClose={handleClosePayment}  // Close Razorpay if user cancels
//               onSuccess={handlePaymentSuccess}  // Handle successful payment
//             />
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }
import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import SeatSelection from "./SeatSelection";
import axiosInstance from "./axiosinterceptor";
import RenderRazorpay from "./Payment";
import { useNavigate, useParams } from "react-router-dom";

export default function BookTicket() {
  const { id } = useParams(); // Ensure the parameter name matches exactly with your route definition.
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketStatus, setTicketStatus] = useState("Available");
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const ticketPrice = 100;
  const navigate = useNavigate();

  // Log the value of Id to debug
  useEffect(() => {
    console.log("Id from useParams:", id);
  }, [id]);
    useEffect(() => {
      if (selectedSeats.length === 0) {
        setTicketStatus("Available");
      } else if (selectedSeats.length > 0 && selectedSeats.length < 25) {
        setTicketStatus("Fast Filling");
      } else {
        setTicketStatus("Housefull");
      }
    }, [selectedSeats]);
    

  useEffect(() => {
    console.log(displayRazorpay);
  }, [displayRazorpay]);
  
  useEffect(() => {
    console.log(ticketStatus);
  }, [ticketStatus]);

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };

  const handleCreateOrder = async (amount, currency) => {
    try {
      const response = await axiosInstance.post("/payment/order", {
        amount,
        currency,
      });
      console.log("Backend response:", response.data);
      if (response.data && response.data.id) {
        setOrderDetails({
          orderId: response.data.id,
          currency: response.data.currency,
          amount: response.data.amount,
        });
        setDisplayRazorpay(true);
      } else {
        console.error("Invalid response from backend:", response.data);
        alert("Failed to create payment order. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message);
      alert("Failed to create payment order. Please try again.");
    }
  };



  const handlePaymentSuccess = async () => {
    setDisplayRazorpay(false);
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      alert("User not found. Please log in again.");
      return;
    }
    try {
      const response = await axiosInstance.post(`/booking/bookticket/${id}`, {
        seats: selectedSeats,
        email: user.email,
      });
      alert(`Tickets booked successfully! Confirmation sent to ${user.email}`);
      const seatNumbers = response.data.seats;
            setSelectedSeats([]);
      navigate("/success", { state: { seatNumbers } });
    } catch (error) {
      console.error("Error booking tickets:", error);
      alert("Error booking tickets, please try again.");
    }
  };

  const handleClosePayment = () => {
    setDisplayRazorpay(false);
    handlePaymentSuccess();
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
        Ticket Availability:
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center">
              <Typography
          variant="h6"
          color='#ffeb3b'
          sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
        >
          {ticketStatus}
        </Typography>
      </Box>
    </Box>
      <Box display="flex" gap={4}>
        <Box flex={2} bgcolor="#1e1e1e" color="white" p={4} borderRadius={2}>
          <SeatSelection
            selectedSeats={selectedSeats}
            onSelect={handleSeatSelection}
          />
        </Box>

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
              <strong>Total Amount:</strong> ₹{totalAmount}
            </Typography>
          </Box>

          <Button
  variant="outlined"
  fullWidth
  onClick={() => handleCreateOrder(totalAmount * 100, "INR")}
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
            Proceed to Payment
          </Button>
          {displayRazorpay && (
            <RenderRazorpay
              amount={orderDetails.amount}
              currency={orderDetails.currency}
              orderId={orderDetails.orderId}
              keyId="rzp_test_MWAJneIEOdvo1h"
              onClose={handleClosePayment}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
