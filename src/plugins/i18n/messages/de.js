let site = {
  name: 'Bookmarks Manager',
  boardsList: {
    info: 'Klicke auf das "+" Zeichen, um ein neues Board anzulegen!',
  },
};

let menu = {
  home: 'Startseite',
  login: 'Anmelden',
  register: 'Registrieren',
  logout: 'Abmelden',
  export: 'Alle bookmarks als JSON Datei exportieren',
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
  boardName: {
    label: 'Board name',
    error: {
      required: 'Board name ist erforderlich.',
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

let addBoard = {
  title: 'Board hinzufügen',
  form: {
    name: form.boardName,
    button: {
      add: 'Board hinzufügen',
      save: 'Speichern',
      cancel: 'Abbrechen',
    },
  },
};

let removeBoard = {
  title: 'Board löschen',
  form: {
    name: form.boardName,
    button: {
      remove: 'Ja, genau!',
      save: 'Speichern',
      cancel: 'Abbrechen',
    },
  },
  info: 'Board und alle zugehörtige Kategorien und Links endgültig löschen?',
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
  addBoard,
  removeBoard,
  error,
  serverErrors,
};
