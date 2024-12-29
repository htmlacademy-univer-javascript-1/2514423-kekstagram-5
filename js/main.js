import { renderPreviews } from './preview.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import { onFormSubmit, closeModal, showFullSuccessMessage, showFullErrorMessage } from './edit-form.js';
import { initFilterListeners } from './filter.js';

const RENDER_PHOTOS_DELAY = 500;

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showFullSuccessMessage();
  } catch {
    showFullErrorMessage();
  }
});

try {
  const data = await getData();
  renderPreviews(data);
  initFilterListeners(data, debounce(renderPreviews, RENDER_PHOTOS_DELAY));
} catch (err) {
  showAlert(err.message);
}
