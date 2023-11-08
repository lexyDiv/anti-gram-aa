export function messageReg(str: string): string {
  switch (str) {
    case "ok":
      return "Подходящий ник!";
    case "name":
      return "Введите имя!";
    case "email":
      return "Введите адрес электронной почты!";
    case "password":
      return "Пароль не может быть короче четырёх знаков!";
    case "phone":
      return "Не корректный номер телефона!";
    case "nick":
      return "Введите ник!";
    case "clear":
      return "Ваш ник будут видеть другие пользователи.";
    case "check":
      return "Идёт проверка ника на уникальность!";
    case "bad":
      return "Этот ник занят другим пользователем, придумайте другой!";
    case "load":
      return "Сервер не доступен. Попробуйте позже!";
    case "userByNick":
      return "Кто-то успел занять этот ник!";
    case "userByEmail":
      return "Этот адрес электронной почты занят!";
    case "userMiss":
      return "Неверный ник или пароль!";
    case "noUser":
      return "Вы ХАККЕР ???";
    default:
      return "";
  }
}
