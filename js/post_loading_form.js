import { isEscEvent } from './util.js';
import { resetEffects } from './effects-image.js';
import {resetScale} from './scale-control.js';

const MAX_HASHTAGS_COUNT = 5;
const HASHTAGS_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const TAGS_ERROR_TEXT = 'Неправильно прописаны хештеги';

const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const fileField = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');

const successElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = document.querySelector('#success').content.querySelector('.success__button');
const errorElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = document.querySelector('#error').content.querySelector('.error__button');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const openModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();

  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const ifInTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (isEscEvent(evt) && !ifInTextFieldFocused()) {
    evt.preventDefault();
    const hasHiddenPopup = document.querySelector('.error');
    if (!hasHiddenPopup) {
      closeModal();
    }
  }
}

const onCancelButtonClick = () => {
  closeModal();
};

const onFileInputChange = () => {
  openModal();
};

const isValidTag = (tag) => HASHTAGS_RULES.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAGS_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  TAGS_ERROR_TEXT
);

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const showSuccessMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(successElement);
    } else {
      const successElementClone = document.querySelector('.success');
      successElementClone.classList.remove('hidden');
    }
  };
};

const showFullSuccessMessage = showSuccessMessage();

const showErrorMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(errorElement);
    } else {
      const errorElementClone = document.querySelector('.error');
      errorElementClone.classList.remove('hidden');
    }
  };
};

const showFullErrorMessage = showErrorMessage();

const hideModalMessage = () => {
  successElement.classList.add('hidden');
  errorElement.classList.add('hidden');
};

const closeModalMessageWithClickOnBody = (evt) => {
  evt.stopPropagation();
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    hideModalMessage();
  }
};

const closeModalMessageWithClickOnButton = () => {
  hideModalMessage ();
};

const closeModalMessageWithPressEsc = (evt) => {
  if (isEscEvent(evt)) {
    hideModalMessage ();
  }
};

const onFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      successButtonElement.addEventListener('click', closeModalMessageWithClickOnButton);
      errorButtonElement.addEventListener('click', closeModalMessageWithClickOnButton);
      document.addEventListener('keydown', closeModalMessageWithPressEsc);
      document.addEventListener('click', closeModalMessageWithClickOnBody);
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export { onFormSubmit, closeModal, showFullSuccessMessage, showFullErrorMessage };
