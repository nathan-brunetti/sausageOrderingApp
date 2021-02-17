const { Decimal128 } = require('bson');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please add a name for the product'
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Decimal128
    },
    slug: String,
    options: [String],
    tags: [String]
});

productSchema.pre('save', function(next) {
    if (!this.isModified('name')) {
        next(); // skip it
        return; // stop this function from running
    }
    this.slug = slug(this.name);
    next();
});

module.exports = mongoose.model('Product', productSchema);