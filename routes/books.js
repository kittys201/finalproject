const router = require('express').Router();
const booksController = require('../controllers/books.js');
const validation = require('../middleware/validate.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/:id', isAuthenticated, validation.checkMongoId, booksController.getSingle);
router.get('/', isAuthenticated, booksController.getAll);
router.post('/', isAuthenticated, validation.saveBook, booksController.createBook);
router.put('/:id', isAuthenticated, validation.checkMongoId, validation.saveBook, booksController.updateBook);
router.delete('/:id', isAuthenticated, validation.checkMongoId, booksController.deleteBook);

module.exports = router;