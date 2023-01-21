import Block from "../../../core/Block";

import "./style.scss";
import convertDate from "../../../helpers/convertDate";
import { chatsStore } from "../../../api/chatsStore";

class ChatCard extends Block {
  constructor({ props }: Indexed) {
    super({
      ...props,
      messTime: convertDate(props?.last_message?.time),
      events: {
        click: (e: Event) => {
          const elem = e.target as HTMLElement;
          const parentId = elem?.parentElement?.id;
          if (parentId !== "actions") {
            window.router.go(`/chat`);
            window.router.go(`/chat?id=${props.id}`);
          }
        },
      },
      onAvatar: () => {},
      avatar: props?.avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${props?.avatar}`
        : "https://avatars.mds.yandex.net/i?id=b6f75588a8210c09136fcd3b7aff4e7b3ad07c06-4462005-images-thumbs&n=13",
      onDelete: async () => {
        await chatsStore.deleteChat(props.id);
      },
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
        <section class="partial--listItem mb-8">
            <img alt="avatar" class="partial--listItem__photo" src="{{avatar}}"/>

            <h1 class="partial--listItem__name text-20 text-sea">{{title}}</h1>
            {{{ Button onClick=onButton className="option-button" text="---"}}}
            <p class="partial--listItem__data text-gray text-12">{{messTime}}</p>
            <p class="partial--listItem__message text-gray">{{last_message.content}}</p>



            {{#if activeMessage}}
                <p class="partial--listItem__active text-12">{{activeMessage}}</p>
            {{/if}}

            {{#if isActionOpen}}
                <div class="partial__actions" id="actions">
                    {{{ Button onClick=onDelete className="send-message__button" text="Удалить"}}}
                </div>
            {{/if}}
        </section>`;
  }
}

export default ChatCard;
