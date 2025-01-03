import { openFullViewPopup } from './full-picture-popup.js';

const PICTURE_SELECTOR = '.picture';
const PICTURES_SELECTOR = '.pictures';

let pictures = null;
const picturesContainerElement = document.querySelector(PICTURES_SELECTOR);

const createPictureTemplate = ({ id, url, description, likes, comments }) => `
  <a href="#" data-id="${id}" class="picture">
    <img class="picture__img" src="${url}" width="182" height="182" alt="${description}">
    <p class="picture__info">
      <span class="picture__comments">${comments.length}</span>
      <span class="picture__likes">${likes}</span>
    </p>
  </a>
`;

const onPicturesContainerClick = (evt) => {
  const targetElement = evt.target.closest(PICTURE_SELECTOR);

  if (targetElement) {
    const pictureId = +targetElement.dataset.id;
    const targetPicture = pictures.filter((picture) => picture.id === pictureId)[0];
    openFullViewPopup(targetPicture);
  }
};

export const renderPictures = (data) => {
  document
    .querySelectorAll(PICTURE_SELECTOR)
    .forEach((element) => element.remove());

  pictures = data.slice();
  if (pictures) {
    picturesContainerElement.insertAdjacentHTML(
      'afterbegin',
      pictures.map((picture) => createPictureTemplate(picture)).join('')
    );

    picturesContainerElement.addEventListener(
      'click',
      onPicturesContainerClick
    );
  }
};
