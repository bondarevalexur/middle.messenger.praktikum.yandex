import Block from "../../core/Block";

import "./profile.scss";
import Auth from "../../api/Auth";
import { userStore } from "../../api/userStore";

class Profile extends Block {
  static componentName = "Profile";
  constructor(props: Indexed) {
    console.log(props);
    super({
      ...props,
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
      sendAvatar: async () => {
        if (this.state.avatarFile?.name) {
          const formData = new FormData();
          formData.append("avatar", this.state.avatarFile, "avatar");
          await userStore.sendAvatar(formData);
        }
      },
      onChangeAvatar: () => {
        this.setState({
          avatarFile: this.refs?.avatar?.getState()?.files[0],
          avatarName: this.refs?.avatar?.getState()?.files[0]?.name,
        });
      },
    });
  }

  componentDidMount() {
    window.store.on("changed", () => {
      this.setState({
        avatar: window.store.getState().user.avatar,
        isAvatar: false,
        avatarFile: undefined,
        avatarName: "Выбрать файл ",
      });
    });
    let isAvatar = false;
    this.setState({
      onAvatar: () => {
        isAvatar = !isAvatar;
        this.setState({ isAvatar });
      },
      avatarName: "Выбрать файл ",
      ...window.store.getState().user,
    });
  }

  render() {
    // language=hbs
    return `
        <section class="profile p3">
            <h1 class="profile__header text-mid_orange text-40">Профиль</h1>
            <img alt="photo" src=https://ya-praktikum.tech/api/v2/resources{{avatar}}
                 class="profile__photo">

            {{{ Button onClick=onAvatar text="Сменить аватар"
                       className="partial--button singUp__login w-full text-20 mt-20 mb-12 text-black"}}}
            {{#if isAvatar}}
                <div class="flex mb-20">
                    {{{ Input label=avatarName className="hideInputFile" onChange=onChangeAvatar
                              name="avatar"
                              type="file"
                              ref="avatar"
                              id="avatar"}}}
                    {{{ Button onClick=sendAvatar
                               text="Отправить фото"}}}
                </div>
            {{/if}}


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
