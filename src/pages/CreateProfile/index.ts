import Block from "../../core/Block";

import "./style.scss";

import {
  validateEmail,
  validateText,
  validateLogin,
  validatePhone,
  validatePassword,
} from "../../helpers/validate";

class CreateProfile extends Block {
  constructor() {
    // const callValidateInput = (input: any) => {
    //   input?.props?.events?.input && input?.props?.events?.input();
    // };

    const create = (e: MouseEvent) => {
      e.preventDefault();

      const form = document.querySelector("#createProfile");
      const inputs = form?.querySelectorAll("input");
      const formData: { name: string; value: string }[] = [];

      const errors = Object.values(this.children).map((child: any) => {
        child?.trigger && child?.trigger();
        return child?.getError && child?.getError();
      });

      if (errors.filter((error) => Boolean(error))?.length < 1) {
        inputs?.forEach((input) => {
          formData.push({ name: input.name, value: input.value });
        });

        console.log(formData);
        window.location.replace((window.location.pathname, "/login"));
      }
    };

    const login = (e: MouseEvent) => {
      e.preventDefault();

      const form = document.querySelector("#createProfile");
      const inputs = form?.querySelectorAll("input");
      const formData: { name: string; value: string }[] = [];

      const errors = Object.values(this.children).map((child: any) => {
        child?.trigger && child?.trigger();
        return child?.getError && child?.getError();
      });

      if (errors.filter((error) => Boolean(error))?.length < 1) {
        inputs?.forEach((input) => {
          formData.push({ name: input.name, value: input.value });
        });

        console.log(formData);
        window.location.replace((window.location.pathname, "/login"));
      }
    };

    super({
      validateEmail,
      validateText,
      validateLogin,
      validatePhone,
      validatePassword,
      create,
      login,
    });
  }

  render(): string {
    // language=hbs
    return `
            <div class="singUp text-24">
                <h1 class="text-black mb-24">Регистрация</h1>
                <form class="w-full" id="createProfile">
                    {{{ Input label="Почта" name="email" type="text" validate=validateEmail
                              id="email" class="mb-20"}}}
                    {{{ Input label="Логин" required="true" name="login" type="text" id="login" class="mb-20"
                              validate=validateLogin}}}
                    {{{ Input label="Имя" required="true" name="first_name" type="text" id="name" class="mb-20"
                              validate=validateText}}}
                    {{{ Input label="Фамилия" required="true" name="second_name" type="text" id="surName" class="mb-20"
                              validate=validateText}}}
                    {{{ Input label="Телефон" name="phone" type="tel" id="phone" class="mb-20" validate=validatePhone}}}
                    {{{ Input label="Пароль" name="password" type="password" id="password" class="mb-20"
                              validate=validatePassword}}}
                    {{{ Input label="Пароль (повтор)" name="secondPassword" type="password" id="secondPassword"
                              className="mb-20" validate=validatePassword}}}


                    {{{ Button text="Зарегестрироваться" onClick=create className="w-full text-20 mb-12 text-black"}}}
                    {{{ Button text="Войти" onClick=login
                               className="partial--button singUp__login w-full text-20 mb-12 text-black"}}}
                </form>
            </div>
        `;
  }
}

export default CreateProfile;
