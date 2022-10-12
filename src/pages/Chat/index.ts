import Block from "../../core/Block";

import "./chat.scss";

import { data } from "../../data/data";

class Chat extends Block {
  constructor() {
    const onSend = () => {
      console.log(this.refs["textArea"].trigger());
      console.log(this.refs["textArea"].state.value);
    };
    super({
      data,
      onSend,
    });
  }

  render() {
    // language=hbs
    return `
            <div class="chat-page w-full">
                <section class="chat-list">
                    {{#each data.chats}}
                        <a href="/chat" class="mb-8 block">{{{ChatCard props=this}}}</a>
                    {{/each}}
                </section>
                <section class="chat">
                    {{#each chat.messages}}
                        {{{ Message this id="id" index=@index}}}
                    {{/each}}

                    <div class="chat__send-message send-message">
                        {{{ TextArea name="message" required=true class="send-message__input" ref="textArea"}}}
                        {{{ Button onClick=onSend class="send-message__button" text=">>"}}}
                    </div>
                </section>
            </div>

        `;
  }
}

export default Chat;
