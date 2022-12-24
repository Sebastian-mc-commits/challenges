import { cart } from "../classes/index.js"
const helpers = {}

helpers.length = (options) => cart.getProducts().length;

helpers.currentView = (options) => options.data.exphbs.view;

export default helpers;