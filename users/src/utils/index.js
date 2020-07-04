export const normalizeForStore = (obj) => {
  const pattern = /,?"__[A-z]+":"[A-z]+",?/g;
  const withoutTypename = JSON.stringify(obj).replace(pattern, '');

  return JSON.parse(withoutTypename);
};

export const normalizeForGet = (string) => {
  const pattern = /\s/g;
  return string.trim().replace(pattern, '+');
};
