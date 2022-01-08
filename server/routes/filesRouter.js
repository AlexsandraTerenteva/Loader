const router = require('express').Router();
const { nanoid } = require('nanoid');
const fileMiddleware = require('../middleware/file');
const db = require('../db');

router
  .route('/')
  .post(fileMiddleware.single('filedata'), (req, res) => {
    try {
      if (req.file) {
        const newFile = {
          id: nanoid(),
          src: `http://localhost:5000/${req.file.destination}${req.file.filename}`,
          title: req.file.originalname,
          weight: req.file.size,
        };

        db.files.push(newFile);
        res.json(newFile);
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
