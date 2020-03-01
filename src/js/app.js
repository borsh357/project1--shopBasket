'use strict';
import '../app.css';
import { Product, ProductListComponent } from './product';
import { basketListComponent, basketComponent } from './basket';

const productList = [
  new Product('./img/xsgold.jpg', 'iPhone Xs Gold', 330),
  new Product('./img/xrblack.jpg', 'iPhone Xr Black', 300),
  new Product('./img/11white.jpg', 'iPhone 11 White', 355),
  new Product('./img/11red.jpg', 'iPhone 11 Red', 358),
  new Product('./img/11purple.jpg', 'iPhone 11 Purple', 345),
  new Product('./img/11promaxgreen.jpg', 'iPhone 11 Pro Max Green', 449),
  new Product('./img/11progrey.jpg', 'iPhone 11 Pro Grey', 390),
  new Product('./img/11progreen.jpg', 'iPhone 11 Pro Green', 389),
  new Product('./img/11green.jpg', 'iPhone 11 Green', 330),
  new Product('./img/11black.jpg', 'iPhone 11 Black', 339),
  new Product('./img/7black.jpg', 'iPhone 7 Black', 200),
];

const productListComponent = new ProductListComponent(productList);

window.onload = function() {
  productListComponent.renderTo('.shop');
  basketComponent.render();
  basketListComponent.renderTo('.basket');
};