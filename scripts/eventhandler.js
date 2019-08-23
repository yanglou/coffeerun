(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function EventHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  EventHandler.prototype.addeventHandler = function(fn) {
    console.log('Setting slider handler for form');
    
    this.$formElement.on('change', function(event) {

    });
  };

    App.EventHandler = EventHandler;
    window.App = App;

  })(window);
