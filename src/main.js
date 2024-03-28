import { getImagesGallery } from './js/pixabay-api';
import {
  setGallery,
  showEndOfCollectionMessage,
  renderFunction,
} from './js/render-function';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let imageSearch = '';
let pageCounter = 1;
const perPage = 15;

const form = document.querySelector('.form');
const inputElement = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn-load-more');
const scrollTopBtn = document.querySelector('.scroll-top');

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
  hideLoadMoreBtn();

  imageSearch = inputElement.value.trim();
  pageCounter = 1;

  setGallery.innerHTML = '';

  if (!imageSearch.length) {
    iziToast.error({
      color: '#fff021',
      message: `Please fill in the field for search query.`,
      position: 'topRight',
    });
    setGallery.innerHTML = '';
    return;
  }

  hideEndOfCollectionMessage();
  showLoader();
  try {
    const imageSet = await getImagesGallery(imageSearch, pageCounter, perPage);
    const totalHits = imageSet.totalHits;

    if (imageSet.hits.length === 0) {
      setGallery.innerHTML = '';

      iziToast.error({
        color: '#EF4040',
        messageColor: '#ffffff',
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
      hideLoadMoreBtn();
      return;
    } else {
      renderFunction(imageSet.hits);
      inputElement.value = '';
      showLoadMoreBtn();
    }
    if (perPage * pageCounter >= totalHits) {
      hideLoadMoreBtn();
      showEndOfCollectionMessage();
    }
  } catch (error) {
    console.log('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    handleLoad();
  }

  loadMoreBtn.addEventListener('click', async () => {
    showLoader();

    try {
      if (loadMoreBtn) {
        pageCounter += 1;
      }
      const imageSet = await getImagesGallery(
        imageSearch,
        pageCounter,
        perPage
      );
      const totalHits = imageSet.totalHits;
      renderFunction(imageSet.hits);
      showLoader();
      if (perPage * pageCounter >= totalHits) {
        hideLoadMoreBtn();
        showEndOfCollectionMessage();
      }

      const galleryCardHeight =
        setGallery.firstElementChild.getBoundingClientRect().height;
      window.scrollBy({ top: galleryCardHeight * 3, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching more images:', error);
      iziToast.error({
        title: 'Error',
        message: `Error fetching more images: ${error}`,
      });
    } finally {
      hideLoader();
    }
  });
});

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function hideEndOfCollectionMessage() {
  const endMessage = document.querySelector('.end-message');
  if (endMessage) {
    endMessage.remove();
  }
}

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
scrollTopBtn.addEventListener('click', scrollTop);
