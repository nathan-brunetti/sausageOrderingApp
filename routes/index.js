const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const productController = require('../controllers/productController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/addStore', storeController.addStore);
router.post('/addStore', catchErrors(storeController.createStore));

router.get('/', catchErrors(productController.getProducts));
router.get('/products', catchErrors(productController.getProducts));
router.get('/addProduct', productController.addProduct);
router.post('/addProduct', catchErrors(productController.createProduct));

module.exports = router;
