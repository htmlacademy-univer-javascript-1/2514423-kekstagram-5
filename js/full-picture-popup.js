import { isEscapeKey } from './utils.js';
import { COMMENTS_STEP } from './constants.js';

let comments = null;
let commentsToShow = COMMENTS_STEP;

const bodyElement = document.querySelector('body');
const fullPictureElement = bodyElement.querySelector('.big-picture');
const commentCountElement = fullPictureElement.querySelector('.social__comment-count');
const commentsElement = fullPictureElement.querySelector('.social__comments');
const commentsLoaderElement = fullPictureElement.querySelector('.social__comments-loader');
const exitButtonElement = fullPictureElement.querySelector('.big-picture__cancel');

const createCommentTemplate = ({ name, avatar, message }) =>`
  <li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>
`;

const renderFullPicture = ({ url, likes, description }) => {
  const picture = fullPictureElement.querySelector('.big-picture__img img');
  picture.src = url;
  picture.alt = description;

  fullPictureElement.querySelector('.social__caption').textContent = description;
  fullPictureElement.querySelector('.likes-count').textContent = likes;
};

const renderComments = () => {
  const visibleComments = comments.slice(0, commentsToShow);

  commentsElement.innerHTML = visibleComments
    .map((comment) => createCommentTemplate(comment))
    .join('');

  commentCountElement.textContent = `${visibleComments.length} из ${comments.length} комментариев`;

  if (visibleComments.length < comments.length) {
    commentsLoaderElement.classList.remove('hidden');
  } else {
    commentsLoaderElement.classList.add('hidden');
  }
};


const onCommentsShowMore = () => {
  commentsToShow += COMMENTS_STEP;
  renderComments();
};

const onCloseBtnClick = () => {
  closeFullViewPopup();
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullViewPopup();
  }
};

function closeFullViewPopup() {
  comments = null;
  commentsToShow = COMMENTS_STEP;

  fullPictureElement.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  exitButtonElement.removeEventListener('click', onCloseBtnClick);
  commentsLoaderElement.removeEventListener('click', onCommentsShowMore);
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

export const openFullViewPopup = (picture) => {
  comments = picture.comments;

  renderFullPicture(picture);
  renderComments();

  fullPictureElement.classList.remove('hidden');
  commentCountElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  exitButtonElement.addEventListener('click', onCloseBtnClick);
  commentsLoaderElement.addEventListener('click', onCommentsShowMore);
  document.addEventListener('keydown', onDocumentEscKeydown);
};
