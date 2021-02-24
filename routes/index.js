const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const productController = require('../controllers/productController');
const { catchErrors } = require('../handlers/errorHandlers');

// router.get('/addStore', storeController.addStore);
// router.post('/addStore', catchErrors(storeController.createStore));

router.get('/', catchErrors(productController.getProducts));
router.get('/products', catchErrors(productController.getProducts));
router.get('/addProduct', productController.addProduct);
router.get('/product/:slug', catchErrors(productController.getProductBySlug));

router.post('/addProduct',
    productController.upload, // middle ware
    catchErrors(productController.resize), // middle ware
    catchErrors(productController.createProduct)
);

router.post('/addProduct/:id',
    productController.upload, // middle ware
    catchErrors(productController.resize), // middle ware
    catchErrors(productController.updateProduct)
);

router.get('/products/:id/edit', catchErrors(productController.editProduct));

module.exports = router;
