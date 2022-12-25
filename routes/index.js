const express = require('express');
const router = express.Router();
const Networks = require('../models/Networks');

router.get('/', async (req, res, next) => {
  const networks = await Networks.find({});
  res.render('index', { title: 'Home', networks, headerNavbar: true, footerStyle: true});
});

module.exports = router;
