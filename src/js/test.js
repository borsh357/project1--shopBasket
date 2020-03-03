/* jshint ignore:start */
const assert = require('assert');
import { Product, ProductListComponent } from './product';
import { Basket, BasketListComponent, BasketComponent } from './basket';

describe('Product - creates new product', function() {
  it('product created successfully and has all the params', function() {
    const product = new Product('image.png', 'product', 'price');
    assert.deepEqual(product.imageURL, 'image.png');
    assert.deepEqual(product.name, 'product');
    assert.deepEqual(product.price, 'price');
    assert.deepEqual(product.quantity, '1');
  });
  it('product created without props', function() {
    assert.throws(() => {
      const product = new Product();
    });
  });
});

describe('ProductListComponent - creates new productListComponent', function() {
  it('ProductListComponent created successfully and has all the products', function() {
    const productListComponent = new ProductListComponent([
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
    const productListComponent = new ProductListComponent();
    assert.deepEqual(productListComponent.productList, undefined);
  });
});

describe('Basket - creates new basket', function() {
  it('basket created successfully and has all the params', function() {
    const basket = new Basket();
    assert.deepEqual(basket.productsInBasket, []);
    assert.deepEqual(basket.productCount, 0);
    assert.deepEqual(basket.totalValue, 0);
  });
});

describe('Basket.addToBasket(product) - adds product to basket', function() {
  it('product added to basket', function() {
    const basket = new Basket();
    basket.addToBasket(new Product('img', 'name', 100));
    assert.deepEqual(basket.productsInBasket.length, 1);
    assert.deepEqual(basket.productsInBasket[0].imageURL, 'img');
    assert.deepEqual(basket.productsInBasket[0].name, 'name');
    assert.deepEqual(basket.productsInBasket[0].price, '100');
  });
  it('if basket already contains product, it\'s quantity will be changed', function() {
    const basket = new Basket();
    const product = new Product('img', 'name', 100);
    basket.addToBasket(product);
    basket.addToBasket(product);
    assert.deepEqual(basket.productsInBasket.length, 1);
    assert.deepEqual(basket.productsInBasket[0].imageURL, 'img');
    assert.deepEqual(basket.productsInBasket[0].name, 'name');
    assert.deepEqual(basket.productsInBasket[0].price, '100');
    assert.deepEqual(basket.productsInBasket[0].quantity, 2);
  });
  it('does not add product if it\'s quantity in basket = 10 (10 is max)', function() {
    const basket = new Basket();
    const product = new Product('img', 'name', 100);
    basket.addToBasket(product);
    basket.productsInBasket[0].quantity = 10;
    assert.deepEqual(basket.productsInBasket.length, 1);
    assert.deepEqual(basket.productsInBasket[0].quantity, 10);
    basket.addToBasket(product);
    assert.deepEqual(basket.productsInBasket.length, 1);
    assert.deepEqual(basket.productsInBasket[0].quantity, 10);
  });
});

describe('Basket.deleteFromBasket(product) - removes product from basket', function() {
  it('product removed from basket', function() {
    const basket = new Basket();
    basket.addToBasket(new Product('img', 'name', 100));
    assert.deepEqual(basket.productsInBasket.length, 1);
    basket.deleteFromBasket(basket.productsInBasket[0]);
    assert.deepEqual(basket.productsInBasket.length, 0);
  });
});

describe('Basket.increaseQuantity(productIndex) - increases quantity of the product in basket',
  function() {
    it('quantity increased', function() {
      const basket = new Basket();
      basket.addToBasket(new Product('img', 'name', 100));
      assert.deepEqual(basket.productsInBasket.length, 1);
      basket.increaseQuantity(0);
      assert.deepEqual(basket.productsInBasket.length, 1);
      assert.deepEqual(basket.productsInBasket[0].quantity, 2);
    });
    it('method is ignored if quantity of the product = 10 (10 is max)', function() {
      const basket = new Basket();
      const product = new Product('img', 'name', 100);
      basket.addToBasket(product);
      basket.productsInBasket[0].quantity = 10;
      assert.deepEqual(basket.productsInBasket.length, 1);
      assert.deepEqual(basket.productsInBasket[0].quantity, 10);
      basket.increaseQuantity(0);
      assert.deepEqual(basket.productsInBasket.length, 1);
      assert.deepEqual(basket.productsInBasket[0].quantity, 10);

    });
  });

describe('Basket.decreaseQuantity(productIndex) - decreases quantity of the product in basket',
  function() {
    it('quantity decreased', function() {
      const basket = new Basket();
      basket.addToBasket(new Product('img', 'name', 100));
      assert.deepEqual(basket.productsInBasket.length, 1);
      basket.increaseQuantity(0);
      assert.deepEqual(basket.productsInBasket[0].quantity, 2);
      basket.decreaseQuantity(0);
      assert.deepEqual(basket.productsInBasket.length, 1);
      assert.deepEqual(basket.productsInBasket[0].quantity, 1);
    });
    it('method is ignored if quantity of the product = 1 (1 is min)', function() {
      const basket = new Basket();
      const product = new Product('img', 'name', 100);
      basket.addToBasket(product);
      assert.deepEqual(basket.productsInBasket.length, 1);
      assert.deepEqual(basket.productsInBasket[0].quantity, 1);
      basket.decreaseQuantity(0);
      assert.deepEqual(basket.productsInBasket.length, 1);
      assert.deepEqual(basket.productsInBasket[0].quantity, 1);

    });
  });

describe('BasketComponent - creates basket component which renders itself to selector', function() {
  it('basket component created and contains basket', function() {
    const basket = new Basket();
    const basketComponent = new BasketComponent(basket);
    assert.deepEqual(basketComponent.basket, basket);
  });
});

describe('BasketListComponent - creates basket list component', function() {
  it('basket list component created and contains basket', function() {
    const basket = new Basket();
    const basketListComponent = new BasketListComponent(basket);
    assert.deepEqual(basketListComponent.basket, basket);
  });
});

// todo: можно написать тест на onUpdate

/* jshint ignore:end */