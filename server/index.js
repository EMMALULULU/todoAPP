const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();

// Server Set Up
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'build')));

// Serving Front End Website
// Making the unused HTTP routes for returning webpage
// The Server will not get any 404 for unused website, it will return the website instead
// Don't move it to other place at the moment
// *** Must Plug it after others API routes , otherwise the API will not works ***
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


// Set up port to 5000
const PORT = process.env.PORT || 8080;

// initial application listening on server PORT 5000
app.listen(PORT, () =>
  console.log(`Server is listening on ${PORT}`)
);
