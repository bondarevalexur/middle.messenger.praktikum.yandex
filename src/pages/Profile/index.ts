import Block from "../../core/Block";

import "./profile.scss";

const mockData = {
  name: "Иван",
  surname: "Иванов",
  email: "Почта@example.ru",
  login: "termonator3000",
  phone: "8 800 555 35 35",
};

class Profile extends Block {
  constructor() {
    super(mockData);
  }

  render() {
    // language=hbs
    return `
            <section class="profile p3">
                <h1 class="profile__header text-mid_orange text-40">Профиль</h1>
                <img alt="photo" src="../../assets/img/logo.png" class="profile__photo">

                {{{ DataValue label="Имя" value=name class="w-full mb-20"}}}
                {{{ DataValue label="Фамилия" value=surname class="w-full mb-20"}}}
                {{{ DataValue label="Почта" value=email class="w-full mb-20"}}}
                {{{ DataValue label="Логин" value=login class="w-full mb-20"}}}
                {{{ DataValue label="Телефон" value=phone class="w-full mb-80"}}}

                {{{ Link  href="/createProfile" text="Редактировать" class="profile__link  mb-16"}}}
                {{{ Link  href="/login" text="Выйти" class="profile__link text-mid_orange  mb-40"}}}
            </section>
        `;
  }
}

export default Profile;
