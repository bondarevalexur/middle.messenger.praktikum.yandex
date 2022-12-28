import Block from "../../core/Block";

import "./singUp.scss";

class SingUp extends Block {
  render(): string {
    // language=hbs
    return `
            <div class="singUp pl-24 pr-24 text-24">
                <h1 class="text-black mb-24">Регистрация</h1>
                <form>
                    {{{ Input label="Почта" name="email" type="text" id="email" class="mb-20"}}}
                    {{{ Input label="Логин" name="login" type="text" id="login" class="mb-20"}}}
                    {{{ Input label="Имя" name="name" type="text" id="name" class="mb-20"}}}
                    {{{ Input label="Фамилия" name="surName" type="text" id="surName" class="mb-20"}}}
                    {{{ Input label="Телефон" name="phone" type="tel" id="phone" class="mb-20"}}}
                    {{{ Input label="Пароль" name="password" type="password" id="password" class="mb-20"}}}
                    {{{ Input label="Пароль (повтор)" name="secondPassword" type="password" id="secondPassword" class="mb-20"}}}


                    {{{ Button text="Зарегестрироваться" class="w-full text-20 mb-12 text-black"}}}
                    {{{ Button text="Войти" class="w-full text-20 mb-12 text-black"}}}
                </form>
            </div>
        `;
  }
}

export default SingUp;
