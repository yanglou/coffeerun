(function(window) {
  'use strict';

  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var RANGE_SELECTOR = '[data-coffee-order=“strengthRange”]';
  var RANGE_VALUE = 'strengthValue';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var SilverValidation = App.SilverValidation;
  var RangeHandler = App.RangeHandler;
  var CheckList = App.CheckList;

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  var formHandler = new FormHandler(FORM_SELECTOR);
  var rangeHandler = new RangeHandler(RANGE_SELECTOR);
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck('ncc-1701', remoteDS);

  window.myTruck = myTruck;
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  rangeHandler.addRangeHandler(RANGE_VALUE);
  console.log(rangeHandler);
  formHandler.addSubmitHandler(function(data) {
    return myTruck.createOrder.call(myTruck, data)
      .then(function () {
        checkList.addRow.call(checkList, data);
      }
      );
  });

  formHandler.addInputHandler(Validation.isCompanyEmail, SilverValidation.isDecaf);
  myTruck.printOrders(checkList.addRow.bind(checkList));

})(window);
