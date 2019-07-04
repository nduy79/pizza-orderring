const mongoose = require('mongoose');
const Boom = require('@hapi/boom');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    productName: String,
    productCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    productDesc: String,
    productNutrition: String,
    productPrices: [{
        size: String,
        price: Number
    }],
    productImangeUrl: String,
    productTag: String

});


productSchema.statics.getById = async function getById(productID) {
    return await this.findOne({
            _id: productID //conditions
        },
        function (err) { // callback 
            if (err) {
                throw err;
            }
        });
}
productSchema.statics.getPrices = async function getPrices(productID, productSize) {
    const product = await Product.getById(productID);
    const prices = product.productPrices;
    const re = prices.find(price => price.size === productSize);
    return re.price
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product