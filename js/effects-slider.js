import { Effect, EffectSetting } from './constants.js';

const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const imageElement = uploadOverlayElement.querySelector('.img-upload__preview img');
const effectsElement = uploadOverlayElement.querySelector('.effects');
const effectLevelElement = uploadOverlayElement.querySelector('.effect-level');
const effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
const sliderElement = effectLevelElement.querySelector('.effect-level__slider');

let selectedEffect = null;

const clearFilter = () => {
  imageElement.style.filter = null;
};

const setFilter = () => {
  const { FILTER, UNIT } = EffectSetting[selectedEffect];
  imageElement.style.filter = `${FILTER}(${effectLevelValueElement.value}${UNIT})`;
};

const onSliderUpdate = () => {
  effectLevelValueElement.value = sliderElement.noUiSlider.get();
  setFilter();
};

const showSlider = () => {
  effectLevelElement.classList.remove('hidden');
  setFilter();
};

const hideSlider = () => {
  effectLevelElement.classList.add('hidden');
  clearFilter();
};

const removeSlider = () => {
  selectedEffect = Effect.DEFAULT;
  hideSlider();
  sliderElement.noUiSlider.destroy();
};

const createSlider = () => {
  selectedEffect = Effect.DEFAULT;
  hideSlider();

  noUiSlider.create(sliderElement, {
    start: EffectSetting[selectedEffect].MAX,
    step: EffectSetting[selectedEffect].STEP,
    range: {
      min: EffectSetting[selectedEffect].MIN,
      max: EffectSetting[selectedEffect].MAX,
    },
    connect: 'lower',
    format: {
      to: (value) => +value,
      from: (value) => +value,
    }
  });

  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const updateSlider = () => {
  if (selectedEffect === Effect.DEFAULT) {
    hideSlider();
  } else {
    sliderElement.noUiSlider.updateOptions({
      start: EffectSetting[selectedEffect].MAX,
      step: EffectSetting[selectedEffect].STEP,
      range: {
        min: EffectSetting[selectedEffect].MIN,
        max: EffectSetting[selectedEffect].MAX,
      },
    });

    showSlider();
  }
};

const onEffectsChange = (evt) => {
  selectedEffect = evt.target.value;
  updateSlider();
};

export const destroyEffectsSlider = () => {
  removeSlider();
  effectsElement.removeEventListener('change', onEffectsChange);
};

export const initEffectsSlider = () => {
  createSlider();
  effectsElement.addEventListener('change', onEffectsChange);
};
