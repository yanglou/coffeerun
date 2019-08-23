

(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector); //Jquery wrapped selection returns an object, which contains references to the selected elements
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn) { //Method that accents a function argument
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) { //$(this) form is wrapped
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      })
      console.log(data);

      fn(data)
        .then(function () {
          this.reset();
          this.elements[0].focus();
        }.bind(this));
    });
  };


  FormHandler.prototype.addInputHandler = function(fn, fn2) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      var emailAddress = event.target.value;
      var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address. Please use @coffee.com'
        event.target.setCustomValidity(message);
      }
    });


    var coffeeRangeValue = 30;
    var coffeeOrder;

    this.$formElement.on('input', '[name="coffee"]', function(event) {

      coffeeOrder = event.target.value;

      var message = '';
      if (fn2(coffeeOrder, coffeeRangeValue)) {
        event.target.setCustomValidity('');
      } else {
        message = 'Decaf cannot have more than 20 units of caffeine!'
        event.target.setCustomValidity(message);
      }
    });

    this.$formElement.on('change', '[name="strengthRange"]', function(event){
      coffeeRangeValue = event.target.value;

      var message = '';
      if (fn2(coffeeOrder, coffeeRangeValue)) {
        event.target.setCustomValidity('');
      }
      else {
        message = 'Decaf cannot have more than 20 units of caffeine!'
        event.target.setCustomValidity(message);
      }
    });

  };


  App.FormHandler = FormHandler;
  window.App = App;

})(window);
