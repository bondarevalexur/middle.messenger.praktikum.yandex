import Block from "../../core/Block";

import "./style.scss";

import {
  validateEmail,
  validateText,
  validateLogin,
  validatePhone,
  validatePassword,
} from "../../helpers/validate";

import controller from "./controller";

class CRProfile extends Block {
  constructor() {
    const getComponent: any = () => this;

    const onButton = controller(getComponent);

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
    this.setState({ isEdit: Boolean(window.store.getState().user?.id) });

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
                {{#if isEdit }}
                    Редактировать профиль
                {{else}}
                    Регистрация
                {{/if}}
            </h1>
            <form class="w-full" id="createProfile">
                {{#if isEdit}}
                    {{{ Input ref="display_name" label="Ник" name="display_name" type="text"
                              id="display_name" }}}
                {{/if}}
                {{{ Input ref="email" label="Почта" name="email" type="text" validate=validateEmail
                          id="email" }}}
                {{{ Input label="Логин" required="true" name="login" type="text" ref="login"
                          ref="login"
                          validate=validateLogin}}}
                {{{ Input label="Имя" required="true" name="first_name" type="text" id="name"
                          ref="first_name"
                          validate=validateText}}}
                {{{ Input label="Фамилия" required="true" name="second_name" type="text"
                          id="surName"ref="second_name"
                          validate=validateText}}}
                {{{ Input label="Телефон" name="phone" type="tel" id="phone"ref="phone"
                          validate=validatePhone}}}

                {{#unless isEdit}}
                    {{{ Input label="Пароль" name="password" type="password" ref="password"
                              id="password"
                              validate=validatePassword}}}
                    {{{ Input label="Пароль (повтор)" name="secondPassword" ref="secondPassword"
                              type="password"
                              id="secondPassword"
                              validate=validatePassword}}}
                {{/unless}}
                {{{ Button text="Подтвердить" onClick=onButton
                           className="partial--button singUp__login w-full text-20 mt-20 mb-12 text-black"}}}
            </form>
        </div>
    `;
  }
}

export default CRProfile;
