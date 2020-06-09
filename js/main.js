'use strict';

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

  for (var i = 1; i <= COUNT_UNIQUE_OBJECTS; i += 1) {
    var obj = {
      author: {
        avatar: avatars[i - 1],
      },
      offer: {
        title: titles[i - 1],
        price: prices[i - 1],
        type: types[i - 1],
        room: rooms[i - 1],
        guest: guests[i - 1],
        checkin: checkinData[i - 1],
        checkout: checkoutData[i - 1],
        features: features[i - 1],
        photos: photos[i - 1],
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

  for (var i = 1; i <= COUNT_UNIQUE_OBJECTS; i++) {
    avatars.push('img/avatars/user' + '0' + i + '.png');
  }

  return avatars;
}

function getTitles() {
  var titles = [];

  for (var i = 1; i <= COUNT_UNIQUE_OBJECTS; i++) {
    titles.push('Unique Title ' + i);
  }

  return titles;
}

function getPrices() {
  var prices = [];

  for (var i = 1; i <= COUNT_UNIQUE_OBJECTS; i++) {
    prices.push(Math.floor(Math.random() * 10000));
  }

  return prices;
}

function getRandomElements(data) {
  var elements = [];
  var minIndex = 0;
  var maxIndex = data.length - 1;

  for (var i = 1; i <= COUNT_UNIQUE_OBJECTS; i++) {
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

  for (var i = 1; i <= COUNT_UNIQUE_OBJECTS; i++) {
    var randomNumber = getRandomNumber(min, max);
    numbers.push(randomNumber);
  }

  return numbers;
}

function getRandomData(data) {
  var result = [];
  var minIndex = 0;
  var maxIndex = data.length - 1;

  for (var i = 1; i <= COUNT_UNIQUE_OBJECTS ; i++) {
    var randomData = data.slice(minIndex, getRandomNumber(0, maxIndex));
    result.push(randomData);
  }

  return result;
}

generateUniqueObjects();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
  return fragment;
}

function renderNewElement() {
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(createNewElement());
}

renderNewElement();
