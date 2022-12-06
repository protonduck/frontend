export default {
  site: {
    name: 'Bookmarks Manager',
  },
  menu: {
    home: 'Home',
    login: 'Login',
    signup: 'Sign up',
    logout: 'Logout',
  },
  views: {
    login: {
      title: 'Login',
      form: {
        email: {
          label: 'E-Mail',
          error: {
            required: 'Valid E-Mail required.',
          },
        },
        password: {
          label: 'Password',
          error: {
            required: 'Password required.',
            min: 'Password must be at least {min} characters.',
          },
        }
      }
    },
    error: {
      title: 'Error',
      content: 'Page not found!',
    }
  },
}
