import { imageSearch } from '../main';

export function getImagesGallery() {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '42985969-a702e02b9d921ed7e13374797',
    q: imageSearch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  const url = `${BASE_URL}?${params}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
