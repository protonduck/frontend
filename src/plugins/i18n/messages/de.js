export default {
  site: {
    name: 'Bookmarks Manager',
  },
  menu: {
    home: 'Startseite',
    login: 'Login',
    signup: 'Anmelden',
    logout: 'Abmelden',
  },
  views: {
    login: {
      title: 'Anmelden',
      form: {
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
            min: 'Password muss mindestens {min} Zeichen lang sein',
          },
        },
      },
    },
    error: {
      title: 'Fehler',
      content: 'Seite nicht gefunden!',
    },
  },
};
