import {createArrayOfPhotos} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const renderPicture = ({ url, likes, comments }) => {
  const preview = pictureTemplate.cloneNode(true);
  preview.querySelector('.picture__img').src = url;
  preview.querySelector('.picture__comments').textContent = comments;
  preview.querySelector('.picture__likes').textContent = likes;
  return preview;
};

const renderPictures = function () {
  const picturesFragment = document.createDocumentFragment();
  createArrayOfPhotos.forEach((picture) => {
    picturesFragment.appendChild(renderPicture(picture));
  });
  pictures.appendChild(picturesFragment);
};

export { renderPictures };
