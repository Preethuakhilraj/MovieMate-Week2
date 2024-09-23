import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Button,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import axiosInstance from "./axiosinterceptor";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/movies");
        setMovies(response.data || []); // Ensure movies is an array
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container style={{ marginTop: "100px",marginLeft: '-8px', marginRight: '-8px', minWidth: "100vw",minHeight: "100vh", padding: 0 }}>
      {/* Carousel Section */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        style={{ width: "100%", height: "100vh" }} // Fullscreen carousel
      >
        <div>
          <img
            src="https://wallpapercave.com/wp/wp6907816.jpg"
            alt="Image 1"
            style={{ objectFit: "cover", height: "100vh", width: "100%" }}
          />
          <button className="legend align-content-center">
            <a href="/login">Book the Ticket</a>
          </button>
        </div>
        <div>
          <img
            src="https://wallpapercave.com/wp/wp7967861.jpg"
            alt="Image 2"
            style={{ objectFit: "cover", height: "100vh", width: "100%" }}
          />
          <button className="legend">
            <a href="/login">Book the Ticket</a>{" "}
          </button>
        </div>
        <div>
          <img
            src="https://wallpapercave.com/wp/wp8807385.jpg"
            alt="Image 3"
            style={{ objectFit: "cover", height: "100vh", width: "100%" }}
          />
          <button className="legend">
            <a href="/login">Book the Ticket</a>{" "}
          </button>
        </div>
      </Carousel>

      {/* Cards Section */}
      <Grid
  container
  spacing={4}
  style={{ marginTop: "10px", padding: "0 20px" }}
>
  {movies.length > 0 ? (
    movies.map((movie) => (
      <Grid item xs={12} sm={6} md={4} key={movie._id}>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%", // Full height of the grid item
            minHeight: "450px", // Adjust this to ensure consistent height across cards
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={movie.image}
            alt={movie.name}
            style={{
              width: "100%",
              height: "350px", // Set a consistent height for images
              objectFit: "cover", // Ensures the image fits well
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
            }}
          />
          <CardContent style={{ flexGrow: 1 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontWeight: 700 }}
            >
              {movie.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginBottom: "15px" }}
            >
              {movie.description}
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/login"
              style={{
                margin: "10px",
                borderRadius: "20px",
                fontWeight: "bold",
                backgroundColor: "yellow",
                color: "black",
              }}
            >
              More Details
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))
  ) : (
    <Typography
      variant="h6"
      style={{ textAlign: "center", width: "100%" }}
    >
      No movies available
    </Typography>
  )}
</Grid>

    </Container>
  );
};

export default Home;
