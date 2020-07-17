'use strict';

(function () {
  var mapAd = document.querySelector('.map');
  var adFormResetButton = document.querySelector('.ad-form__reset');
  var adForm = document.querySelector('.ad-form');
  var mapCard = document.querySelector('.map__card');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var formUploadHandler = function (template) {
    var message = template.cloneNode(true);
    document.querySelector('main').appendChild(message);

    document.addEventListener('keydown', escKeyDownHandler);
    document.addEventListener('click', windowClickHandler);
  };

  var escKeyDownHandler = function (evt) {
    if (evt.key === 'Escape') {
      var successElement = document.querySelector('div.success');
      var errorElement = document.querySelector('div.error');
      successElement.remove();
      errorElement.remove();
    }
  };

  var windowClickHandler = function (evt) {
    var target = evt.target;

    if (target.matches('.success')) {
      document.querySelector('.success').remove();
    }

    if (target.matches('.error') || target.matches('.error__button')) {
      document.querySelector('.error').remove();
    }
  };

  var onSuccessData = function () {
    formUploadHandler(successMessageTemplate);

    adForm.reset();
    mapAd.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    // Не скрывается попап при отправки формы!
    if (mapCard) {
      mapCard.remove();
    }

    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (element) {
      element.remove();
    });
  };

  var onErrorData = function () {
    formUploadHandler(errorMessageTemplate);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(adForm);
    window.backend.saveData(data, onSuccessData, onErrorData);
  });


  var adFormResetButtonClickHandler = function (evt) {
    evt.preventDefault();
    adForm.reset();
  };

  adFormResetButton.addEventListener('click', adFormResetButtonClickHandler);

})();
