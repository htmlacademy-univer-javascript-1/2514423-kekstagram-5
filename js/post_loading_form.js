import { isEscEvent } from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const HASHTAGS_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const TAGS_ERROR_TEXT = 'Неправильно прописаны хештеги';
const form = document.querySelector('#upload-select-image');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const fileField = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');

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
    closeModal();
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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
