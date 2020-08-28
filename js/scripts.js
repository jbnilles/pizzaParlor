function Store () {
  this.previousOrders = [];
  this.toppings = ['peparoni', 'bacon', 'extra cheese', 'mushrooms', 'onions', 'olive', 'pineapple'];
  this.drinkFlavors = ['coke','diet coke', 'rootbeer', 'lemonade'];
  this.pizzaSizes = ['personal', 'small', 'medium', 'large', 'x-large'];
  this.pizzaCosts = [4, 8, 10, 12, 15];
  this.drinkSizes = ['small', 'medium', 'large'];
  this.drinkCosts = [1, 1.5, 2];

}


function Order () {
  this.items = [];
  this.name = '';
  this.subtotal;
  this.total;
}
function Order (name) {
  this.items = [];
  this.name = name;
  this.subtotal = 0;
  this.tax = 0
  this.total = 0;
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
  this.size;
  this.toppings = [];
  this.cost = 0;
}
Pizza.prototype.calculateCost = function () {
  switch (this.size) {
    case 'personal':
      this.cost += 4;
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
  this.size;
  this.flavor;
  this.cost = 0;

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

function writeToppingsToList (listDom, arry) {
  listDom.text('');
  arry.forEach(element => {
    listDom.append('<li>' + element + '</li>');
  });
}
function writeSizeCostsToList (listDom, sizes, costs) {
  listDom.text('');
  for (let i = 0; i < sizes.length; i++) {
    listDom.append('<li>' + sizes[i] + ':  $' + costs[i] +'</li>');
    
  }
}
function writeToSizeForm (formDom,sizes,name) {
  formDom.text('');
  for (let i = 0; i < sizes.length; i++) {
    formDom.append('<input type="radio" name=' + name +' "pizzaSize" id=' + sizes[i] + ' value=' + sizes[i] + '><label for=' + sizes[i] + '>' + sizes[i] +'</label><br>');
  }
}
function writeToppingsForm (formDom, toppings) {
  formDom.text('');
  let html = '';
  for (let i = 0; i < toppings.length; i++) {
    html+= "<input name='toppings' type='checkbox' id=" + toppings[i] + " value="+ toppings[i] + '>';
    html+= "<label for=" + toppings[i] + ">" + toppings[i] + "</label><br>"
  }
  formDom.append(html);
}
function checkIfFormSelected(formDom) {
  alert($('input:checked','#pizzaSizeForm').length);
  $('input[name=toppings]:checked').each(function () {
    alert(this.value);
  })
  
  alert($('input:checked','#pizzaSizeForm').val());
}
$(document).ready(function () {
  let STORE = new Store();
  writeToppingsToList($('#toppingsList'), STORE.toppings);
  writeSizeCostsToList ($('#pricingList'), STORE.pizzaSizes, STORE.pizzaCosts);

  $('#startOrderButton').click(function () {
    $('#landingPage').hide();
    $('#orderPage').show();
    writeToSizeForm($('#pizzaSizeForm'),STORE.pizzaSizes, 'pizzaSizes');
    writeToppingsForm ($('#toppingsForm'), STORE.toppings);
    writeToSizeForm($('#drinkSizeForm'),STORE.drinkSizes, 'drinkSizes');
    writeToSizeForm($('#drinkFlavorForm'),STORE.drinkFlavors, 'drinkFlavors');
  });

  $('#addPizzaButton').click(function () {
    checkIfFormSelected(2)
  });

});
