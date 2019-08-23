(function(window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function(order) {
    console.log('Adding order for ' + order.emailAddress);
    //this.db.getAll();
    this.db.add(order.emailAddress, order);

    /*var sameEmail = false;
    this.db.getAll(function(cb) {
      console.log(cb);
      if (order.emailAddress in cb) {
        $('#myModal3').modal({
          show: true
        })
        sameEmail = true;
      } else {
        sameEmail = false;
        $('#myModal3').modal({
          show: false
        })
      }
    });
    if (sameEmail == false) {

    }
    sameEmail = false;*/




    /*if (this.db.data[order.emailAddress]["flavor"] != "") {
      if (this.db.data[order.emailAddress]["size"] = "Coffee-zilla") {
        //console.log("Success");
        $('#myModal').modal({
          show : true
          })
          $('#myModal2').modal({
            show : true
            })
      }
    }
    else {
      $('#myModal').modal({
        show : false
      })
      $('#myModal2').modal({
        show : false
        })
    }*/


  };



  Truck.prototype.deliverOrder = function(customerId) {
    console.log('Delivering order for ' + customerId);
    return this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function(printFn) {
    return this.db.getAll()
      .then(function(orders) {
        var customerIdArray = Object.keys(orders);

        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function(id) {
          console.log(orders[id]);
          if (printFn) {
            printFn(orders[id]);
          }
        }.bind(this));
      }.bind(this));
  };

  /*Truck.prototype.createEvent = function () {
    var customerIdArray = Object.keys(this.db.getAll());
    customerIdArray.forEach(function (id) {
      console.log(this.db.get(id));

    }.bind(this));
  };*/

  App.Truck = Truck;
  window.App = App;

})(window);
