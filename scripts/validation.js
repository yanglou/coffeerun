(function (window) {
  'use strict'
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function (email) {
      return /.+@coffee\.com$/.test(email);
    }
  };

var SilverValidation = {
  isDecaf: function (order, rating){
    var upperCaseOrder = order.toUpperCase();
    if(/DECAF/.test(upperCaseOrder)) {
      if (rating>20)
      {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  }
}

  App.Validation = Validation;
  App.SilverValidation = SilverValidation;
  window.App = App;
})(window);
