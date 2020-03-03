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
  constructor(basket) {
    this.basket = basket;
  }

  renderTo(selector) {
    if (document.querySelector(selector + ' .shopping-cart')) {
      document.querySelector(selector + ' .shopping-cart').remove();
    }
    const tmpl = require('../templates/shopping-cart-tmpl.html');
    const html = _.template(tmpl)({ basket: this.basket, imageURL: './img/shopping-cart.png' });
    document.querySelector(selector).innerHTML += html;

    const counters = document.querySelectorAll('.shopping-cart_items-counter');
    if (this.basket.productCount > 0) {
      counters.forEach(counter => {
        counter.classList.remove('shopping-cart--empty');
        return;
      });
    } else {
      counters.forEach(counter => {
        counter.classList.add('shopping-cart--empty');
        return;
      });
    }
    document.querySelectorAll('.shopping-cart_purchase-btn').forEach(btn => {
      btn.onclick = function() {
        document.querySelector('.basket').classList.remove('basket--hide');
      };
    });
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

    document.querySelector('.purchase-list_close').onclick = function() {
      document.querySelector('.basket').classList.add('basket--hide');
    };
  }
}

const basket = new Basket();
const basketComponent = new BasketComponent(basket);

const basketListComponent = new BasketListComponent(basket);

/* jshint ignore:start */
basket.onUpdate = function() {
  basketComponent.renderTo('.header');
  basketListComponent.renderTo('.basket');
};
/* jshint ignore:end */

export {
  basket,
  basketComponent,
  basketListComponent,
  Basket,
  BasketComponent,
  BasketListComponent
};