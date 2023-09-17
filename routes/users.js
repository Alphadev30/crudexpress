const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/', async (req, res) => {
  try {
    // Get the user data from the request body
    const { name, email } = req.body;

    // Create a new user object
    const user = new User({ name, email });

    // Save the user to the database
    await user.save();

    // Send a success response to the client
    res.status(201).json(user);
  } catch (error) {
    // Send an error response to the client
    res.status(500).json({ error: 'Error while saving the User' });
  }
});

router.get('/', async (req, res) =>{
  try{
    const users = await User.find();
    res.json(users);
  }catch (error){
    res.status(500).json({ error: 'Error fetching Users' });
  }
})


router.put('/:id', async (req, res) =>{
  try{
    const {name, email} = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, {name, email})
    if(!user) {
      res.status(500).json({ error: 'User not found | id : ' + req.params.id });
    }
    res.json(user);
  }catch(error){
    res.status(500).json({ error: 'Error updating users with id : ' + req.params.id });
  }
})


router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if(!user) {
    res.status(500).json({ error: 'User not found | id : ' + req.params.id });
  }
  res.json(user);
})

// Get users with Gmail addresses
router.get('/gmail-users', async (req, res) => {
  try {
    const gmailUsers = await User.find({ email: { $regex: /@google.com$/i } });
    res.json(gmailUsers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Gmail users' });
  }
});

// Export the user router
module.exports = router;