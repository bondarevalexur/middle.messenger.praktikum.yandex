import Block from "../../core/Block";

import "./style.scss";

import {
  validateEmail,
  validateText,
  validateLogin,
  validatePhone,
  validatePassword,
} from "../../helpers/validate";
import { requests } from "../../core/HTTPservise";

class ChangePassword extends Block {
  constructor() {
    const onButton = async (e: MouseEvent) => {
      e.preventDefault();

      const data: Indexed = {};
      const errors = Object.values(this.children).map((child: any) => {
        child?.trigger && child?.trigger();
        return child?.getError && child?.getError();
      });

      if (errors.filter((error) => Boolean(error))?.length < 1) {
        Object.entries(this.refs)?.forEach(([key, input]) => {
          data[key] = input.state.value;
        });
        const res = await requests.put("/user/password", data);

        if (res.status === 200) {
          alert("Пароль успешно изменен");
        } else {
          alert("Произошла ошибка, повторите");
        }
      }
    };

    super({
      validateEmail,
      validateText,
      validateLogin,
      validatePhone,
      validatePassword,
      onButton,
    });
  }

  componentDidMount() {
    if (window.store.getState().user) {
      Object.entries(this.refs).forEach(([key, value]) => {
        if (window.store.getState().user?.[key]) {
          value.setState({ value: window.store.getState().user?.[key] });
        }
      });
    }
  }

  render(): string {
    // language=hbs
    return `
        <div class="singUp text-24">
            <h1 class="text-black mb-24">
                Сменить пароль
            </h1>
            <form class="w-full" id="createProfile">
                {{{ Input label="Старый пароль" name="oldPassword" ref="oldPassword"
                          type="password"
                          id="oldPassword"
                          validate=validatePassword}}}
                {{{ Input label="Пароль" name="newPassword" type="password" ref="newPassword"
                          id="newPassword"
                          validate=validatePassword}}}
                {{{ Button text="Сменить пароль" onClick=onButton
                           className="partial--button singUp__login w-full text-20 mt-20 mb-12 text-black"}}}
            </form>
        </div>
    `;
  }
}

export default ChangePassword;
