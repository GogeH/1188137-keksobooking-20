'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var MAX_NUMBER_DISPLAYED_PINS = 5;

  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');

  // создание нового массива
  function makeFilterAds(offers) {
    return offers.filter(function (offer) {
      return checkOfferType(offer);
    }).slice(0, MAX_NUMBER_DISPLAYED_PINS);
  }

  // проверка на соответсвие типу жилья
  function checkOfferType(element) {
    return housingTypeSelect.value === element.offer.type || housingTypeSelect.value === DEFAULT_VALUE;
  }

  function getFilteredData(offers) {
    return makeFilterAds(offers);
  }

  function setChangeListener(onChange) {
    filterForm.addEventListener('change', onChange);
  }

  window.filter = {
    getFilteredData: getFilteredData,
    setChangeListener: setChangeListener
  };
})();


