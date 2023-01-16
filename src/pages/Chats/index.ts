import Block from "../../core/Block";

import router from "../../core/Router";
import { requests } from "../../core/HTTPservise";
import parseResp from "../../helpers/parse";

import { chatsStore } from "../../api/chatsStore";

class Chats extends Block {
  constructor(props: any) {
    function onclickGo() {
      router.go("/chat");
    }

    super({ ...props });
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
                {{{ Link text="Профиль" href="/profile"
                         className="w-full text-16 ml-20 mb-40 profile-link"}}}
                {{{ Button text="Создать чат" onClick=onButton ref="button"}}}
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
