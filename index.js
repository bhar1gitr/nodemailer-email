const express = require('express');
const conn = require('./connection/conn');
const dotenv = require('dotenv'); 
const nodemailer = require('nodemailer');
const cloudinary = require("cloudinary").v2;
const cors = require('cors');
const app = express();
const port = 4000;
// Importing Models
const Cards = require('./models/cardsSchema');

//--------------- Middlewares--------------- //
// Environment Variables
dotenv.config({ path: './config/.env' });
// Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET 
});
app.use(cors());
app.use(express.json());

// connection to database
conn();
// cloudinary.uploader.upload("C:/Users/bharat sharma/Downloads/STU62d65d6ab2d12165821786_page-0001.jpg", function(error, result) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(result);
//     // The `result` object will contain information about the uploaded image
//   }
// });

// apis
app.get('/loadCards', async(req, res) => {
  const data = await Cards.find({});
  console.log(data);
  res.send(data);
});

app.get('/', async(req, res) => {
  // const data = await Cards.find()
  res.send("huii")
});

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use the email service you prefer (e.g., Gmail, Yahoo, etc.)
  auth: {
    user: 'bharatsharma232@apsit.edu.in', // Your email address
    pass: 'ajmc kcof zvgg avsb', 
  },
});


app.post('/contact',async (req,res)=>{
  console.log(req.body);
  const mailOptions = {
    from: 'bharatsharma232@apsit.edu.in', // Sender's email address
    to: req.body.email, // Recipient's email address
    subject: 'APSIT', // Email subject
    text: req.body.message, // Email body in plain text
  };
try {
  // Send the email
  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: 'Email sent successfully' });
  setTimeout(() => {
          res.status(200).json({ message: 'Form submitted successfully!' });
        }, 2000); // Simulate a 2-second delay to mimic processing
} catch (error) {
  console.error('Error sending email:', error);
  res.status(500).json({ error: 'Failed to send email' });
  setTimeout(() => {
          res.status(500).json({ error: 'An error occurred while sending the email.' });
        }, 2000); // Simulate a 2-second delay to mimic processing
}
})



// listen to port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
