
const helpers = {}

helpers.length = () => {
    const {getProducts} = require("../cart.js");
    return getProducts().length;
}

module.exports = helpers;