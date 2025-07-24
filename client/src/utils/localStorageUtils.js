// client/src/utils/localStorageUtils.js

export const getParsedLocalStorage = (key, fallback = null) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      localStorage.removeItem(key); // Remove corrupted or bad data
      return fallback;
    }
  };
  