function Store () {
  this.previousOrders = [];
  this.toppings = ['peparoni', 'bacon', 'mushrooms', 'onions', 'olive', 'pineapple', 'extra_cheese','sausage'];
  this.drinkFlavors = ['coke','diet_coke', 'rootbeer', 'lemonade', 'dr._pepper','sprite'];
  this.pizzaSizes = ['personal', 'small', 'medium', 'large', 'x-large'];
  this.pizzaCosts = [4, 8, 10, 12, 15];
  this.drinkSizes = ['small', 'medium', 'large'];
  this.drinkCosts = [1, 1.5, 2];

}
function Order () {
  this.items = [];
  this.drinks = [];
  this.name = '';
  this.subtotal = 0;
  this.tax = 0
  this.total = 0;
  this.date;
}
function Order (name) {
  this.items = [];
  this.drinks = [];
  this.name = name;
  this.subtotal = 0;
  this.tax = 0
  this.total = 0;
  this.date;
}
Order.prototype.addItem = function (item) {
  this.items.push(item);
  this.subtotal += item.cost;
  return this.subtotal;
}
Order.prototype.addDrink = function (drink) {
  this.drinks.push(drink);
  this.subtotal += drink.cost;
  return this.subtotal;
}
Order.prototype.calculateTotal = function () {
this.tax = this.subtotal * .09;
this.total = this.subtotal + this.tax;
return this.total;
}
Order.prototype.resetTotals = function () {
  this.subtotal = 0;
  this.tax = 0
  this.total = 0;
}
Order.prototype.getTax = function () {
  return this.tax.toFixed(2);
}
Order.prototype.getSubtotal = function () {
  return this.subtotal.toFixed(2);
}
Order.prototype.getTotal = function () {
  return this.total.toFixed(2);
}
function Pizza () {
  this.size;
  this.toppings = [];
  this.cost = 0;
}
function Pizza (size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.calculateCost();
}
Pizza.prototype.calculateCost = function () {
  switch (this.size) {
    case 'personal':
      this.cost = 4;
      break;

    case 'small':
      this.cost = 8;
      break;

    case 'medium':
      this.cost = 10;
      break;

    case 'large':
    this.cost = 12;
    break;

    case 'x-large':
    this.cost = 15;
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
function Drink(size, flavor) {
  this.size = size;
  this.flavor = flavor;
  this.calculateCost(); 
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

    case 'large':
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
    listDom.append('<li> ' + element.replace('_', ' ') + '</li>');
  });
}
function writeSizeCostsToList (listDom, sizes, costs) {
  listDom.text('');
  for (let i = 0; i < sizes.length; i++) {
    listDom.append('<li> ' + sizes[i] + ':  $' + costs[i].toFixed(2) +'</li>');
    
  }
}
function writeToSizeForm (formDom,sizes,name) {
  formDom.text('');
  for (let i = 0; i < sizes.length; i++) {
    formDom.append('<input type="radio" name=' + name +' id=' + sizes[i] + ' value=' + sizes[i] + '><label for=' + sizes[i] + '> ' + sizes[i].replace('_', ' ') +'</label><br>');
  }
}
function writeToppingsForm (formDom, toppings) {
  formDom.text('');
  let html = '';
  for (let i = 0; i < toppings.length; i++) {
    html+= "<input name='toppings' type='checkbox' id=" + toppings[i] + " value="+ toppings[i] + '>';
    html+= "<label for=" + toppings[i] + ">" + toppings[i].replace('_', ' ') + "</label><br>"
  }
  formDom.append(html);
}
function checkIfFormSelected(formID) {
  if($('input:checked',formID).length > 0){
    return true;
  } else {
    return false;
  }
  // alert($('input:checked','#pizzaSizeForm').length);
  // $('input[name=toppings]:checked').each(function () {
  //   alert(this.value);
  // })
  
  // alert($('input:checked','#pizzaSizeForm').val());
}
function updateOrderCard(order, pizzaList, drinkList) {
  let html = '';
  order.resetTotals();
  order.items.forEach(element => {
    if(element.toppings.length > 0) {
      html += '<li>' + element.size + ' pizza : $' + element.cost.toFixed(2) + '<ul>'
      element.toppings.forEach(e => {
        html += '<li>' + e.replace('_', ' ') + '</li>'
      });
      html += '</ul>'
    }
    else {
      html += '<li>' + element.size + ' cheese pizza : $' + element.cost.toFixed(2) 
    }
    order.subtotal += element.cost;
  });
  $(pizzaList).html(html);
  html ='';
  order.drinks.forEach(element => {
   html += '<li>' + element.size + ' ' + element.flavor.replace('_', ' ') + ' : $' + element.cost.toFixed(2) + '</li>';
   order.subtotal += element.cost;
  });
  order.calculateTotal();
  $(drinkList).html(html);
  $('.subtotal').text(order.getSubtotal());
  $('.tax').text(order.getTax());
  $('.total').text(order.getTotal());  
}
function writeToPastOrders (store,listDom) {
  let html = '';
  for (let i = store.previousOrders.length - 1; i >= 0 ; i--) {
    html += '<li id=' + i + '>' + store.previousOrders[i].date + ' : $ ' + store.previousOrders[i].total.toFixed(2) + " Pizza's: " + store.previousOrders[i].items.length + " Drinks: " + store.previousOrders[i].drinks.length + '</li>';
  }
  $(listDom).html(html);
}
$(document).ready(function () {
  let STORE = new Store();
  let CURRENTORDER = new Order();
  writeToppingsToList($('#drinkMenu'), STORE.drinkFlavors);
  writeToppingsToList($('#toppingsList'), STORE.toppings);
  writeSizeCostsToList ($('#pricingList'), STORE.pizzaSizes, STORE.pizzaCosts);
  writeSizeCostsToList ($('#drinkSizeList'), STORE.drinkSizes, STORE.drinkCosts);

  $('#startOrderButton').click(function () {
    CURRENTORDER = new Order();
    $('#landingPage').hide();
    $('#orderPage').show();
    $('#homeButton').show();
    $(this).hide();
    writeToSizeForm($('#pizzaSizeForm'),STORE.pizzaSizes, 'pizzaSizes');
    writeToppingsForm ($('#toppingsForm'), STORE.toppings);
    writeToSizeForm($('#drinkSizeForm'),STORE.drinkSizes, 'drinkSizes');
    writeToSizeForm($('#drinkFlavorForm'),STORE.drinkFlavors, 'drinkFlavors');
    updateOrderCard(CURRENTORDER, $('#itemsList'), $('#drinkList'));
  });
  $('#addPizzaButton').click(function () {
    if(checkIfFormSelected('#pizzaSizeForm')) {
      let toppings = [];
      let size = $('input:checked','#pizzaSizeForm').val();
      $('input[name=toppings]:checked').each(function () {
        toppings.push(this.value);
      });
      CURRENTORDER.addItem(new Pizza(size, toppings));
      updateOrderCard(CURRENTORDER, $('#itemsList'), $('#drinkList'));
    }
  });
  $('#addDrinkButton').click(function () {
    if(checkIfFormSelected('#drinkFlavorForm') && checkIfFormSelected('#drinkSizeForm')) {
      let flavor = $('input:checked','#drinkFlavorForm').val();
      let size = $('input:checked','#drinkSizeForm').val();
      
      CURRENTORDER.addDrink(new Drink(size, flavor));
      updateOrderCard(CURRENTORDER, $('#itemsList'), $('#drinkList'));
      
    }
  });
  $('#buyButton').click(function () {
    if(CURRENTORDER.subtotal > 0) {
      let d =new Date();
      CURRENTORDER.date = (d.getMonth() + 1).toString()  +'/' +(d.getDate()).toString();  
      STORE.previousOrders.push(CURRENTORDER);
      CURRENTORDER = new Order();
      updateOrderCard(CURRENTORDER,$('#itemsList'), $('#drinkList'));
      $('#orderPage').hide();
      updateOrderCard(STORE.previousOrders[STORE.previousOrders.length - 1],$('#pizzaReceiptList'), $('#drinkReceiptList'));
      $('#receiptPage').show();
      writeToPastOrders (STORE,$('#pastOrdersList'));
    }
  });
  $('#clearOrderButton').click(function () {
    CURRENTORDER = new Order();
    updateOrderCard(CURRENTORDER, $('#itemsList'), $('#drinkList'));
    
  });
  $('#homeButton').click(function () {
    $(this).hide();
    $('#startOrderButton').show();
    $('#landingPage').show();
    $('#orderPage').hide();
    $('#receiptPage').hide();
  });
  $('#pastOrdersList').on('click', 'li', function () {
    let previousOrder = STORE.previousOrders[$(this).attr('id')];
    let newCurrentOreder = new Order();
    previousOrder.items.forEach(element => {
      newCurrentOreder.items.push(element);
    });
    previousOrder.drinks.forEach(element => {
      newCurrentOreder.drinks.push(element);
    });
    CURRENTORDER = newCurrentOreder;
    updateOrderCard(CURRENTORDER, $('#itemsList'), $('#drinkList'));
  });
});


