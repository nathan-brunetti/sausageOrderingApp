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
        type: Number
    },
    slug: String,
    options: [String],
    tags: [String]
});

// Getter
productSchema.path('price').get(function(num) {
    return (num / 100).toFixed(2);
  });
  
// Setter
productSchema.path('price').set(function(num) {
return num * 100;
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