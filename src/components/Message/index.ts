import Block from "../../core/Block";

import "./style.scss";

interface MessageProps {
  text: string;
  index: string;
}

class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    // language=hbs
    return `
            <div class="partial--message {{#if
                    (compare (remainder index 2) "==" 0) }} partial--message_left {{else}} partial--message_right{{/if}}">
                {{text}}
                {{index}}
            </div>
        `;
  }
}

export default Message;
