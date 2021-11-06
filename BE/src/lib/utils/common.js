export const convertStringArraytoArray = (string) => {
  const StringObject = string.slice(1, string.length - 1);
  const array = JSON.parse("[" + StringObject + "]");
  return array;
};
