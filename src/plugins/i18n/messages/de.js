import { mBoardList } from '@modules/m-boards-list/i18n/de.js';
import { mCategoriesList } from '@modules/m-categories-list/i18n/de.js';
import { mExport } from '@modules/m-export/i18n/de.js';

let site = {
  name: 'Bookmarks Manager',
};

let menu = {
  home: 'Startseite',
  login: 'Anmelden',
  register: 'Registrieren',
  logout: 'Abmelden',
};

let form = {
  email: {
    label: 'E-Mail',
    error: {
      required: 'Muss eine gültige E-Mail-Adresse sein',
    },
  },
  password: {
    label: 'Passwort',
    error: {
      required: 'Passwort erforderlich.',
    },
  },
};

let serverErrors = {
  incorrect_login_password: 'Login oder passwort ist falsch.',
  email_invalid: form.email.error.required,
  email_not_unique: 'E-Mail ist bereits vergeben.',
};

let login = {
  title: 'Anmelden',
  form: {
    email: form.email,
    password: form.password,
    button: 'Anmelden',
  },
};

let register = {
  title: 'Registrieren',
  form: {
    name: {
      label: 'Name',
      error: {
        required: 'Name ist erforderlich.',
      },
    },
    passwordConfirm: {
      ...form.password,
      label: 'Passwort bestätigen',
      error: {
        notMatch: 'Passwörter stimmen nicht überein.',
      },
    },
    email: form.email,
    password: form.password,
    button: 'Registrieren',
  },
  disallow: 'Die Registrierung neuer Benutzer ist deaktiviert.',
};

let error = {
  title: 'Fehler',
  content: 'Seite nicht gefunden!',
};

export default {
  site,
  menu,
  login,
  register,
  error,
  serverErrors,
  /*
    Modules
  */
  mBoardList,
  mCategoriesList,
  mExport,
};
