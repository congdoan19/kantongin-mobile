import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';
import countries from '../config/countries';

// Calculate product image width and items count.
const WINDOW_WIDTH = Dimensions.get('window').width;
const PRODUCT_AVERAGE_SIZE_PHONE = 130;
const PRODUCT_AVERAGE_SIZE_TABLET = 140;
const MIN_TABLET_WIDTH = 480;
const IMAGE_PADDING_PHONE = 16;
const IMAGE_PADDING_TABLET = 32;

const PRODUCT_AVERAGE_SIZE = (WINDOW_WIDTH > MIN_TABLET_WIDTH) ?
  PRODUCT_AVERAGE_SIZE_TABLET :
  PRODUCT_AVERAGE_SIZE_PHONE;

const IMAGE_PADDING = (WINDOW_WIDTH > MIN_TABLET_WIDTH) ?
  IMAGE_PADDING_PHONE :
  IMAGE_PADDING_TABLET;

export const PRODUCT_NUM_COLUMNS = Math.floor(WINDOW_WIDTH / PRODUCT_AVERAGE_SIZE);
export const PRODUCT_IMAGE_WIDTH = (
  Math.floor((WINDOW_WIDTH / PRODUCT_NUM_COLUMNS) * 10000) / 10000
) - IMAGE_PADDING;

// Get device info
export const lang = DeviceInfo.getDeviceLocale().split('-')[0];

// Strip tags
export const stripTags = str => str.replace(/<br[^>]*>/gi, '\n').replace(/(<([^>]+)>)/ig, '').trimLeft();

export const toArray = obj => Object.keys(obj).map(k => obj[k]);

export function getCountries() {
  const result = {};
  countries.forEach((item) => {
    if (!result[item.code]) {
      result[item.code] = item.name;
    }
  });

  return result;
}

export function getStates(code) {
  const result = {};
  const country = countries.find(i => i.code === code);
  if (!country || !country.states.length) {
    return null;
  }
  country.states.forEach((item) => {
    if (!result[item.code]) {
      result[`${item.code}`] = item.name;
    }
  });
  return result;
}

export function objectToQuerystring(obj) {
  return Object.keys.reduce((str, key, i) => {
    let val;
    const delimiter = (i === 0) ? '?' : '&';
    key = encodeURIComponent(key);
    val = encodeURIComponent(obj[key]);
    return [str, delimiter, key, '=', val].join('');
  }, '');
}

export function parseQueryString(query) {
  const obj = {};
  const qPos = query.indexOf("?");
  const tokens = query.substr(qPos + 1).split('&');

  i = tokens.length - 1;

  if (qPos !== -1 || query.indexOf("=") !== -1) {
    for (; i >= 0; i--) {
      const s = tokens[i].split('=');
      obj[unescape(s[0])] = s.hasOwnProperty(1) ? unescape(s[1]) : null;
    };
  }
  return obj;
}
