'use strict';

var COUNT_UNIQUE_OBJECTS = 8;
var MAIN_PIN_SIZE = 40;

var mapPins = document.querySelector('.map__pins');
var mapAd = document.querySelector('.map');
var mainPin = mapAd.querySelector('.map__pin--main');
var inputAddress = document.querySelector('#address');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var mainPinSizeX = parseInt(mainPin.style.left, 10) + Math.floor(MAIN_PIN_SIZE / 2);
var mainPinSizeY = parseInt(mainPin.style.top, 10) + Math.floor(MAIN_PIN_SIZE / 2);
var roomsNumber = document.querySelector('#room_number');
var capacityGuests = document.querySelector('#capacity');
var typeHouse = document.querySelector('#type');

// Функция создания массива из 8 сгенерированных JS-объектов
function generateUniqueObjects(uniqueObjects) {
  uniqueObjects = [];

  var MIN_LOCATION_X = 0;
  var MAX_LOCATION_X = 1200;
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  var DESCRIPTION = 'Description text №';
  var CHECKIN_TIME_DATA = ['12.00', '13.00', '14.00'];
  var CHECKOUT_TIME_DATA = ['12.00', '13.00', '14.00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var avatars = getAvatars();
  var titles = getTitles();
  var prices = getPrices();
  var types = getRandomElements(TYPES);
  var rooms = getRandomNumbers(1, 3);
  var guests = getRandomNumbers(1, 5);
  var checkinData = getRandomElements(CHECKIN_TIME_DATA);
  var checkoutData = getRandomElements(CHECKOUT_TIME_DATA);
  var features = getRandomData(FEATURES);
  var photos = getRandomData(PHOTOS);

  function getAvatars() {
    var avatar = [];

    for (var i = 1; i <= COUNT_UNIQUE_OBJECTS; i++) {
      avatar.push('img/avatars/user' + '0' + i + '.png');
    }

    return avatar;
  }

  function getTitles() {
    var title = [];

    for (var i = 1; i <= COUNT_UNIQUE_OBJECTS; i++) {
      title.push('Unique Title ' + i);
    }

    return title;
  }

  function getPrices() {
    var price = [];

    for (var i = 0; i < COUNT_UNIQUE_OBJECTS; i++) {
      price.push(Math.floor(Math.random() * 10000));
    }

    return price;
  }

  function getRandomElements(data) {
    var elements = [];
    var minIndex = 0;
    var maxIndex = data.length - 1;

    for (var i = 0; i < COUNT_UNIQUE_OBJECTS; i++) {
      var randomIndex = getRandomNumber(minIndex, maxIndex);
      elements.push(data[randomIndex]);
    }

    return elements;
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomNumbers(min, max) {
    var numbers = [];

    for (var i = 0; i < COUNT_UNIQUE_OBJECTS; i++) {
      var randomNumber = getRandomNumber(min, max);
      numbers.push(randomNumber);
    }

    return numbers;
  }

  function getRandomData(data) {
    var result = [];
    var minIndex = 0;
    var maxIndex = data.length - 1;

    for (var i = 0; i < COUNT_UNIQUE_OBJECTS; i++) {
      var randomData = data.slice(minIndex, getRandomNumber(0, maxIndex));
      result.push(randomData);
    }

    return result;
  }

  for (var i = 0; i < COUNT_UNIQUE_OBJECTS; i += 1) {
    var obj = {
      author: {
        avatar: avatars[i],
      },
      offer: {
        title: titles[i],
        price: prices[i],
        type: types[i],
        rooms: rooms[i],
        guest: guests[i],
        checkin: checkinData[i],
        checkout: checkoutData[i],
        features: features[i],
        photos: photos[i],
        description: DESCRIPTION + i,
      },
      location: {
        x: getRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X),
        y: getRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y),
      },
    };

    obj.offer.address = obj.location.x + ', ' + obj.location.y;

    uniqueObjects.push(obj);
  }

  return uniqueObjects;
}

var uniqueObjects = generateUniqueObjects();

