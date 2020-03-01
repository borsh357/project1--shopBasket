import _ from 'lodash';

class Basket {
  constructor() {
    this.productsInBasket = [];
    this.productCount = 0;
    this.totalValue = 0;
  }

  addToBasket(product) {
    if (this.productsInBasket.includes(product)) {
      if (this.productsInBasket[this.productsInBasket.indexOf(product)].quantity < 10) {
        this.productsInBasket[this.productsInBasket.indexOf(product)].quantity += 1;
      }
      this.updateBasket();
      return;
    }
    product.resetQuantity();
    this.productsInBasket.push(product);
    this.updateBasket();
  }

  deleteFromBasket(product) {
    this.productsInBasket.splice(product, 1);
    this.updateBasket();
  }

  increaseQuantity(productIndex) {
    if (this.productsInBasket[productIndex].quantity < 10) {
      this.productsInBasket[productIndex].quantity += 1;
    }
    this.updateBasket();
  }

  decreaseQuantity(productIndex) {
    if (this.productsInBasket[productIndex].quantity > 1) {
      this.productsInBasket[productIndex].quantity -= 1;
    }
    this.updateBasket();
  }
  onUpdate() {}

  updateBasket() {
    this.productCount = 0;
    this.productsInBasket.forEach(product => {
      this.productCount += product.quantity;
    });
    this.totalValue = 0;
    this.productsInBasket.forEach(product => {
      this.totalValue += product.price * product.quantity;
    });
    this.onUpdate();
  }
}

class BasketComponent {
  constructor(basket, selector) {
    this.selector = selector;
    this.basket = basket;
  }

  render() {
    if (document.querySelector('.shopping-cart')) {
      document.querySelector('.shopping-cart').remove();
    }
    const tmpl = require('../templates/shopping-cart-tmpl.html');
    const html = _.template(tmpl)({ basket: this.basket });
    document.querySelector(this.selector).innerHTML += html;

    const counter = document.querySelector('.shopping-cart_items-counter');
    if (this.basket.productCount > 0) {
      counter.classList.remove('shopping-cart--empty');
    } else {
      counter.classList.add('shopping-cart--empty');
    }
  }
}

class BasketListComponent {
  constructor(basket) {
    this.basket = basket;
  }
  renderTo(selector) {
    if (document.querySelector('.shopping-cart_purchase-list')) {
      document.querySelector('.shopping-cart_purchase-list').remove();
    }
    var tmpl = require('../templates/basket-list-tmpl.html');
    var html = _.template(tmpl)({ basket: this.basket });
    document.querySelector(selector).innerHTML += html;

    document.querySelectorAll('.purchase-list_item-count_controls-plus').forEach((increaseButton,
      key) => {
      increaseButton.onclick = function() {
        this.basket.increaseQuantity(key);
      }.bind(this);
    });

    document.querySelectorAll('.purchase-list_item-count_controls-minus').forEach((increaseButton,
      key) => {
      increaseButton.onclick = function() {
        this.basket.decreaseQuantity(key);
      }.bind(this);
    });

    document.querySelectorAll('.purchase-list_item-delete-link').forEach(
      (deleteItemButton, key) => {
        deleteItemButton.onclick = function() {
          this.basket.deleteFromBasket(key);
        }.bind(this);
      });

    document.querySelector('.shopping-cart_purchase-btn').onclick = function() {
      document.querySelector('.basket').classList.remove('basket--hide');
    };

    document.querySelector('.purchase-list_close').onclick = function() {
      document.querySelector('.basket').classList.add('basket--hide');
    };
  }
}

const basket = new Basket();
const basketComponent = new BasketComponent(basket, '.header');
const basketListComponent = new BasketListComponent(basket);

basket.onUpdate = function() {
  basketComponent.render(); // call update UI
  basketListComponent.renderTo('.basket'); // call update UI
}

export { basket, basketComponent, basketListComponent, Basket, BasketComponent, BasketListComponent };