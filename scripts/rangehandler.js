(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RangeHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  var sliderLabel = document.getElementById('strengthLabel');
  var sliderValue = document.getElementById('strengthValue');

  sliderValue.style.color = "green";
  sliderLabel.style.color = "green";

  RangeHandler.prototype.addRangeHandler = function(fn) {
    console.log('Setting slider handler for form');
    this.$formElement.on('change', function(event) {
      event.preventDefault();
      var data = this.value;
      document.getElementById(fn).innerHTML = data;

      var intensityColor;
      if (data < 34) {
        intensityColor = "green";
      }
      else if (data < 68) {
        intensityColor = "#aaaa00";
      }
      else {
        intensityColor = "red";
      }

      sliderValue.style.color = intensityColor;
      sliderLabel.style.color = intensityColor;

    });
  };

  App.RangeHandler = RangeHandler;
  window.App = App;

})(window);
