import { renderFunction } from './js/render-function';
import { getImagesGallery } from './js/pixabay-api';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export let imageSearch;
export let imageSet;

export const setGallery = document.querySelector('.gallery');
const form = document.querySelector('.form');

const loader = document.querySelector('.loader');

const showLoader = () => {
  loader.style.display = 'flex';
};
const hideLoader = () => {
  loader.style.display = 'none';
};
const handleLoad = () => {
  document.body.classList.add('loaded');
  document.body.classList.remove('loaded_hiding');
};

window.onload = handleLoad;

form.addEventListener('submit', async e => {
  e.preventDefault();
  setGallery.innerHTML = '';
  imageSearch = e.target.elements.search.value.trim();
  if (!imageSearch.length) {
    iziToast.error({
      color: '#fff021',
      message: `Please fill in the field for search query.`,
      position: 'topRight',
    });
    setGallery.innerHTML = '';
  }

  showLoader();
  try {
    const images = await getImagesGallery();
    imageSet = images.hits;
    if (!imageSet.length) {
      iziToast.error({
        color: '#EF4040',
        messageColor: '#ffffff',
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
    }

    renderFunction(images);
  } catch (error) {
    iziToast.error({
      color: '#EF4040',
      messageColor: '#ffffff',
      message: `❌ Sorry, there was a mistake. Please try again!`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    handleLoad();
  }
});
