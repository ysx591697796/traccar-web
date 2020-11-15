import moment from 'moment';
import t from '../common/localization';

export const formatPosition = (value, key) => {
  if (value != null && typeof value === 'object') {
    value = value[key];
  }
  switch (key) {
    case 'fixTime':
    case 'deviceTime':
    case 'serverTime':
      // return moment(value).format('LLL');
      return formDate(value);
    case 'latitude':
      return standardLat(value).toFixed(5);
    case 'longitude':
      return standardLon(value).toFixed(5);
    case 'speed':
    case 'course':
      return value.toFixed(1);
    case 'batteryLevel':
      return value + '%';
    case 'battery':
      // return parseInt(((parseFloat(value) - 3.3) / 0.9) * 100);
      return value;
    case 'attributes':
      return parseInt(((parseFloat(value.battery) - 3.3) / 0.9) * 100);
    default:
      if (typeof value === 'number') {
        return formatNumber(value);
      } else if (typeof value === 'boolean') {
        return formatBoolean(value);
      } else {
        return value;
      }
  }
}

var earthRad = 6378137.0;

//4326 to 3875
export function standardLat(lat) {
  var a = lat * Math.PI / 180;
  var result = earthRad / 2 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
  return result;
}

//4326 to 3875
export function standardLon(lon) {
  var result = lon * Math.PI / 180 * earthRad;
  return result;
}

export function formDate(dateForm) {
  if (dateForm === "") {
    return "";
  } else {
    var dateee = new Date(dateForm).toJSON();
    var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    return date;
  }
}

export const formatBoolean = (value) => {
  return value ? t('sharedYes') : t('sharedNo');
}

export const formatNumber = (value, precision = 1) => {
  return Number(value.toFixed(precision));
}
