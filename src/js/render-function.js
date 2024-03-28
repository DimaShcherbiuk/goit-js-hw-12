import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const setGallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});
lightbox.refresh();

export function renderFunction(imageSet) {
  imageSet.forEach(image => {
    const imagesGallery = `<li class="img-blok">
        <a href="${image.largeImageURL}">     
    <img  src="${image.webformatURL}"
    data-source="${image.largeImageURL}"
    alt="${image.tags}">
     <ul class="image-descript">
      <li><h3>likes</h3><p>${image.likes}</p></li>
      <li><h3>views</h3><p>${image.views}</p></li>
      <li><h3>comments</h3><p>${image.comments}</p></li>
      <li><h3>downloads</h3><p>${image.downloads}</p></li>
     </ul>
   </a>
   </li>`;

    setGallery.insertAdjacentHTML('beforeend', imagesGallery);
  });
  lightbox.refresh();
}

export function showEndOfCollectionMessage() {
  const endMessage = document.createElement('p');
  endMessage.classList.add('end-message');
  endMessage.textContent =
    "We're sorry, but you've reached the end of search results.";

  setGallery.insertAdjacentElement('afterend', endMessage);
}
