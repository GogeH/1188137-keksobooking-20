'use strict';

(function () {
  var mapAd = document.querySelector('.map');
  var adFormResetButton = document.querySelector('.ad-form__reset');
  var adForm = document.querySelector('.ad-form');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  function formUploadHandler(template) {
    var message = template.cloneNode(true);
    document.querySelector('main').appendChild(message);

    document.addEventListener('keydown', escKeyDownHandler);
    document.addEventListener('click', windowClickHandler);
  };

  function escKeyDownHandler(evt) {
    if (evt.key === 'Escape') {
      var successElement = document.querySelector('div.success');
      var errorElement = document.querySelector('div.error');

      if (successElement) {
        successElement.remove();
      }

      if (errorElement) {
        errorElement.remove();
      }
    }
  };

  function windowClickHandler(evt) {
    var target = evt.target;

    if (target.matches('.success')) {
      document.querySelector('.success').remove();
    }

    if (target.matches('.error') || target.matches('.error__button')) {
      document.querySelector('.error').remove();
    }
  };

  function onSuccessData() {
    formUploadHandler(successMessageTemplate);
    var mapCard = document.querySelector('.map__card');

    adForm.reset();
    mapAd.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    if (mapCard) {
      mapCard.classList.add('hidden');
    }

    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (element) {
      element.remove();
    });
  };

  function onErrorData() {
    formUploadHandler(errorMessageTemplate);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(adForm);
    window.backend.onSaveData(data, onSuccessData, onErrorData);
  });


  function adFormResetButtonClickHandler(evt) {
    evt.preventDefault();
    adForm.reset();
  };

  adFormResetButton.addEventListener('click', adFormResetButtonClickHandler);

})();
