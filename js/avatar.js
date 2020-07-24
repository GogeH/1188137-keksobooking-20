'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];

  var headerPreviewField = document.querySelector('.ad-form__field input[type=file]');
  var headerPreview = document.querySelector('.ad-form-header__preview img');
  var housePhotoField = document.querySelector('.ad-form__upload input[type=file]');
  var housePreview = document.querySelector('.ad-form__photo');
  var houseUpload = document.querySelector('.ad-form__upload');

  var PhotoProperties = {
    WIDTH: '70px',
    HEIGHT: '70px',
    ALT: 'Фотография жилья',
    BORDER_RADIUS: '5px',
  };

  function loadPhoto(file, preview) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
    }
    reader.addEventListener('load', function () {
      preview.src = reader.result;
      housePreview.remove();
    });
    reader.readAsDataURL(file);
  }

  function createNewHousePhotos(fileChooser) {
    var file = fileChooser.files[0];
    if (file) {
      var newHousePhoto = document.createElement('img');
      var container = document.createElement('div');
      container.classList.add('ad-form__photo');
      newHousePhoto.style.width = PhotoProperties.WIDTH;
      newHousePhoto.style.height = PhotoProperties.HEIGHT;
      newHousePhoto.style.alt = PhotoProperties.ALT;
      newHousePhoto.style.borderRadius = PhotoProperties.BORDER_RADIUS;
      container.appendChild(newHousePhoto);
      houseUpload.insertAdjacentElement('afterend', container);
      loadPhoto(file, newHousePhoto);
    }
  }

  function removeHousePhotos() {
    var housePhotoPreview = document.querySelectorAll('.ad-form__photo');
    if (housePhotoPreview) {
      housePhotoPreview.forEach(function (el) {
        el.remove();
      });
    }
  }

  function removeHeaderPhotos() {
    var headerPhotosPreview = document.querySelector('.ad-form-header__preview img');
    if (headerPhotosPreview) {
      headerPhotosPreview.src = 'img/muffin-grey.svg';
    }
  }

  headerPreviewField.addEventListener('change', function () {
    var file = headerPreviewField.files[0];
    if (file) {
      loadPhoto(file, headerPreview);
    }
  });

  housePhotoField.addEventListener('change', function () {
    createNewHousePhotos(housePhotoField);
  });

  window.avatar = {
    removeHousePhotos: removeHousePhotos,
    removeHeaderPhotos: removeHeaderPhotos
  };
}());
