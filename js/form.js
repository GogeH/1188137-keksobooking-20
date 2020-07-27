'use strict';

(function () {
  var mapAd = document.querySelector('.map');
  var adFormResetButton = document.querySelector('.ad-form__reset');
  var adForm = document.querySelector('.ad-form');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var mapFilters = document.querySelector('.map__filters');

  function onFormUpload(template) {
    var message = template.cloneNode(true);
    main.appendChild(message);

    document.addEventListener('keydown', onEscKeyDown);
    document.addEventListener('click', onWindowClick);
  }

  function removeListeners() {
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onWindowClick);
  }

  function onEscKeyDown(evt) {
    if (evt.key === 'Escape') {
      var success = document.querySelector('div.success');
      var error = document.querySelector('div.error');

      if (success) {
        success.remove();
      }

      if (error) {
        error.remove();
      }

      removeListeners();
    }
  }

  function onWindowClick(evt) {
    var target = evt.target;

    if (target.matches('.success')) {
      document.querySelector('.success').remove();
      removeListeners();
    }

    if (target.matches('.error') || target.matches('.error__button')) {
      document.querySelector('.error').remove();
      removeListeners();
    }
  }

  function deletePins() {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.forEach(function (element) {
      element.remove();
    });
  }

  function toDefaultView() {
    var mapCard = document.querySelector('.map__card');
    mapAd.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    if (mapCard) {
      mapCard.classList.add('hidden');
    }

    deletePins();
  }

  function resetForm() {
    var mapCard = document.querySelector('.map__card');

    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    mapFilters.reset();
    deletePins();
    window.avatar.removeHousePhotos();
    window.avatar.removeHeaderPhotos();
    window.cardInterface.setMapPinToDefaultPosition();
    mapAd.classList.add('map--faded');

    if (mapCard) {
      mapCard.remove();
    }
  }

  function onSuccessData() {
    onFormUpload(successMessageTemplate);
    resetForm();
    toDefaultView();
  }

  function onErrorData() {
    onFormUpload(errorMessageTemplate);
  }

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(adForm);
    window.backend.onSaveData(data, onSuccessData, onErrorData);
  });


  function onAdFormResetButtonClick(evt) {
    evt.preventDefault();
    resetForm();
  }

  adFormResetButton.addEventListener('click', onAdFormResetButtonClick);

})();
