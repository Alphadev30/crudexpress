const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB mongodb://localhost:27017/Crud
mongoose.connect('mongodb://localhost:27017/Crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Handdle the connection and error logs
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Could not establish connection with the database'));
db.once('open', () => {
  console.log('Successfully Connected');
});

// Set the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Use EJS as the template engine

// Set up routes
const userRouter = require('./routes/users')
app.use('/api/users', userRouter);

// start the server
app.listen(PORT, ()=>{
  console.log("Server is running on port : ", PORT);
})
