'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('input[name="address"]');

  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = 1200;

  var MAIN_PIN_WIDTH = 66;
  var MAIN_PIN_HEIGHT = 66;
  var MAIN_PIN_POINTER = 22;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      if (mainPin.offsetLeft < LOCATION_X_MIN - MAIN_PIN_WIDTH / 2) {
        mainPin.style.left = LOCATION_X_MIN - MAIN_PIN_WIDTH / 2 + 'px';
      } else if (mainPin.offsetLeft > LOCATION_X_MAX - MAIN_PIN_WIDTH / 2) {
        mainPin.style.left = LOCATION_X_MAX - MAIN_PIN_WIDTH / 2 + 'px';
      }

      if (mainPin.offsetTop < LOCATION_Y_MIN - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2) {
        mainPin.style.top = LOCATION_Y_MIN - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2 + 'px';
      } else if (mainPin.offsetTop > LOCATION_Y_MAX - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2) {
        mainPin.style.top = LOCATION_Y_MAX - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2 + 'px';
      }

      address.value = Math.round(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + Math.round(mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER / 2);

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        function onClickPreventDefault(clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        }
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
