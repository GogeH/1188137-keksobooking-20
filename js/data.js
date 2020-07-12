'use strict';

var COUNT_UNIQUE_OBJECTS = 8;

(function () {
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

    var TOP_VERTICAL_LIMIT = 130;
    var BOTTOM_VERTICAL_LIMIT = 630;

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

  window.data = {
    generateUniqueObjects: generateUniqueObjects,
  };

})();
