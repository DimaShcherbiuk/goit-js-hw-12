import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesGallery(imageSearch, page, perPage) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: '42985969-a702e02b9d921ed7e13374797',
        q: imageSearch,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: perPage,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error', error);
    throw error();
  }
}
