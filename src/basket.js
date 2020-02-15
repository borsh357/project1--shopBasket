import _ from 'lodash';

class BasketList {
  constructor(basket) {
    this.basket = basket;
  }
  renderTo(selector) {
    var tmpl = require('./templates/basket-list-tmpl.html');
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
    document.querySelectorAll('.purchase-list_item-delete-link').forEach((deleteItemButton, key) => {
      deleteItemButton.onclick = function() {
        this.basket.deleteFromBasket(key);
      }.bind(this);
    });
    document.querySelector('.shopping-cart_purchase-btn').onclick = function() {
      document.querySelector('.basket').classList.remove('basket--hide');
    }
    document.querySelector('.purchase-list_close').onclick = function() {
      document.querySelector('.basket').classList.add('basket--hide');
    }
  }
}


class BasketComponent {
  constructor(selector) {
    this.imageURL = './img/shopping-cart.png';
    this.selector = selector;
    this.productsInBasket = [];
    this.productCount = 0;
    this.totalValue = 0;
  }
  render() {
    var tmpl = require('./templates/shopping-cart-tmpl.html');
    var html = _.template(tmpl)({ basket: this });
    document.querySelector(this.selector).innerHTML += html;
  }
  addToBasket(product) {
    if (this.productsInBasket.includes(product)) {
      this.productsInBasket[this.productsInBasket.indexOf(product)].quantity += 1;
      return;
    } 
    this.productsInBasket.push(product);
  }
  deleteFromBasket(product) {
    this.productsInBasket.splice(this.productsInBasket[this.productsInBasket.indexOf(product)], 1);
    this.updateBasket();
  }
  increaseQuantity(product) {
    if (this.productsInBasket[product].quantity < 10) {
      this.productsInBasket[product].quantity += 1;
      document.querySelector('.purchase-list_item-count_input').innerHTML = this.productsInBasket[
        product].quantity;
      this.updateBasket();
    }
  }
  decreaseQuantity(product) {
    if (this.productsInBasket[product].quantity > 1) {
      this.productsInBasket[product].quantity -= 1;
      document.querySelector('.purchase-list_item-count_input').innerHTML = this.productsInBasket[
        product].quantity;
      this.updateBasket();
    }
  }
  updateBasket() {
    this.productCount = 0;
    this.productsInBasket.forEach(product => {
      this.productCount += product.quantity;
    });
    this.totalValue = 0;
    this.productsInBasket.forEach(product => {
      this.totalValue += product.price * product.quantity;
    });
    var counter = document.querySelector('.shopping-cart_items-counter');
    if (this.productCount > 0) {
      counter.classList.remove('shopping-cart--empty');
    } else {
      counter.classList.add('shopping-cart--empty');
    }
    document.querySelector('.shopping-cart').remove();
    this.render();
    document.querySelector('.shopping-cart_purchase-list').remove();
    new BasketList(this).renderTo('.basket');
  }
}

const basket = new BasketComponent('.header');

export { basket, BasketList };