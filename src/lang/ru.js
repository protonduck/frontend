export default {
  menu: {
    boards: 'Доски',
    login: 'Вход',
    logout: 'Выйти',
    signup: 'Регистрация'
  },
  form: {
    name: 'Название',
    username: 'Имя',
    email: 'E-Mail',
    password: 'Пароль',
    passwordConfirm: 'Подтвердите пароль',
    add: 'Добавить',
    save: 'Сохранить',
    update: 'Изменить',
    close: 'Закрыть',
    remove: 'Удалить',
    addCategory: '@:form.add категорию',
    updateCategory: '@:form.update категорию',
    description: 'Описание',
    color: 'Цвет',
    icon: 'Иконка',
    board: {
      id: 'Доска',
      name: 'Имя',
      image: 'URL картинки',
      add: 'Добавить доску',
      update: 'Изменить доску'
    },
    link: {
      add: 'Добавить закладку',
      update: 'Изменить закладку',
      title: 'Заголовок',
      description: 'Описание',
      url: 'Ссылка',
      category_id: 'Категория'
    }
  },
  category: {
    add: 'Добавить категорию'
  },
  link: {
    add: 'Добавить закладку'
  },
  error: {
    required: 'Поле является обязательным',
    tooShort: 'Слишком короткое (мин: {min})',
    tooLong: 'Слишком длинное (макс: {max})',
    notValidUrl: 'Пожалуйста, введите действительный URL.',
    incorrect_login_password: 'Не верный логин или пароль.',
    email_invalid: 'Пожалуйста, введите действительный E-Mail.',
    email_not_unique: 'Аккаунт с таким E-Mail уже существует.'
  },
  serverError: 'Ошибка. Что-то пошло не так.'
};
