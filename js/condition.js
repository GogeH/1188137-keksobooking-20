'use strict';

(function () {
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeHouse = document.querySelector('#type');
  var roomsNumber = document.querySelector('#room_number');
  var capacityGuests = document.querySelector('#capacity');

  // Функция блокировки полей форм
  function toggleFieldsAvailability(isLocked) {
    var fieldsetsAndSelects = document.querySelectorAll('fieldset, select');

    for (var i = 0; i < fieldsetsAndSelects.length; i++) {
      fieldsetsAndSelects[i].disabled = isLocked;
    }
  }

  // Функция изменения минимального значения поля «Цена за ночь»
  function changeMinPrice() {
    var priceDom = document.querySelector('#price');
    var price = computeMinPrice();
    priceDom.min = price.min;
    priceDom.placeholder = price.placeholder;

    function computeMinPrice () {
      switch (typeHouse.value) {
        case 'bungalo':
          return {placeholder: 0, min: 0};
        case 'flat':
          return {placeholder: 1000, min: 1000};
        case 'house':
          return {placeholder: 5000, min: 5000};
        case 'palace':
          return {placeholder: 10000, min: 10000};
      }
    }
  }

  // Функции определения времени въезда
  function onSelectTimeChangeTimeIn() {
    timeOut.value = timeIn.value;
  }

  // Функции определения времени выезда
  function onSelectTimeChangeTimeOut() {
    timeIn.value = timeOut.value;
  }

  // Функциия проверки синхронизации полей
  function synchronizeFields() {
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

  window.condition = {
    toggleFieldsAvailability: toggleFieldsAvailability,
    changeMinPrice: changeMinPrice,
    onSelectTimeChangeTimeIn: onSelectTimeChangeTimeIn,
    onSelectTimeChangeTimeOut: onSelectTimeChangeTimeOut,
    synchronizeFields: synchronizeFields,
  };

})();
