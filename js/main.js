'use strict';

(function () {
  var MAIN_PIN_SIZE = 40;

  var mapAd = document.querySelector('.map');
  var mainPin = mapAd.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  var mainPinSizeX = parseInt(mainPin.style.left, 10) + Math.floor(MAIN_PIN_SIZE / 2);
  var mainPinSizeY = parseInt(mainPin.style.top, 10) + Math.floor(MAIN_PIN_SIZE / 2);
  var typeHouse = document.querySelector('#type');

  function start() {
    inputAddress.value = mainPinSizeX + ',' + mainPinSizeY;
    inputAddress.setAttribute('readonly', 'readonly');

    window.adRestrictions.toggleFieldsAvailability(true);
    window.adRestrictions.synchronizeFields();

    window.adRestrictions.changeMinPrice(typeHouse);
  }

  start();

})();

