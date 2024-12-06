import { isEscapeKey } from './util.js';

const COMMENTS_COUNT_START = 5;
const COMMENTS_COUNT_LOAD = 5;

const bigPicture = document.querySelector('.big-picture');
const social = bigPicture.querySelector('.social');
const commentsBlock = social.querySelector('.social__comments');
const commentsCount = social.querySelector('.social__comment-count');
const commentsLoader = social.querySelector('.social__comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const overlay = document.querySelector('.overlay');

let commentsCountLoaded = 0;

const toggleHiddenLoadComments = (flag) => {
  if (flag) {
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  } else {
    commentsCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
  }
};

const createComment = (comment) => {
  const commentBlock = commentTemplate.cloneNode(true);
  commentBlock.querySelector('.social__picture').src = comment.avatar;
  commentBlock.querySelector('.social__picture').alt = comment.name;
  commentBlock.querySelector('.social__text').textContent = comment.message;

  return commentBlock;
};

const createCommentsFragment = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });

  return commentsFragment;
};

const renderComments = (comments) => {
  const onCommentsLoaderClick = () => {
    renderComments(comments);
  };

  if (comments.length > 0) {

    if (!commentsCountLoaded) {
      commentsBlock.appendChild(createCommentsFragment(comments.slice(0, COMMENTS_COUNT_START)));
      commentsCountLoaded = COMMENTS_COUNT_START;
    } else {
      commentsBlock.appendChild(createCommentsFragment(comments.slice(commentsCountLoaded, commentsCountLoaded + COMMENTS_COUNT_LOAD)));
      commentsCountLoaded += COMMENTS_COUNT_LOAD;
    }

    if (comments.length > Math.max(COMMENTS_COUNT_START, commentsCountLoaded)) {
      toggleHiddenLoadComments(false);
      commentsCount.textContent = `${commentsCountLoaded} из `;
      const spanCommentsCount = document.createElement('span');
      spanCommentsCount.classList.add('comments-count');
      spanCommentsCount.textContent = comments.length;
      commentsCount.appendChild(spanCommentsCount);
      commentsCount.insertAdjacentText('beforeend', ' комментариев');

      commentsLoader.addEventListener('click', onCommentsLoaderClick.bind(null, comments), { once: true });
      return;
    }
  }
  toggleHiddenLoadComments(true);
};

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}


function onOverlayClick (evt) {
  if (!evt.target.closest('.big-picture__preview')) {
    closeBigPicture();
  }

}


function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  bigPictureCancel.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onPopupEscKeydown);
  overlay.removeEventListener('click', onOverlayClick);

}

const renderPost = (post) => {
  bigPicture.querySelector('.big-picture__img img').src = post.url;
  social.querySelector('.likes-count').textContent = post.likes;
  social.querySelector('.social__caption').textContent = post.description;
  commentsBlock.innerHTML = '';
  commentsCountLoaded = 0;
  renderComments(post.comments);
};

const postOpen = (post) => {
  renderPost(post);
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  bigPictureCancel.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onPopupEscKeydown);
  overlay.addEventListener('click', onOverlayClick);
};

export { postOpen };
