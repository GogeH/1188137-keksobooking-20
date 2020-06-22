'use strict';

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');

var COUNT_UNIQUE_OBJECTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME_DATA = ['12.00', '13.00', '14.00'];
var CHECKOUT_TIME_DATA = ['12.00', '13.00', '14.00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTION = 'Description text №';
var MIN_LOCATION_X = 0;
var MAX_LOCATION_X = 1200;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var PIN_X = 50;
var PIN_Y = 70;

var uniqueObjects = [];

function generateUniqueObjects() {
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
}

function getAvatars() {
  var avatars = [];

  for (var i = 0; i < COUNT_UNIQUE_OBJECTS; i++) {
    avatars.push('img/avatars/user' + '0' + i + '.png');
  }

  return avatars;
}

function getTitles() {
  var titles = [];

  for (var i = 0; i < COUNT_UNIQUE_OBJECTS; i++) {
    titles.push('Unique Title ' + i);
  }

  return titles;
}

function getPrices() {
  var prices = [];

  for (var i = 0; i < COUNT_UNIQUE_OBJECTS; i++) {
    prices.push(Math.floor(Math.random() * 10000));
  }

  return prices;
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

function createNewElement() {
  var pattern = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < COUNT_UNIQUE_OBJECTS; i++) {
    var newElement = pattern.cloneNode(true);

    newElement.style = 'left: ' + (uniqueObjects[i].location.x - PIN_X / 2) + 'px; top: ' + (uniqueObjects[i].location.y - PIN_Y) + 'px;';
    newElement.querySelector('img').src = uniqueObjects[i].author.avatar;
    newElement.querySelector('img').alt = uniqueObjects[i].offer.title;

    fragment.appendChild(newElement);
  }

  mapPins.appendChild(fragment);
}

function renderNewElements(elements) {
  var fragment = document.createDocumentFragment();

  elements.forEach(function (element) {
    fragment.appendChild(element);
  });

  mapPins.appendChild(fragment);
}

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

// Функции отрисовки карточки
function createAdAndAddToDOM(obj) {
  var objTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var objNode = objTemplate.cloneNode(true);

  var popupTitle = objNode.querySelector('.popup__title');
  var popupTextAdress = objNode.querySelector('.popup__text--address');
  var popupOfferPrice = objNode.querySelector('.popup__text--price');
  var popupOfferType = objNode.querySelector('.popup__type');
  var popupTextCapacity = objNode.querySelector('.popup__text--capacity');
  var popupTextTime = objNode.querySelector('.popup__text--time');

  var popupDescription = objNode.querySelector('.popup__description');
  var popupAvatar = objNode.querySelector('.popup__avatar');

  popupTitle.textContent = obj.offer.title;
  popupTextAdress.textContent = obj.offer.address;
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

map.classList.remove('map--faded');

generateUniqueObjects();

var elements = [];

uniqueObjects.forEach(function (uniqueObject) {
  var domElement = createAdAndAddToDOM(uniqueObject);
  elements.push(domElement);
});

renderNewElements(elements);
createNewElement();
