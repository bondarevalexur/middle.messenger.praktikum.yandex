import Block from "../../core/Block";

import { data } from "../../data/data";

class Chats extends Block {
  constructor() {
    super({
      data,
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
            </div>

        `;
  }
}

export default Chats;
