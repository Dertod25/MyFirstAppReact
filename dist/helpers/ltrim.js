export function ltrim(chars) {
  if (typeof chars === 'string') {
    return chars.replace(/^\s+/, '');
  } else {
    return chars;
  }
}
