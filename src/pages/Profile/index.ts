import Block from "../../core/Block";

import "./profile.scss";
import Auth from "../../api/Auth";

class Profile extends Block {
  constructor() {
    // window.store.on("changed", () => {
    //   this.setState(window.store.getState().user);
    //   this.render();
    // });

    super({
      ...window.store.getState().user,
      onEdit: () => {
        window.router.go("/create-profile");
      },
      onLogout: async () => {
        await Auth.logout();
        window.router.go("/login");
      },
      onChats: () => {
        window.router.go("/chats");
      },
    });
  }

  render() {
    // language=hbs
    return `
        <section class="profile p3">
            <h1 class="profile__header text-mid_orange text-40">Профиль</h1>
            <img alt="photo" src="../../assets/img/logo.png" class="profile__photo">

            {{{ DataValue label="Имя" value=first_name class="w-full mb-20"}}}
            {{{ DataValue label="Фамилия" value=second_name class="w-full mb-20"}}}
            {{{ DataValue label="Почта" value=email class="w-full mb-20"}}}
            {{{ DataValue label="Логин" value=login class="w-full mb-20"}}}
            {{{ DataValue label="Телефон" value=phone class="w-full mb-80"}}}

            {{{ Link onClick=onEdit text="Редактировать"
                     class="profile__link  mb-16"}}}
            {{{ Link  onClick=onLogout text="Выйти" class="profile__link text-mid_orange  mb-40"}}}
            {{{ Link  onClick=onChats text="Чаты" class="profile__link text-mid_orange  mb-40"}}}
        </section>
    `;
  }
}

export default Profile;
