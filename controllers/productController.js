const { Store } = require('express-session');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.addProduct = (req, res) => {
    // res.send('Add product works!');
    res.render('editProduct', { title: 'Add Product' });
};

exports.createProduct = async (req, res) => {
    // res.send(req.body);
    // logs all of the data that was entered into the form
    // console.log(req.body);
    const product = new Product(req.body);
    await product.save();
    res.redirect('/');
};

exports.getProducts = async (req, res) => {
    const products = await Product.find();
    // console.log(products);
    res.render('products', { title: 'Products', products });
};

exports.editProduct = async (req, res) => {
    // 1. Find the store give the ID
    const selectedProduct = await Product.findOne({ _id: req.params.id });
    // 2. Confirm they are an Admin so they can edit the products
    // TODO
    // 3. Render out the edit form so the Admin can update the product
    res.render('editProduct', { title: `Edit product: ${selectedProduct.name}`, selectedProduct });
};