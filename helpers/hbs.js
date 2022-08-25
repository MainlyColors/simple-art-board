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

export function editIcon(storyUser, loggedUser, storyId, floating = true) {
  // checking if story on public board belongs to current logged in user
  if (storyUser._id.toString() == loggedUser._id.toString()) {
    // set floating button for public board
    if (floating) {
      // storyId points the story uuid
      return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
    } else {
      return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
    }
  } else {
    return '';
  }
}

// found on stackoverflow by travese
// options is <option/> elements
export function select(selected, options) {
  return options
    .fn(this)
    .replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"')
    .replace(
      new RegExp('>' + selected + '</option>'),
      ' selected="selected"$&'
    );
}
