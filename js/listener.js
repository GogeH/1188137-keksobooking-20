'use strict';

(function () {
  var mapAd = document.querySelector('.map');
  var mainPin = mapAd.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  // Обработчик с кнопки мыши
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.map.activatePage();
    }
  });

  // Обработчик с кнопки клавиатуры
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.map.activatePage();
    }
  });

  timeIn.addEventListener('change', function () {
    window.adRestrictions.onSelectTimeChangeTimeIn();
  });

  timeOut.addEventListener('change', function () {
    window.adRestrictions.onSelectTimeChangeTimeOut();
  });

  mapPins.addEventListener('click', function (evt) {
    window.map.onMapPinsClick(evt);
  });

  // Обработчики открытия Popup
  mapPins.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.map.onMapPinsClick(evt);
    }
  });

  // Обработчики закрытия Popup
  document.addEventListener('keydown', function (evt) {
    var mapCard = document.querySelector('.map__card');
    if (evt.key === 'Escape') {
      if (mapCard !== null) {
        mapCard.parentNode.removeChild(mapCard);
      }
    }
  });

})();
