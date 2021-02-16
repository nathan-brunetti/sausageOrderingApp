const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
    console.log(req.name);
    res.render('index');
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
    // logs all of the data that was entered into the form
    // console.log(req.body);
    const store = new Store(req.body);
    await store.save();
    res.redirect('/');
};