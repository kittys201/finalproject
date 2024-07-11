const router = require('express').Router();
const ordersController = require('../controllers/orders.js');
const validation = require('../middleware/validate.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/:id', isAuthenticated, validation.checkMongoId, ordersController.getSingle);
router.get('/', isAuthenticated, ordersController.getAll);
router.post('/', isAuthenticated, validation.saveOrder, ordersController.createOrder);
router.put('/:id', isAuthenticated, validation.checkMongoId, validation.saveOrder, ordersController.updateOrder);
router.delete('/:id', isAuthenticated, validation.checkMongoId, ordersController.deleteOrder);

module.exports = router;