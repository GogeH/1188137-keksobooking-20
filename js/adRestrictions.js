'use strict';

(function () {
  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeHouse = document.querySelector('#type');
  var roomsNumber = document.querySelector('#room_number');
  var capacityGuests = document.querySelector('#capacity');
  var priceDom = document.querySelector('#price');

  function toggleFieldsAvailability(isLocked) {
    var fieldsetsAndSelects = document.querySelectorAll('fieldset, select');

    fieldsetsAndSelects.forEach(function (element) {
      element.disabled = isLocked;
    });
  }

  function changeMinPrice() {
    var price = computeMinPrice();
    priceDom.min = price.min;
    priceDom.placeholder = price.placeholder;

    function computeMinPrice() {
      switch (typeHouse.value) {
        case 'bungalo':
          return {placeholder: BUNGALO_MIN_PRICE, min: BUNGALO_MIN_PRICE};
        default:
        case 'flat':
          return {placeholder: FLAT_MIN_PRICE, min: FLAT_MIN_PRICE};
        case 'house':
          return {placeholder: HOUSE_MIN_PRICE, min: HOUSE_MIN_PRICE};
        case 'palace':
          return {placeholder: PALACE_MIN_PRICE, min: PALACE_MIN_PRICE};
      }
    }
  }

  function onSelectTimeChangeTimeIn() {
    timeOut.value = timeIn.value;
  }

  function onSelectTimeChangeTimeOut() {
    timeIn.value = timeOut.value;
  }

  function onFieldsSynchronize() {
    var guestRoomsMap = {
      1: ['1'],
      2: ['1', '2'],
      3: ['1', '2', '3'],
      100: ['0']
    };

    if (guestRoomsMap[roomsNumber.value].indexOf(capacityGuests.value) === -1) {
      capacityGuests.setCustomValidity('Укажите допустимое количество гостей');
    } else {
      capacityGuests.setCustomValidity('');
    }
  }

  timeIn.addEventListener('change', function () {
    onSelectTimeChangeTimeIn();
  });

  timeOut.addEventListener('change', function () {
    onSelectTimeChangeTimeOut();
  });

  window.adRestrictions = {
    toggleFieldsAvailability: toggleFieldsAvailability,
    changeMinPrice: changeMinPrice,
    onFieldsSynchronize: onFieldsSynchronize,
    onSelectTimeChangeTimeOut: onSelectTimeChangeTimeOut,
    onSelectTimeChangeTimeIn: onSelectTimeChangeTimeIn,
  };

})();

