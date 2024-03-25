import { setGallery } from '../main';
import { imageSet } from '../main';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderFunction() {
  setGallery.innerHTML = '';

  const imagesGallery = imageSet
    .map(
      image => `<li class="img-blok">
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
   </li>`
    )
    .join('');

  setGallery.insertAdjacentHTML('beforeend', imagesGallery);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
  });
  lightbox.refresh();
}
