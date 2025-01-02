import { ALERT_SHOW_TIME } from './constants.js';

export const isEscapeKey = (evt) => evt.key === 'Escape';
export const isImageFile = (file) => file && file.type.startsWith('image/');
export const parseNumber = (string) => parseInt(string, 10);

export const showAlert = (message) => {
  const alertContainerElement = document.createElement('div');

  alertContainerElement.style.zIndex = '100';
  alertContainerElement.style.position = 'absolute';
  alertContainerElement.style.left = '0';
  alertContainerElement.style.top = '0';
  alertContainerElement.style.right = '0';
  alertContainerElement.style.margin = '5px 10px';
  alertContainerElement.style.padding = '10px 3px';
  alertContainerElement.style.fontSize = '22px';
  alertContainerElement.style.textAlign = 'center';
  alertContainerElement.style.backgroundColor = 'red';
  alertContainerElement.style.borderRadius = '5px';

  alertContainerElement.textContent = message;
  document.body.append(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
};

export const debounce = (cb, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};
