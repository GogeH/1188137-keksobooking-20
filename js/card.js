'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

  // Функция отображения карточки объявления при клике по метке на карте
  function onMapPinsClick(evt) {
    var targetMapPin = evt.target;
    var closestMapPin = targetMapPin.closest('.map__pin');

    // Функции отрисовки карточки
    function createAdAndAddToDOM(obj) {
      var objTemplate = document.querySelector('#card').content.querySelector('.map__card');
      var objNode = objTemplate.cloneNode(true);

      // Функция выбора варианта для отображения типа жилья
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

      // Функция отображения фотографий предложения
      function renderPhotos(mockPhotos, node) {
        var popupPhotos = node.querySelector('.popup__photos');
        var popupPhoto = node.querySelector('.popup__photo');
        if (mockPhotos.offer.photos.length === 0) {
          popupPhotos.classList.add('hidden');
        }

        popupPhotos.innerHTML = '';
        for (var j = 0; j < mockPhotos.offer.photos.length; j++) {
          var popupImg = popupPhoto.cloneNode(true);
          popupImg.src = mockPhotos.offer.photos[j];
          popupPhotos.appendChild(popupImg);
        }
      }

      // Функция для отображения или скрытия опций
      function renderFeatures(mockFeatures, node) {
        var popupFeatures = node.querySelector('.popup__features');
        var featuresArray = popupFeatures.children;

        for (var i = 0; i < featuresArray.length; i++) {
          featuresArray[i].classList.add('hidden');
        }

        for (var j = 0; j < mockFeatures.offer.features.length; j++) {
          var popupFeature = popupFeatures.querySelector('.popup__feature--' + mockFeatures.offer.features[j]);
          popupFeature.classList.remove('hidden');
        }
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
        popupTextCapacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guest + ' гостей';
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
      });
    }

    if (closestMapPin && !closestMapPin.classList.contains('map__pin--main')) {
      var mapCard = document.querySelector('.map__card');
      if (mapCard !== null) {
        mapCard.parentNode.removeChild(mapCard);
      }

      var targetElement = window.data.uniqueObjects.find(function (offer) {
        var avatarSrc = closestMapPin.querySelector('img').src;
        return avatarSrc.includes(offer.author.avatar);
      });

      renderOffers(targetElement);
    }
  }

  window.card = {
    onMapPinsClick: onMapPinsClick,
  };

})();
