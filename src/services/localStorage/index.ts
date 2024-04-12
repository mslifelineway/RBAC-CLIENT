export const getFromLocalStorage = (key: string) => {
  const val = localStorage.getItem(key) || "";
  return val.length > 0 ? JSON.parse(val) : "";
};

export const setToLocalStorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
