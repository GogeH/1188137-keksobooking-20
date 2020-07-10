'use strict';

(function () {
  var COUNT_UNIQUE_OBJECTS = 8;
  var MAIN_PIN_SIZE = 40;

  var mapPins = document.querySelector('.map__pins');
  var mapAd = document.querySelector('.map');
  var mainPin = mapAd.querySelector('.map__pin--main');
  var mainPinSizeX = parseInt(mainPin.style.left, 10) + Math.floor(MAIN_PIN_SIZE / 2);
  var mainPinSizeY = parseInt(mainPin.style.top, 10) + Math.floor(MAIN_PIN_SIZE / 2);
  var inputAddress = document.querySelector('#address');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeHouse = document.querySelector('#type');
  var roomsNumber = document.querySelector('#room_number');
  var capacityGuests = document.querySelector('#capacity');

  // Функции активации формы и карты
  function activatePage() {
    var adForm = document.querySelector('.ad-form');

    function renderMapPin(uniqueObject) {
      var pattern = document.querySelector('#pin').content.querySelector('.map__pin');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < COUNT_UNIQUE_OBJECTS; i++) {
        var PIN_X = 50;
        var PIN_Y = 70;

        var newElement = pattern.cloneNode(true);

        newElement.style = 'left: ' + (uniqueObject[i].location.x - PIN_X / 2) + 'px; top: ' + (uniqueObject[i].location.y - PIN_Y) + 'px;';
        newElement.querySelector('img').src = uniqueObject[i].author.avatar;
        newElement.querySelector('img').alt = uniqueObject[i].offer.title;

        fragment.appendChild(newElement);
      }

      mapPins.appendChild(fragment);
    }

    if (mapAd.classList.contains('map--faded')) {
      mapAd.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      window.condition.toggleFieldsAvailability(false);
      renderMapPin(window.data.uniqueObjects);

      mainPinSizeX = parseInt(mainPin.style.left, 10) + Math.floor(MAIN_PIN_SIZE / 2);
      mainPinSizeY = parseInt(mainPin.style.top, 10) + MAIN_PIN_SIZE;
      inputAddress.value = mainPinSizeX + ',' + mainPinSizeY;

      roomsNumber.addEventListener('change', window.condition.synchronizeFields);
      capacityGuests.addEventListener('change', window.condition.synchronizeFields);

      typeHouse.addEventListener('change', function () {
        window.condition.changeMinPrice(typeHouse.value);
      });

      timeIn.addEventListener('change', window.condition.onSelectTimeChangeTimeIn);
      timeOut.addEventListener('change', window.condition.onSelectTimeChangeTimeOut);
    }
  }

  window.map = {
    activatePage: activatePage,
  };

})();
