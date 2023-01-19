import Block from "../../core/Block";

import router from "../../core/Router";
import { requests } from "../../core/HTTPservise";
import parseResp from "../../helpers/parse";

import { chatsStore } from "../../api/chatsStore";

class Chats extends Block {
  constructor(props: Indexed) {
    super({
      ...props,
      isChat: window.location.pathname !== "/chats",
      onProfile: () => {
        window.router.go("/profile");
      },
      onChats: () => {
        window.router.go("/chats");
      },
    });
  }

  isNewChat = false;

  async componentDidMount() {
    this.setState({
      isNewChat: this.isNewChat,
      onChat: async () => {
        await chatsStore.createChat({ title: this.refs.title.state.value });
      },
      onButton: () => {
        this.isNewChat = !this.isNewChat;
        this.setState({ isNewChat: this.isNewChat });
      },
    });

    const res = await requests.get("/chats");
    if (res.status === 200) {
      const data = await parseResp(res.response);
      this.setState({ chats: data, num: 123 });
    }
  }

  render() {
    // language=hbs
    return `

        <section class="chat-list">
            <div class="flex mb-8">
                {{{ Button text="Профиль" onClick=onProfile}}}
                {{#if isChat}}
                    {{{ Button text="Чаты" onClick=onChats}}}
                {{/if}}
                {{{ Button text="Создать чат" onClick=onButton ref="button"}}}
            </div>
            {{#if isNewChat }}
                <div>
                    {{{ Input label="Название" required="true" name="title" type="title"
                              id="title" ref="title"}}}
                    {{{ Button text="Чат" onClick=onChat }}}
                </div>
            {{/if}}
            {{#each chats}}
                {{{ChatCard props=this}}}
            {{/each}}
        </section>
    `;
  }
}

export default Chats;
