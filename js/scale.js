import { Scale } from './constants.js';
import { parseNumber } from './utils.js';

const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const imageElement = uploadOverlayElement.querySelector('.img-upload__preview img');
const scaleElement = uploadOverlayElement.querySelector('.img-upload__scale');
const scaleValueElement = scaleElement.querySelector('.scale__control--value');
const increaseScaleButtonElement = scaleElement.querySelector('.scale__control--bigger');
const reduceScaleButtonElement = scaleElement.querySelector('.scale__control--smaller');

const setImageScale = (scale) => {
  imageElement.style.transform = `scale(${scale / 100})`;
  scaleValueElement.value = `${scale}%`;
};

const onIncreaseBtnClick = () => {
  const scale = parseNumber(scaleValueElement.value);
  const newScale = Math.min(scale + Scale.STEP_SCALE, Scale.MAX_SCALE);
  setImageScale(newScale);
};

const onReduceBtnClick = () => {
  const scale = parseNumber(scaleValueElement.value);
  const newScale = Math.max(scale - Scale.STEP_SCALE, Scale.MIN_SCALE);
  setImageScale(newScale);
};

export const destroyScale = () => {
  increaseScaleButtonElement.removeEventListener('click', onIncreaseBtnClick);
  reduceScaleButtonElement.removeEventListener('click', onReduceBtnClick);
};

export const initScale = () => {
  setImageScale(Scale.DEFAULT_SCALE);
  increaseScaleButtonElement.addEventListener('click', onIncreaseBtnClick);
  reduceScaleButtonElement.addEventListener('click', onReduceBtnClick);
};
