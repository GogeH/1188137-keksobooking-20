'use strict';

(function () {
  var MAIN_PIN_SIZE = 40;
  var PIN_X = 50;
  var PIN_Y = 70;

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
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var adForm = document.querySelector('.ad-form');
  var main = document.querySelector('main');

  var uniqueObjectsAd;

  function onLoad(data) {
    uniqueObjectsAd = data.map(function (item, index) {
      return Object.assign({
        id: index,
      }, item);
    });

    var uniqueObjectsAdForRender = window.filter.getFilteredData(uniqueObjectsAd);

    activatePage(uniqueObjectsAdForRender);
  }

  function onError(errorMessage) {
    var message = errorMessageTemplate.cloneNode(true);
    var errorText = message.querySelector('.error__message');
    errorText.textContent = errorMessage;

    main.appendChild(message);

    var errorButton = message.querySelector('.error__button');
    errorButton.addEventListener('click', onErrorButtonClick);
  }

  function onErrorButtonClick() {
    document.querySelector('div.error').remove();
  }

  function removeMapCard() {
    var mapCard = document.querySelector('.map__card');

    if (mapCard !== null) {
      mapCard.parentNode.removeChild(mapCard);
    }
  }

  function removeMapPins() {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  function renderMapPins(uniqueObjects) {
    var pattern = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    uniqueObjects.forEach(function (uniqueObject) {
      var newUnit = pattern.cloneNode(true);

      newUnit.style = 'left: ' + (uniqueObject.location.x - PIN_X / 2) + 'px; top: ' + (uniqueObject.location.y - PIN_Y) + 'px;';

      var img = newUnit.querySelector('img');

      img.src = uniqueObject.author.avatar;
      img.alt = uniqueObject.offer.title;
      img.dataset.id = uniqueObject.id;

      fragment.appendChild(newUnit);
    });

    removeMapPins();
    removeMapCard();
    mapPins.appendChild(fragment);
  }

  function activatePage(objectsAd) {

    if (mapAd.classList.contains('map--faded')) {
      mapAd.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      window.adRestrictions.toggleFieldsAvailability(false);
      renderMapPins(objectsAd);

      mainPinSizeX = parseInt(mainPin.style.left, 10) + Math.floor(MAIN_PIN_SIZE / 2);
      mainPinSizeY = parseInt(mainPin.style.top, 10) + MAIN_PIN_SIZE;
      inputAddress.value = mainPinSizeX + ',' + mainPinSizeY;

      roomsNumber.addEventListener('change', window.adRestrictions.onFieldsSynchronize);
      capacityGuests.addEventListener('change', window.adRestrictions.onFieldsSynchronize);

      typeHouse.addEventListener('change', function () {
        window.adRestrictions.changeMinPrice(typeHouse.value);
      });

      timeIn.addEventListener('change', window.adRestrictions.onSelectTimeChangeTimeIn);
      timeOut.addEventListener('change', window.adRestrictions.onSelectTimeChangeTimeOut);
    }
  }

  function removeActiveClassOfMapPin() {
    var activeMapPin = mapPins.querySelector('.map__pin--active');
    if (activeMapPin) {
      activeMapPin.classList.remove('map__pin--active');
    }
  }

  function onMapPinsClick(evt) {
    var targetMapPin = evt.target;
    var closestMapPin = targetMapPin.closest('.map__pin');

    function createAdAndAddToDOM(obj) {
      var objTemplate = document.querySelector('#card').content.querySelector('.map__card');
      var objNode = objTemplate.cloneNode(true);

      function defineTypeHouse(homeType) {

        switch (homeType) {
          case 'flat':
            return 'Квартира';
          case 'bungalo':
            return 'Бунгало';
          case 'house':
            return 'Дом';
          default:
          case 'palace':
            return 'Дворец';
        }
      }

      function renderPhotos(mockPhotos, node) {
        var popupPhotos = node.querySelector('.popup__photos');
        var popupPhoto = node.querySelector('.popup__photo');
        if (mockPhotos.offer.photos.length === 0) {
          popupPhotos.classList.add('hidden');
        }

        popupPhotos.innerHTML = '';

        mockPhotos.offer.photos.forEach(function (photo) {
          var popupImg = popupPhoto.cloneNode(true);
          popupImg.src = photo;
          popupPhotos.appendChild(popupImg);
        });
      }

      function renderFeatures(mockFeatures, node) {
        var popupFeatures = node.querySelector('.popup__features');
        var featuresArray = popupFeatures.children;

        if (mockFeatures.offer.features.length === 0) {
          popupFeatures.remove();

          return;
        }

        Array.from(featuresArray).forEach(function (element) {
          element.classList.add('hidden');
        });

        mockFeatures.offer.features.forEach(function (element) {
          var popupFeature = popupFeatures.querySelector('.popup__feature--' + element);
          popupFeature.classList.remove('hidden');
        });
      }

      function changePopup() {
        var popupTitle = objNode.querySelector('.popup__title');
        var popupTextAddress = objNode.querySelector('.popup__text--address');
        var popupOfferPrice = objNode.querySelector('.popup__text--price');
        var popupOfferType = objNode.querySelector('.popup__type');
        var popupTextCapacity = objNode.querySelector('.popup__text--capacity');
        var popupTextTime = objNode.querySelector('.popup__text--time');
        var popupDescription = objNode.querySelector('.popup__description');
        var popupAvatar = objNode.querySelector('.popup__avatar');

        popupTitle.textContent = obj.offer.title;
        popupTextAddress.textContent = obj.offer.address;
        popupOfferPrice.textContent = obj.offer.price + '₽/ночь';
        popupOfferType.textContent = defineTypeHouse(obj.offer.type);
        popupTextCapacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
        popupTextTime.textContent = 'Заезд после ' + obj.offer.checkin + ',' + ' выезд до ' + obj.offer.checkout;
        popupDescription.textContent = obj.offer.description;
        popupAvatar.src = obj.author.avatar;
        renderFeatures(obj, objNode);
        renderPhotos(obj, objNode);
      }

      changePopup();

      return objNode;
    }

    function renderOffers(elements) {
      var fragment = document.createDocumentFragment();

      fragment.appendChild(createAdAndAddToDOM(elements));
      mapPins.after(fragment);
      var popupClose = document.querySelector('.popup__close');
      var mapCard = document.querySelector('.map__card');

      popupClose.addEventListener('click', function () {
        mapCard.parentNode.removeChild(mapCard);
        removeActiveClassOfMapPin();
      });
    }

    if (closestMapPin && !closestMapPin.classList.contains('map__pin--main')) {
      removeActiveClassOfMapPin();
      removeMapCard();

      closestMapPin.classList.add('map__pin--active');

      var target = uniqueObjectsAd.find(function (offer) {
        var id = closestMapPin.querySelector('img').dataset.id;
        return id.includes(offer.id);
      });

      renderOffers(target);
    }
  }

  mapPins.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      onMapPinsClick(evt);
    }
  });

  document.addEventListener('keydown', function (evt) {
    var mapCard = document.querySelector('.map__card');
    if (evt.key === 'Escape') {
      if (mapCard !== null) {
        mapCard.parentNode.removeChild(mapCard);
      }
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.backend.onLoadData(onLoad, onError);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.backend.onLoadData(onLoad, onError);
    }
  });

  mapPins.addEventListener('click', function (evt) {
    onMapPinsClick(evt);
  });

  var mapFilters = document.querySelector('.map__filters');
  var renderMapPinsWithDebounce = window.debounce(renderMapPins);

  mapFilters.addEventListener('change', function () {
    var uniqueObjectsAdForRender = window.filter.getFilteredData(uniqueObjectsAd);
    renderMapPinsWithDebounce(uniqueObjectsAdForRender);
  });

})();
