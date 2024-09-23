import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Footer from './Pages/Footer';
import Userdashboard from './Pages/Userdashboard';
import Admindashboard from './Pages/Admindashboard';
import MovieDetails from './Pages/Moviedetails';
import Privateroutes from './Pages/Privateroutes';
import Main from './Pages/Main';
import BookTicket from './Pages/Bookticket';
import Writereview from './Components/Writereview';
import Bookedtickets from './Components/Bookedticket';
import AddEditMovie from './Pages/AddeditMovie';
import Success from './Pages/Success';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Privateroutes />}>
          <Route path="/userdashboard" element={<Main child={<Userdashboard />}/>} />
          <Route path="/booked-tickets" element={<Bookedtickets />} />
          <Route path="/movies/:id/write-review" element={<Writereview/>} />
          <Route path="/admindashboard" element={<Main child={<Admindashboard />} />}/>
          <Route path="/movies/:id" element={<Main child={<MovieDetails />}/>} />
          <Route path="/add-movie" element={<AddEditMovie />} />
          <Route path="/edit-movie/:id" element={<AddEditMovie/>} />
          <Route path="/movies/:id/book-ticket" element={<Main child={<BookTicket />}/>} />
          <Route path="/success" element={<Success/>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;