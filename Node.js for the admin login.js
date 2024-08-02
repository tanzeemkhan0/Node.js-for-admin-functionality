const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const admin = { username, password: hashedPassword };
  // Check if admin credentials are valid
  if (admin.username === 'admin' && bcrypt.compareSync(password, admin.password)) {
    req.session.admin = admin;
    res.redirect('/admin/dashboard');
  } else {
    res.status(401).send('Invalid credentials');
  }
});