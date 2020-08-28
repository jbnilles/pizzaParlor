function store () {
  let previousOrders = [];
  let toppings = ['peparoni', 'bacon', 'extra cheese', 'mushrooms', 'onions', 'olive', 'pineapple'];
  let drinkFlavors = ['coke','diet coke', 'rootbeer', 'lemonade'];
  let pizzaSizes = ['personal', 'small', 'medium', 'large', 'x-large'];
  let drinkSizes = ['small', 'medium', 'large'];
}


function Order () {
  let items = [];
  let name = '';
  let subtotal;
  let total;
}
function Order (name) {
  let items = [];
  let name = name;
  let subtotal = 0;
  let tax = 0
  let total = 0;
}
Order.prototype.addItem = function (item) {
  this.items.push(item);
  this.subtotal += item.cost;
  return this.subtotal;
}
Order.prototype.calculateTotal = function () {
this.tax = this.subtotal * .09;
this.total = this.subtotal += this.tax;
return this.total;
}
Order.prototype.getTax = function () {
  return this.tax;
}
Order.prototype.getSubtotal = function () {
  return this.subtotal;
}
Order.prototype.getTotal = function () {
  return this.total;
}

function Pizza () {
  let size;
  let toppings = [];
  let cost = 0;
}

Pizza.prototype.calculateCost = function () {
  switch (this.size) {
    case 'personal':
      this.cost += 5;
      break;

    case 'small':
      this.cost += 8;
      break;

    case 'medium':
      this.cost += 10;
      break;

    case 'large':
    this.cost += 12;
    break;

    case 'x-large':
    this.cost += 15;
    break;

    default:
      break;
  }
  if(this.toppings.length > 2){
    this.cost += this.toppings.length - 2;
  }
  return this.cost;
}
Pizza.prototype.addTopping = function (topping) {
  this.toppings.push(topping);
}
Pizza.prototype.setSize = function (size) {
  this.size = size;
}
Pizza.prototype.getCost = function () {
  return this.cost;
}


function Drink () {
  let size;
  let flavor;
  let cost = 0;

}
Drink.prototype.setSize = function (size) {
  this.size = size;
}
Drink.prototype.setFlavor = function (flavor) {
  this.flavor = flavor;
}
Drink.prototype.calculateCost = function () {
  switch (this.size) {
    case 'small':
      this.cost = 1
      break;

    case 'medium':
      this.cost = 1.50
      break;

    case 'small':
      this.cost = 2
      break;

    default:
      break;
  }
}
Drink.prototype.getCost = function () {
  return this.cost;
}



$().ready(function () {



});
