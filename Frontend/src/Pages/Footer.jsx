
import { Box, Container, Grid, Typography, Link, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';


const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', marginTop: '50px', marginLeft: '-8px', marginRight: '-8px', marginBottom: '-8px' }}>
      <Container>
        <Grid container spacing={3}>
          {/* Ways to Book */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              WAYS TO BOOK
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', maxWidth: '200px' }}>
              <AppleIcon fontSize="large" />
              <AndroidIcon fontSize="large" />
             
            </Box>
          </Grid>

          {/* Experiences */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              EXPERIENCES
            </Typography>
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-around', maxWidth: '200px' }}>
              <img src="/path-to-novo-3d.png" alt="Novo 3D" />
              <img src="/path-to-novo-cool.png" alt="Novo Cool" />
              <img src="/path-to-novo-7.png" alt="Novo 7" />
            </Box> */}
          </Grid>

          {/* Connect with Us */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              CONNECT WITH US
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', maxWidth: '200px' }}>
              <Link href="#" color="inherit"><Facebook fontSize="large" /></Link>
              <Link href="#" color="inherit"><Twitter fontSize="large" /></Link>
              <Link href="#" color="inherit"><Instagram fontSize="large" /></Link>
              <Link href="#" color="inherit"><YouTube fontSize="large" /></Link>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid #444', marginTop: '20px', paddingTop: '20px' }}>
          <Grid container justifyContent="center" spacing={2}>
            {['About us', 'Advertise with Us', 'Careers', 'Contact Us', 'Privacy Policy', 'Terms And Conditions', 'Promotions', 'FAQs'].map((item) => (
              <Grid item key={item}>
                <Link href="#" color="inherit" sx={{ textDecoration: 'none' }}>{item}</Link>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body2">Newsletter</Typography>
          <Button variant="contained" sx={{ backgroundColor: '#444', color: '#fff', mt: 1 }}>
            SUBSCRIBE NOW
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid #444', paddingTop: '20px' }}>
          <Typography variant="body2" sx={{ marginBottom: '10px' }}>
            &copy; MovieMate Cinemas 2024. All rights reserved.
          </Typography>
          {/* <img src="/path-to-reflections-logo.png" alt="Reflections Powered" /> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
