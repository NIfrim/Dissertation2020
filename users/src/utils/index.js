export const normalizeForStore = (obj) => {
  const pattern = /,?"__[A-z]+":"[A-z]+",?/g;
  const withoutTypename = JSON.stringify(obj).replace(pattern, '');

  return JSON.parse(withoutTypename);
};

export const normalizeForGet = (string) => {
  const pattern = /\s/g;
  return string.trim().replace(pattern, '+');
};

export const capitalize = (value) => {
  return !value
    ? ''
    : value[0] === value[0].toUpperCase()
    ? value
    : value[0].toUpperCase().concat(value.slice(1));
};
