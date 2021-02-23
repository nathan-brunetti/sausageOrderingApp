const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    stoage: multer.memoryStorage(),
    fileFilter: function(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That file type isn\'t allowed' }, false);
        }
    }
};

exports.addProduct = (req, res) => {
    // res.send('Add product works!');
    res.render('editProduct', { title: 'Add Product' });
};

// Stores it in the memory of the server
exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    // check if there is no new file to resize
    if (!req.file) {
        next(); //skip to the next middleware
        return;
    }
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}}`;
    // now we resize
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    // once we have written the photo the file system, keep going
    next();
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
    const product = await Product.findOne({ _id: req.params.id });
    // console.log(selectedProduct.price);
    // 2. Confirm they are an Admin so they can edit the products
    // TODO
    // 3. Render out the edit form so the Admin can update the product
    res.render('editProduct', { title: `Edit product: ${product.name}`, product });
};

exports.updateProduct = async (req, res) => {
    // 1. Find and update the store
    const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, // return the new product instead of the old one
        runValidators: true, // force the model to fun the validators
    }).exec();
    // req.flash('success', `Successfully updated <strong>${product.name}</strong>. <a href="/products/${product.slug}">View the product -></a>`);
    res.redirect(`/products/${product._id}/edit`);
    // 2. Redirect them to the store and tell them it worked
};