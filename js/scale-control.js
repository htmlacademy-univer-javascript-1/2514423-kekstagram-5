const MIN = 25;
const MAX = 100;
const STEP = 25;
const DEFAULT_SIZE = 100;

const smallerButtonForm = document.querySelector('.scale__control--smaller');
const biggerButtonForm = document.querySelector('.scale__control--bigger');
const scaleInputForm = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  image.style.transform = `scale(${value / 100})`;
  scaleInputForm.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInputForm.value, 10);
  let newValue = currentValue - STEP;

  if (newValue < MIN) {
    newValue = MIN;
  }

  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputForm.value, 10);
  let newValue = currentValue + STEP;

  if (newValue > MAX) {
    newValue = MAX;
  }

  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT_SIZE);

smallerButtonForm.addEventListener('click', onSmallerButtonClick);
biggerButtonForm.addEventListener('click', onBiggerButtonClick);

export { resetScale };
