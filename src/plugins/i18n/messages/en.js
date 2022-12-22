import { mBoardList } from '@modules/m-boards-list/i18n/en.js';
import { mCategoriesList } from '@modules/m-categories-list/i18n/en.js';
import { mLinksList } from '@modules/m-links-list/i18n/en.js';
import { mExport } from '@modules/m-export/i18n/en.js';

let site = {
  name: 'Bookmarks Manager',
};

let menu = {
  home: 'Home',
  login: 'Login',
  register: 'Register',
  logout: 'Logout',
  stats: 'Statistics',
};

let form = {
  email: {
    label: 'E-Mail',
    error: {
      required: 'Must be a valid email address.',
    },
  },
  password: {
    label: 'Password',
    error: {
      required: 'Password required.',
    },
  },
};

let serverErrors = {
  incorrect_login_password: 'Login or password is incorrect.',
  email_invalid: form.email.error.required,
  email_not_unique: 'E-mail is already taken.',
};

let login = {
  title: 'Login',
  form: {
    email: form.email,
    password: form.password,
    button: 'Login',
  },
};

let register = {
  title: 'Register',
  form: {
    name: {
      label: 'Name',
      error: {
        required: 'Name is required.',
      },
    },
    passwordConfirm: {
      ...form.password,
      label: 'Confirm password',
      error: {
        notMatch: 'Passwords do not match.',
      },
    },
    email: form.email,
    password: form.password,
    button: 'Register',
  },
  disallow: 'Registration of new users is disabled.',
};

let stats = {
  title: 'Statistics',
  table: {
    totalBoardTitle: 'Number of boards',
    totalCategoriesTitle: 'Number of categories',
    totalLinksTitle: 'Number of links',
  },
  info: 'Not enough data.',
};

let error = {
  title: 'Error',
  content: 'Page not found!',
};

export default {
  site,
  menu,
  login,
  register,
  stats,
  error,
  serverErrors,
  /*
    Modules
  */
  mBoardList,
  mCategoriesList,
  mLinksList,
  mExport,
};
