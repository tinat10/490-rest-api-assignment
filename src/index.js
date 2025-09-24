const express = require('express');
const { v4: uuid } = require('uuid');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here

const users = [];
function isNonEmptyString(v) {
  if (typeof v !== 'string') return false;
  return v.trim().length > 0;
}

// #1 Create user
app.post('/users', (req, res) => {
  const { name, email } = req.body || {};   
  if (!isNonEmptyString(name) || !isNonEmptyString(email)) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  const user = { id: uuid(), name: name.trim(), email: email.trim() };
  users.push(user);
  return res.status(201).json(user);
});

// #2 Get user
app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === req.params.id); 
    if (!user) 
        return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
});

// #3 Update user
app.put('/users/:id', (req, res) => {
    const {name, email} = req.body || {};
    if (!isNonEmptyString(name) || !isNonEmptyString(email)) {
    return res.status(400).json({ error: 'name and email are required' });
    }
    
    const index = users.findIndex((u) => u.id === req.params.id);
    if (index === -1)
        return res.status(404).json({error: 'User not found'});

    users[index] = { id: users[index].id, name: name.trim(), email: email.trim() };
    return res.status(200).json(users[index]);
});

// #4 Delete a user
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((u) => u.id === req.params.id);

    if (index === -1) 
        return res.status(404).json({ error: 'User not found' });

    users.splice(index, 1);
    return res.status(204).send();
});



// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing