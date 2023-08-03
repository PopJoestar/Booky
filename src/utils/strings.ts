export const mergeStrings = (
  strings: (string | undefined | null)[],
  separator?: string,
) => {
  return strings.filter(str => str != null).join(separator ?? ' ');
};

export const notEmptyString = (str?: string | null) =>
  str != null && str.trim().length > 0;
