const router = require('express').Router();
const db = require('../db');

router
  .route('/')
  .get((req, res) => {
    try {
      res.json(db.files);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка' });
    }
  });

module.exports = router;
