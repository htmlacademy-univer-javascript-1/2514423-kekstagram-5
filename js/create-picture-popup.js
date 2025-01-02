import { MAX_COUNT_HASHTAG, MAX_COMMENT_SYMBOL, HashtagError, HASHTAG_REGEX, SubmitButtonText } from './constants.js';
import { initEffectsSlider, destroyEffectsSlider } from './effects-slider.js';
import { initScale, destroyScale } from './scale.js';
import { isEscapeKey, isImageFile } from './utils.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';
import { sendData } from './api.js';

const bodyElement = document.querySelector('body');
const formElement = bodyElement.querySelector('.img-upload__form');
const formButtonElement = formElement.querySelector('.img-upload__submit');
const fileInputElement = formElement.querySelector('.img-upload__input');
const uploadOverlayElement = formElement.querySelector('.img-upload__overlay');
const mainImageElement = uploadOverlayElement.querySelector('.img-upload__preview img');
const effectsPreviewElements = uploadOverlayElement.querySelectorAll('.effects__item .effects__preview');
const exitButtonElement = uploadOverlayElement.querySelector('.img-upload__cancel');
const commentInputElement = uploadOverlayElement.querySelector('.text__description');
const hashtagsInputElement = uploadOverlayElement.querySelector('.text__hashtags');

let formValidator = null;

const splitHashtagInput = (value) => value.trim().split(' ').filter(Boolean);

const isValidHashtag = (value) => value
  ? splitHashtagInput(value).every((hashtag) => HASHTAG_REGEX.test(hashtag))
  : true;

const isCountValidHashtag = (value) => splitHashtagInput(value).length <= MAX_COUNT_HASHTAG;

const isUniqueValidHashtag = (value) => {
  const hashtags = splitHashtagInput(value).map((hastag) => hastag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

const isCountValidComment = (value) => value.length <= MAX_COMMENT_SYMBOL;

const initValidation = () => {
  formValidator = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper-error-text',
  });

  formValidator.addValidator(
    hashtagsInputElement,
    isValidHashtag,
    HashtagError.IS_NOT_VALID,
  );

  formValidator.addValidator(
    hashtagsInputElement,
    isUniqueValidHashtag,
    HashtagError.IS_NOT_UNIQUE,
  );

  formValidator.addValidator(
    hashtagsInputElement,
    isCountValidHashtag,
    HashtagError.IS_NOT_VALID_COUNT,
  );

  formValidator.addValidator(
    commentInputElement,
    isCountValidComment,
    `Длина комментария не более ${MAX_COMMENT_SYMBOL} символов`
  );
};

const toggleSubmitButton = (isDisabled = false) => {
  formButtonElement.disabled = isDisabled;
  formButtonElement.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.DEFAULT;
};

const onCloseBtnClick = () => {
  closeCreatePopup();
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.querySelector('.error')) {
    evt.preventDefault();
    closeCreatePopup();
  }
};

const onCommentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onHashtagEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (formValidator.validate()) {
    toggleSubmitButton(true);
    sendData(new FormData(evt.target))
      .then(() => {
        closeCreatePopup();
        showSuccessMessage();
      })
      .catch(showErrorMessage)
      .finally(toggleSubmitButton);
  }
};

const onFileChange = () => {
  const file = fileInputElement.files[0];
  if (isImageFile(file)) {
    mainImageElement.src = URL.createObjectURL(file);
    effectsPreviewElements.forEach((effect) => {
      effect.style.backgroundImage = `url(${mainImageElement.src})`;
    });
    openCreatePopup();
  } else {
    showErrorMessage();
    formElement.reset();
  }
};

function closeCreatePopup() {
  formValidator.reset();
  formElement.reset();
  destroyScale();
  destroyEffectsSlider();

  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  formElement.removeEventListener('submit', onFormSubmit);
  exitButtonElement.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  commentInputElement.removeEventListener('keydown', onCommentEscKeydown);
  hashtagsInputElement.removeEventListener('keydown', onHashtagEscKeydown);
}

function openCreatePopup () {
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  initValidation();
  initScale();
  initEffectsSlider();

  formElement.addEventListener('submit', onFormSubmit);
  exitButtonElement.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  commentInputElement.addEventListener('keydown', onCommentEscKeydown);
  hashtagsInputElement.addEventListener('keydown', onHashtagEscKeydown);
}

export const initCreatePopup = () => {
  fileInputElement.addEventListener('change', onFileChange);
};
