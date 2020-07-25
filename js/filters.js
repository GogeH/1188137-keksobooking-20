'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var MAX_NUMBER_DISPLAYED_PINS = 5;

  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = filterForm.querySelector('#housing-price');
  var housingRoomsSelect = filterForm.querySelector('#housing-rooms');
  var housingGuestsSelect = filterForm.querySelector('#housing-guests');
  var housingFeaturesSelect = filterForm.querySelector('#housing-features');


  function makeFilterAds(offers) {
    return offers.filter(function (offer) {
      return filterByType(offer)
          && filterByPrice(offer)
          && filterByRooms(offer)
          && filterByGuests(offer)
          && filterByFeatures(offer);
    }).slice(0, MAX_NUMBER_DISPLAYED_PINS);
  }

  function filterByType(element) {
    return housingTypeSelect.value === element.offer.type || housingTypeSelect.value === DEFAULT_VALUE;
  }

  function filterByPrice(item) {
    var priceValue = housingPriceSelect.value;
    switch (priceValue) {
      case 'any':
        return true;
      case 'low':
        return item.offer.price < 10000;
      case 'middle':
        return (item.offer.price > 10000 && item.offer.price < 50000);
      case 'high':
        return item.offer.price > 50000;
      default:
        throw new Error('Неизвестный тип: ' + priceValue);
    }
  }

  function filterByRooms(item) {
    var roomsValue = housingRoomsSelect.value;
    if (roomsValue === 'any') {
      return true;
    } else {
      return item.offer.rooms === Number(roomsValue);
    }
  }

  function filterByGuests(item) {
    var guestsValue = housingGuestsSelect.value;
    if (guestsValue === 'any') {
      return true;
    } else {
      return item.offer.guests === Number(guestsValue);
    }
  }

  function filterByFeatures(item) {
    var checkedFeatures = housingFeaturesSelect.querySelectorAll('input[name="features"]:checked');
    return Array.from(checkedFeatures).every(function (checkedFeature) {
      return item.offer.features.includes(checkedFeature.value);
    });
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


