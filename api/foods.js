import {domain} from '../app/constants/urlDefine';

export const getApiFoodsByRestaurant = async (restaurant, language, page) => {
  try {
    let response = await fetch(
      `${domain}/api/foods/${restaurant}/${language}?page=${page}`,
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return [];
  }
};