// Функции отрисовки карточки
function createAdAndAddToDOM(obj) {
  var objTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var objNode = objTemplate.cloneNode(true);

  var popupTitle = objNode.querySelector('.popup__title');
  var popupTextAddress = objNode.querySelector('.popup__text--address');
  var popupOfferPrice = objNode.querySelector('.popup__text--price');
  var popupOfferType = objNode.querySelector('.popup__type');
  var popupTextCapacity = objNode.querySelector('.popup__text--capacity');
  var popupTextTime = objNode.querySelector('.popup__text--time');

  var popupDescription = objNode.querySelector('.popup__description');
  var popupAvatar = objNode.querySelector('.popup__avatar');

  // Функция выбора варианта для отображения типа жилья
  function defineTypeHouse(homeType) {

    switch (homeType) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
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

  return objNode;
}

// Функция блокировки полей форм
function toggleFieldsAvailability(isLocked) {
  var fieldsetsAndSelects = document.querySelectorAll('fieldset, select');

  for (var i = 0; i < fieldsetsAndSelects.length; i++) {
    fieldsetsAndSelects[i].disabled = isLocked;
  }
}

// Функции активации формы и карты
function activatePage() {
  var adForm = document.querySelector('.ad-form');

  function renderMapPin(uniqueObjects) {
    var pattern = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < COUNT_UNIQUE_OBJECTS; i++) {
      var PIN_X = 50;
      var PIN_Y = 70;

      var newElement = pattern.cloneNode(true);

      newElement.style = 'left: ' + (uniqueObjects[i].location.x - PIN_X / 2) + 'px; top: ' + (uniqueObjects[i].location.y - PIN_Y) + 'px;';
      newElement.querySelector('img').src = uniqueObjects[i].author.avatar;
      newElement.querySelector('img').alt = uniqueObjects[i].offer.title;

      fragment.appendChild(newElement);
    }

    mapPins.appendChild(fragment);
  }

  if (mapAd.classList.contains('map--faded')) {
    mapAd.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    toggleFieldsAvailability(false);
    renderMapPin(uniqueObjects);

    mainPinSizeX = parseInt(mainPin.style.left, 10) + Math.floor(MAIN_PIN_SIZE / 2);
    mainPinSizeY = parseInt(mainPin.style.top, 10) + MAIN_PIN_SIZE;
    inputAddress.value = mainPinSizeX + ',' + mainPinSizeY;

    roomsNumber.addEventListener('change', synchronizeFields);
    capacityGuests.addEventListener('change', synchronizeFields);

    typeHouse.addEventListener('change', function () {
      changeMinPrice(typeHouse.value);
    });

    timeIn.addEventListener('change', onSelectTimeChange.bind(null, timeIn, timeOut));
    timeOut.addEventListener('change', onSelectTimeChange.bind(null, timeOut, timeIn));
  }
}

// Функциия проверки синхронизации полей
function synchronizeFields() {
  var guestRoomsMap = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  if (guestRoomsMap[roomsNumber.value].indexOf(capacityGuests.value) === -1) {
    capacityGuests.setCustomValidity('Укажите допустимое количество гостей');
  } else {
    capacityGuests.setCustomValidity('');
  }
}

// Функция изменения минимального значения поля «Цена за ночь»
function changeMinPrice() {
  var price = document.querySelector('#price');

  switch (typeHouse.value) {
    case 'bungalo':
      price.placeholder = 0;
      price.min = 0;
    case 'flat':
      price.placeholder = 1000;
      price.min = 1000;
    case 'house':
      price.placeholder = 5000;
      price.min = 5000;
    case 'palace':
      price.placeholder = 10000;
      price.min = 10000;
  }
}

// Функции определения времени въезда/выезда
function onSelectTimeChange(time1, time2) {
  time1.value = time2.value;
}

// Функция отображения карточки объявления при клике по метке на карте
function onMapPinsClick(evt) {
  var targetMapPin = evt.target;
  var closestMapPin = targetMapPin.closest('.map__pin');

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

    var targetElement = uniqueObjects.find(function (offer) {
      var avatarSrc = closestMapPin.querySelector('img').src;
      return avatarSrc.includes(offer.author.avatar);
    });

    renderOffers(targetElement);
  }
}

function init() {
  inputAddress.value = mainPinSizeX + ',' + mainPinSizeY;
  inputAddress.setAttribute('readonly', 'readonly');

  toggleFieldsAvailability(true);
  synchronizeFields();

  changeMinPrice(typeHouse);
}

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
});

// Обработчик с кнопки клавиатуры
mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
});

timeIn.addEventListener('change', onSelectTimeChange.bind(null, timeOut, timeIn));
timeOut.addEventListener('change', onSelectTimeChange.bind(null, timeIn, timeOut));

mapPins.addEventListener('click', onMapPinsClick);

// Обработчики открытия Popup
mapPins.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    onMapPinsClick(evt);
  }
});

// Обработчики закрытия Popup
document.addEventListener('keydown', function (evt) {
  var mapCard = document.querySelector('.map__card');
  if (evt.key === 'Escape') {
    if (mapCard !== null) {
      mapCard.parentNode.removeChild(mapCard);
    }
  }
});

init();

