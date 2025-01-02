import { initCreatePopup } from './create-picture-popup.js';
import { renderPictures } from './thumbnails.js';
import { getData } from './api.js';
import { debounce, showAlert } from './utils.js';
import { initFilters } from './filters.js';

getData()
  .then((pictures) => {
    renderPictures(pictures);
    initFilters(pictures, debounce(renderPictures));
  })
  .catch((err) => showAlert(err.message));

initCreatePopup();
