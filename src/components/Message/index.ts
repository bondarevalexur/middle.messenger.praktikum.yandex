import Block from "../../core/Block";

import "./style.scss";
import convertDate from "../../helpers/convertDate";

class Message extends Block {
  constructor(props: any) {
    const isMyMess = window.store.getState()?.user?.id === props.this.user_id;
    super({ ...props.this, isMyMess, time: convertDate(props.this?.time) });
  }

  render() {
    // language=hbs
    return `

            <div class="partial--message 
            {{#if isMyMess }} partial--message_left {{else}} partial--message_right{{/if}}">
                <span class="message-text">{{content}}</span>
                <span class="message-time">{{time}}</span>
            </div>

    `;
  }
}

export default Message;
