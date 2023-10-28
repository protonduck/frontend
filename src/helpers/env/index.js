export default {
  getItem: (name) => {
    return import.meta.env[name] ? import.meta.env[name] : null;
  },
};
