import Block from "../../core/Block";

import "./style.scss";
import convertDate from "../../helpers/convertDate";

class ChatCard extends Block {
  constructor({ props }: any) {
    super({
      ...props,
      messTime: convertDate(props?.last_message?.time),
      events: {
        click: () => {
          window.router.go(`/chat`);
          window.location.search = `?id=${props.id}`;
        },
      },
      onAvatar: () => {},
      avatar:
        props?.avatar ??
        "https://avatars.mds.yandex.net/i?id=b6f75588a8210c09136fcd3b7aff4e7b3ad07c06-4462005-images-thumbs&n=13",
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
                <div class="partial__actions">
                    {{{ Button onClick=onSend className="send-message__button" text="Удалить"}}}
                    {{{ Button onClick=onSend className="send-message__button"
                               text="Архивировать"}}}
                </div>
            {{/if}}
        </section>`;
  }
}

export default ChatCard;
