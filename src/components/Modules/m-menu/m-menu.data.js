export default {
  menu: {
    items: [
      {
        name: 'home',
        label: 'Boards',
        classes: 'btn btn-outline-success btn-sm',
        isLoggedIn: true,
      },
      {
        name: 'login',
        label: 'Login',
        classes: 'btn btn-outline-success btn-sm',
        isLoggedIn: false,
      },
      {
        name: 'signup',
        label: 'Sign up',
        classes: 'btn btn-outline-primary btn-sm',
        isLoggedIn: false,
      },
    ],
  },
  isLoggedIn: false,
};
