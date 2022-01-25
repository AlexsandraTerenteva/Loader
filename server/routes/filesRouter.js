/* eslint-disable max-len */
const router = require('express').Router();
const fileMiddleware = require('../middleware/file');
const FilesController = require('../controllers/filesController');

const controller = new FilesController();
router
  .route('/')
  .get(controller.renderFiles);

router
  .route('/:id')
  .patch(controller.editFile)
  .delete(controller.deleteFile);

router
  .route('/uploads')
  .post(fileMiddleware.single('filedata'), controller.addFile);

module.exports = router;
