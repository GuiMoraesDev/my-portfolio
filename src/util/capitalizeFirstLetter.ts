export const capitalizeFirstLetter = (string: string | string[]) => {
  if (Array.isArray(string)) {
    return string
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
      .join(" ");
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};
