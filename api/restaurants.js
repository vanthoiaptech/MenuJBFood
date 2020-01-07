import {domain} from '../app/constants/urlDefine';

export const getApiRestaurants = async (
  language,
  category = null,
  page = null,
) => {
  try {
    let url = `${domain}/api/restaurants/${language}`;
    if (category !== null) {
      url = `${domain}/api/restaurants/${language}/${category}?page=${page}`;
    }
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return [];
  }
};
