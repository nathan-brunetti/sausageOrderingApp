const { Decimal128 } = require('bson');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

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
        amount: {
            type: Number
        },
        scale: {
            type: Number,
            default: '10'
        },
        currency: {
            type: String,
            default: 'USD'
        }
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