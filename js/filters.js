'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var MAX_NUMBER_DISPLAYED_PINS = 5;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = filterForm.querySelector('#housing-price');
  var housingRoomsSelect = filterForm.querySelector('#housing-rooms');
  var housingGuestsSelect = filterForm.querySelector('#housing-guests');
  var housingFeaturesSelect = filterForm.querySelector('#housing-features');

  var filteringFunctions = [filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures];


  function filterOffer(offer) {
    return filteringFunctions.every(function (filteringFunction) {
      return filteringFunction(offer);
    });
  }

  function makeFilterAds(offers) {
    var filteredOffers = [];

    for (var i = 0; i < offers.length; i++) {
      var offer = offers[i];
      var isValidOffer = filterOffer(offer);

      if (isValidOffer && MAX_NUMBER_DISPLAYED_PINS !== 0) {
        filteredOffers.push(offer);
      }

      if (filteredOffers.length === MAX_NUMBER_DISPLAYED_PINS) {
        break;
      }
    }

    return filteredOffers;
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
        return item.offer.price < LOW_PRICE;
      case 'middle':
        return (item.offer.price > LOW_PRICE && item.offer.price < HIGH_PRICE);
      case 'high':
        return item.offer.price > HIGH_PRICE;
      default:
        throw new Error('Неизвестный тип: ' + priceValue);
    }
  }

  function filterByRooms(item) {
    var roomsValue = housingRoomsSelect.value;
    if (roomsValue === 'any') {
      return true;
    }

    return item.offer.rooms === Number(roomsValue);
  }

  function filterByGuests(item) {
    var guestsValue = housingGuestsSelect.value;
    if (guestsValue === 'any') {
      return true;
    }

    return item.offer.guests === Number(guestsValue);
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

  window.filter = {
    getFilteredData: getFilteredData,
  };
})();


