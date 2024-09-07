import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
  Box,
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate, useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFD700",
    },
    text: {
      primary: "#FFD700",
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
      fontFamily: "Roboto, sans-serif",
    },
    button: {
      textTransform: "none",
    },
  },
});

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Use location hook to track current path

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    console.log("Stored User:", storedUser);
    console.log("Stored Is Authenticated:", storedIsAuthenticated);

    if (storedIsAuthenticated === "true") {
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("Parsed User:", parsedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/"); // Redirect to home after logout
  };

  const isActive = (path) => location.pathname === path;

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary" sx={{ height: "100px", justifyContent: "center" }}>
        <Toolbar>
          <Typography variant="h6" color="textPrimary" sx={{ flexGrow: 1 }}>
            MovieMate
          </Typography>

          {!isAuthenticated ? (
            <>
              <Button
                color="secondary"
                component={Link}
                to="/"
                sx={{
                  fontWeight: isActive("/") ? "bold" : "normal",
                  borderBottom: isActive("/") ? "2px solid gold" : "none",
                }}
              >
                Home
              </Button>
              <Button
                color="secondary"
                component={Link}
                to="/login"
                sx={{
                  fontWeight: isActive("/login") ? "bold" : "normal",
                  borderBottom: isActive("/login") ? "2px solid gold" : "none",
                }}
              >
                Login
              </Button>
              <Button
                color="secondary"
                component={Link}
                to="/signup"
                sx={{
                  fontWeight: isActive("/signup") ? "bold" : "normal",
                  borderBottom: isActive("/signup") ? "2px solid gold" : "none",
                }}
              >
                Signup
              </Button>
            </>
          ) : (
            <>
              <Box display="flex" alignItems="center" sx={{ marginRight: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", marginRight: 1 }}>
                  <AccountCircleIcon />
                </Avatar>
                <Typography variant="h6" color="textPrimary">
                  Welcome, {user?.name || "Guest"}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{
                  fontWeight: "bold",
                  textTransform: "none",
                  padding: "6px 16px",
                  marginLeft: 2,
                  backgroundColor: "gold",
                  "&:hover": {
                    backgroundColor: "yellow",
                  },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
