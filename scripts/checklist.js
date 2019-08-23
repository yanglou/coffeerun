(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  /CheckList.prototype.addClickHandler = function(fn) {
    this.$element.on('click', 'input', function(event) {
      var email = event.target.value;

      fn(email)
        .then(function() {
          this.removeRow(email);
        }.bind(this));
    }.bind(this));
  }

  CheckList.prototype.addEditHandler = function(fn) {
    this.$element.on('dblclick','input', function(event) {

      //this.$element.css('background', '#D3D3D3');

      var email = event.target.value;

      fn(email)
        .then(function() {
          this.removeRow(email);
        }.bind(this));
    }.bind(this));
  }

  CheckList.prototype.addRow = function(coffeeOrder) {
    //Remove any existing rows that mathc the email emailAddress
    this.removeRow(coffeeOrder.emailAddress);

    //create a new instance of a row using the coffee order info
    var rowElement = new Row(coffeeOrder);

    //add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);

    //this.$element.getElementById('checkboxLabel').style.background = "red";
  };

  CheckList.prototype.removeRow = function(email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };


  function Row(coffeeOrder) {

    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });



    //if (coffeeOrder.flavor = "almond") {
      var $label = $('<label></label>');
    /*} else {
      var $label = $('<label id="checklistLabel" ></label>');
    }*/

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    var description = '[' + coffeeOrder.strengthRange + 'x] ' + coffeeOrder.size + ' ';

    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }

    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';


    $label.append($checkbox);
    $label.append(description);

    var backgroundColor = "";
    switch (coffeeOrder.flavor) {
      case 'caramel': backgroundColor = '#F5F5DC'; break;
      case 'almond': backgroundColor = '#DEB887'; break;
      case 'mocha': backgroundColor = '#D2691E'; break;
    }
    if (backgroundColor) {
      $label.css('background', backgroundColor);
    }

    $div.append($label);

    this.$element = $div;



  }
  App.CheckList = CheckList;
  window.App = App;
})(window);
