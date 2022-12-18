export const merge = (
  strings: (string | undefined | null)[],
  separator?: string,
) => {
  return strings.filter(str => str != null).join(separator ?? ' ');
};

export const notEmpty = (str?: string | null) =>
  str != null && str.trim().length > 0;
