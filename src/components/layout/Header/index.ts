import Block from "../../../core/Block";

import "./style.scss";

class Header extends Block {
  constructor() {
    super({
      isAuth: false,

      logOut: (e: MouseEvent) => {
        console.log("loguot");
        window.location.replace((window.location.pathname, "/login"));
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
            <header class="header">
                {{#unless isAuth}}
                    <a href="/createProfile" class="header__link">Создать</a>
                    <a href="/login" class="header__link">На Связь</a>
                {{/unless}}

                {{#if isAuth}}
                    <a href="/chats" class="header__link">Чаты</a>
                    {{{Link text="Выйти" className="header__link" onClick=logOut}}}
                {{/if}}


                <img alt="logo" src="../../../assets/img/logo.png" class="header__logo logo"/>
            </header>`;
  }
}

export default Header;
