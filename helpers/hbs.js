import moment from 'moment';

export function formatDate(date, format) {
  return moment(date).format(format);
}

export function truncate(str, len) {
  if (str.length > len && str.length > 0) {
    // adds a space at the end incase there is none
    let newStr = str + ' ';
    // grabs only a portion of str
    newStr = str.substr(0, len);
    //to avoid ending at a space, we get last index of space
    newStr = str.substr(0, newStr.lastIndexOf(' '));
    // if we cut the str off to 0, then use original string
    newStr = newStr.length > 0 ? newStr : str.substr(0, len);
    return newStr + '...';
  }
  return str;
}

export function stripTags(str) {
  // match all HTML tags and replace with ""
  const formateStr = str.replace(/<(?:.|\n)*?>/gm, '');
  return formateStr;
}
