import Block from "../../core/Block";

import "./style.scss";
import { chatsStore } from "../../api/chatsStore";

class UserCard extends Block {
  static componentName = "UserCard";
  urlSearchParams = new URLSearchParams(window.location.search);
  chatId = this.urlSearchParams.get("id");

  constructor({ props, isHideActions }: Indexed) {
    super({
      ...props,
      isHideActions,
      onAvatar: () => {},
      addUser: () => {
        chatsStore.addUser({
          users: [this.props.id],
          chatId: this.chatId,
        });
      },
      deleteUser: () => {
        chatsStore.deleteUser({ chatId: this.chatId, users: [this.props.id] });
      },
      avatar: props?.avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${props?.avatar}`
        : "https://avatars.mds.yandex.net/i?id=b6f75588a8210c09136fcd3b7aff4e7b3ad07c06-4462005-images-thumbs&n=13",
    });
  }

  componentDidMount() {
    let isActionOpen = false;
    this.setState({
      onButton: () => {
        isActionOpen = !isActionOpen;
        this.setState({ isActionOpen });
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <section class="user--listItem mb-8">
            <img alt="avatar" class="user--listItem__photo" src="{{avatar}}"/>

            <h1 class="user--listItem__name text-20 text-sea">{{first_name}} {{second_name}}</h1>
            {{#unless isHideActions}}
                {{{ Button onClick=onButton className="option-button" text="---"}}}
            {{/unless}}
            {{#if isHideActions}}
                {{{ Button onClick=addUser text="+"}}}
            {{/if}}

            <p class="user--listItem__message text-gray">{{last_message.content}}</p>



            {{#if activeMessage}}
                <p class="user--listItem__active text-12">{{activeMessage}}</p>
            {{/if}}

            {{#if isActionOpen}}
                <div class="user__actions">
                    {{{ Button onClick=deleteUser className="send-message__button" text="Удалить"}}}
                </div>
            {{/if}}
        </section>`;
  }
}

export default UserCard;
