import Block from "../../core/Block";

import "./style.scss";

import { data } from "../../data/data";
import { validateLogin } from "../../helpers/validate";
import controller from "./controller";

class Login extends Block {
  constructor() {
    window.store.on("changed", () => {
      this.setState(window.store.getState());
      this.render();
    });
    const login = async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const inputs = [...document.getElementsByTagName("input")];
      const formData: Indexed = {};

      const errors = Object.values(this.children).map((child: any) => {
        child?.trigger && child?.trigger();
        return child?.getError && child?.getError();
      });

      if (errors.filter((error) => Boolean(error))?.length < 1) {
        inputs?.forEach((input) => {
          formData[input.name] = input.value;
        });

        await controller(formData);
      }
    };

    super({
      data,
      login: login,
      validateLogin,
    });
  }

  render() {
    // language=hbs
    return `
        <div class="singIn text-24">
            <h1 class="text-black mb-24">ВХОД</h1>
            <form method="post">
                {{{ Input label="Логин" validate=validateLogin required="true" name="login"
                          placeholder="12"
                          type="text" id="login"
                          className="mb-20"}}}
                {{{ Input label="Пароль"  required="true" name="password" placeholder="333"
                          type="text"
                          id="password"
                          className="mb-20"}}}

                {{{ Button text="Вход" onClick=login className="w-full text-20 mb-12 text-black"}}}
                {{{ Link text="Нет аккаунта" href="/create-profile"
                         className="w-full text-16 mb-40"}}}
            </form>
        </div>
    `;
  }
}

export default Login;
