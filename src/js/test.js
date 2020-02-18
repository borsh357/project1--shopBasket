/* jshint ignore:start */
const assert = require('assert');
import { Product, ProductListComponent } from './product';
import { basket, BasketList, BasketComponent } from './basket';

describe('Product - creates new product', function() {
  it('product created successfully and has all the params', function() {
    var product = new Product('image.png', 'product', 'price');
    assert.deepEqual(product.imageURL, 'image.png');
    assert.deepEqual(product.name, 'product');
    assert.deepEqual(product.price, 'price');
    assert.deepEqual(product.quantity, '1');
  });
  it('product created without params', function() {
    var product = new Product();
    assert.deepEqual(product.imageURL, undefined);
    assert.deepEqual(product.name, undefined);
    assert.deepEqual(product.price, undefined);
    assert.deepEqual(product.quantity, '1');
  });
});

describe('ProductListComponent - creates new productListComponent', function() {
  it('ProductListComponent created successfully and has all the products', function() {
    var productListComponent = new ProductListComponent([
      new Product('img1', 'name1', 1),
      new Product('img2', 'name2', 2),
      new Product('img3', 'name3', 3),
    ]);
    assert.deepEqual(productListComponent.productList.length, 3);
    assert.deepEqual(productListComponent.productList[0].imageURL, 'img1');
    assert.deepEqual(productListComponent.productList[1].imageURL, 'img2');
    assert.deepEqual(productListComponent.productList[2].imageURL, 'img3');
    assert.deepEqual(productListComponent.productList[0].name, 'name1');
    assert.deepEqual(productListComponent.productList[1].name, 'name2');
    assert.deepEqual(productListComponent.productList[2].name, 'name3');
    assert.deepEqual(productListComponent.productList[0].price, 1);
    assert.deepEqual(productListComponent.productList[1].price, 2);
    assert.deepEqual(productListComponent.productList[2].price, 3);
  });
  it('ProductListComponent created without productList array', function() {
    var productListComponent = new ProductListComponent();
    assert.deepEqual(productListComponent.productList, undefined);
  });
  describe('ProductListComponent.renderTo()', function() {
    it('idk how to test this', function() {});
  });
});

describe('BasketComponent - creates new basket', function() {
  it('basket created successfully and has all the params', function() {
    var basket = new BasketComponent('.header');
    assert.deepEqual(basket.imageURL, './img/shopping-cart.png');
    assert.deepEqual(basket.selector, '.header');
    assert.deepEqual(basket.productsInBasket, []);
    assert.deepEqual(basket.productCount, 0);
    assert.deepEqual(basket.totalValue, 0);
  });

  describe('basket.addToBasket() - adds product to basket', function() {
    it('product added to basket', function() {
      var basket = new BasketComponent('.header');
      basket.addToBasket(new Product('img', 'name', 100));
      assert.deepEqual(basket.productsInBasket.length, 1);
      assert.deepEqual(basket.productsInBasket[0].imageURL, 'img');
      assert.deepEqual(basket.productsInBasket[0].name, 'name');
      assert.deepEqual(basket.productsInBasket[0].price, '100');
    });
  });
});

/* jshint ignore:end */