const router = require('express').Router();
const reviewsController = require('../controllers/reviews.js');
const validation = require('../middleware/validate.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/:id', isAuthenticated, validation.checkMongoId, reviewsController.getSingle);
router.get('/', isAuthenticated, reviewsController.getAll);
router.post('/', isAuthenticated, validation.saveReview, reviewsController.createReview);
router.put('/:id', isAuthenticated, validation.checkMongoId, validation.saveReview, reviewsController.updateReview);
router.delete('/:id', isAuthenticated, validation.checkMongoId, reviewsController.deleteReview);

module.exports = router;