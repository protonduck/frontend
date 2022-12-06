export default {
  getItem: (name, toArray = false, storage = localStorage) => {
    return toArray ? JSON.parse(storage.getItem(name)) : storage.getItem(name);
  },
  setItem: (name, data, stringify = false, storage = localStorage) => {
    storage.setItem(name, stringify ? JSON.stringify(data) : data);
  },
  removeItem: (name, storage = localStorage) => {
    storage.removeItem(name);
  },
  clearItems: (storage = localStorage) => {
    if (storage.length) {
      storage.clear();
    }
  }
};
