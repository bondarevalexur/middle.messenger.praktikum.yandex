import { Block } from "../core";

export const validateText = (input: Block) => {
  if (!/^[A-Za-zА-Яа-я-]{0,15}$/i.test(input.getState().value)) {
    input.setState({ error: "Ошибка: можно вводить только текст" });
  } else {
    input.getState().error && input.setState({ error: null });
  }
};

export const validateLogin = (input: Block) => {
  if (!/^[A-Za-zА-Яа-я-_!0-9]{0,15}$/i.test(input.getState().value)) {
    input.setState({
      error: "Ошибка: можно вводить только текст цифры и !_-",
    });
  } else {
    input.getState().error && input.setState({ error: null });
  }
};
export const validatePhone = (input: Block) => {
  if (!/(?:\+|\d)[\d\-\(\) ]{9,}\d/g.test(input.getState().value)) {
    input.setState({ error: "Ошибка: введите корректный номер телефона" });
  } else {
    input.getState().error && input.setState({ error: null });
  }
};

export const validatePassword = (input: Block) => {
  if (!/^.*(?=.{8,})(?=.*[A-Z])(?=.*\d).*$/i.test(input.getState().value)) {
    input.setState({
      error:
        "Ошибка: Пароль должен содержать от 8 символов и по крайней мере одну цифру, одну букву",
    });
  } else {
    input.getState().error && input.setState({ error: null });
  }
};

export const validateEmail = (input: Block) => {
  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      input.getState().value
    )
  ) {
    input.setState({ error: "Ошибка: неверный формат Email" });
  } else {
    input.getState().error && input.setState({ error: null });
  }
};
