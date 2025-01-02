import { RANDOM_PICTURES_COUNT, Filter } from './constants.js';

const FILTERS_BUTTON_CLASS = 'img-filters__button';
const FILTER_ACTIVE_CLASS = `${FILTERS_BUTTON_CLASS}--active`;
const filtersContainerElement = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;
const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getDefaultPictures = () => pictures.slice();
const getRandomPictures = () => pictures.slice().sort(sortRandomly).slice(0, RANDOM_PICTURES_COUNT);
const getDiscussedPictures = () => pictures.slice().sort(sortByComments);

const filterMethod = {
  [Filter.DEFAULT]: getDefaultPictures,
  [Filter.RANDOM]: getRandomPictures,
  [Filter.DISCUSSED]: getDiscussedPictures,
};

const getFilteredPictures = () => filterMethod[currentFilter]();

const setOnFilterClick = (cb) => {
  filtersContainerElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains(FILTERS_BUTTON_CLASS)) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filtersContainerElement.querySelector(`.${FILTER_ACTIVE_CLASS}`).classList.remove(FILTER_ACTIVE_CLASS);
    clickedButton.classList.add(FILTER_ACTIVE_CLASS);
    currentFilter = clickedButton.id;

    cb(getFilteredPictures());
  });
};

export const initFilters = (data, cb) => {
  pictures = data.slice();
  filtersContainerElement.classList.remove('img-filters--inactive');
  setOnFilterClick(cb);
};

