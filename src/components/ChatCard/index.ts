import Block from "../../core/Block";

import "./style.scss";

class ChatCard extends Block {
  constructor({ props }: any) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `
            <section class="partial--listItem">
                <img alt="avatar" class="partial--listItem__photo" src="{{avatar}}"/>

                <h1 class="partial--listItem__name text-20 text-sea">{{name}}</h1>

                <p class="partial--listItem__data text-gray text-12">{{lastMessage.data}}</p>
                <p class="partial--listItem__message text-gray">{{lastMessage.text}}</p>

                {{#if activeMessage}}
                    <p class="partial--listItem__active text-12">{{activeMessage}}</p>
                {{/if}}
            </section>`;
  }
}

export default ChatCard;
