import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
  axios
  .post('http://localhost:4000/contact', formData, {
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
  })
  .then((response) => {
    console.log('Response data:', response); // Handle the response data
    // alert('Request successful! Response: ' + JSON.stringify(response.data));
    toast.success('Message Sent!');
  })
  .catch((error) => {
    console.error('Axios error:', error); // Handle any errors that occurred during the request
    toast.error('Error: ' + error.message);
  });

  };
  return (
    <div>
   <Container>
   <form style={{margin:'1.3em 0px'}} onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Contact Us
        <ToastContainer />
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            variant="outlined"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>
      <Button style={{marginTop:"20px"}} type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
   </Container>
    </div>
  )
}

export default Contact