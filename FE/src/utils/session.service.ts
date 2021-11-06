/**
 * set session storage item
 * @param key
 * @param value
 */
export const setItem = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * get session storage item
 * @param key
 */
export const getItem = (key: string): any => {
  var value = sessionStorage.getItem(key) || '{}';
  return JSON.parse(value);
};

/**
 * remove session storage item
 * @param key
 */
export const removeItem = (key: string) => {
  sessionStorage.removeItem(key);
};

/**
 * remove all session storage items
 */
export const clear = () => {
  sessionStorage.clear();
};
