import _ from 'lodash';
import { basket } from './basket';

class Product {
  constructor(imageURL, name, price) {
    this.imageURL = imageURL;
    this.name = name;
    this.price = price;
    this.quantity = 1;
  }
  resetQuantity() {
    this.quantity = 1;
  }
}

class ProductListComponent {
  constructor(productList) {
    this.productList = productList;
  }

  renderTo(selector) {
    var tmpl = require('../templates/product-list-tmpl.html');
    var html = _.template(tmpl)({ productList: this.productList });
    document.querySelector(selector).innerHTML += html;

    document.querySelectorAll('.shop-add-to-cart').forEach((shopButton, key) => {
      shopButton.onclick = function() {
        basket.addToBasket(this.productList[key]);
        basket.updateBasket();
      }.bind(this);
    });
  }
}

export { Product, ProductListComponent };