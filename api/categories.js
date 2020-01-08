import {domain} from '../app/constants/urlDefine';

export const getApiCategories = async language => {
  try {
    let response = await fetch(`${domain}/api/categories/${language}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return [];
  }
};
