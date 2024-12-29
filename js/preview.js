import { createArrayOfPhotos } from './data.js';
import { postOpen } from './post.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const imgFiltersElement = document.querySelector('.img-filters');

const renderPreview = (post) => {
  const preview = pictureTemplate.cloneNode(true);
  preview.querySelector('.picture__img').src = post.url;
  preview.querySelector('.picture__comments').textContent = post.comments.length;
  preview.querySelector('.picture__likes').textContent = post.likes;
  preview.addEventListener('click', (evt) => {
    evt.preventDefault();
    postOpen(post);
  });

  return preview;
};

const renderPreviews = function () {
  const picturesFragment = document.createDocumentFragment();
  createArrayOfPhotos.forEach((picture) => {
    picturesFragment.appendChild(renderPreview(picture));
  });

  pictures.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });

  pictures.appendChild(picturesFragment);

  imgFiltersElement.classList.remove('img-filters--inactive');
};

export { renderPreviews };
