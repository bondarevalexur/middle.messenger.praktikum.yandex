import Block from "../../core/Block";

import "./chat.scss";

import { chatsStore } from "../../api/chatsStore";

import { userStore } from "../../api/userStore";

import isEqual from "../../helpers/isEqueal";

class Chat extends Block {
  public isAddUser = false;
  public isUser = false;

  urlSearchParams = new URLSearchParams(window.location.search);
  chatId = this.urlSearchParams.get("id");

  constructor() {
    const onSend = () => {
      window.socketChat.sendMessage(this.refs["textArea"].state.value);
    };

    const onUsers = async () => {
      this.chatId && !this.isUser && (await chatsStore.getChatUsers(this.chatId));
      this.isUser = !this.isUser;
      this.setState({ isUser: this.isUser });
    };

    const addUser = async () => {
      this.isAddUser = !this.isAddUser;
      this.setState({ isAddUser: this.isAddUser });
    };

    const onSearch = async (input: any) => {
      const textValue = input.getValue();
      userStore.findUsers({ login: textValue });

      this.refs.async_search.setState({ result: window.store.getState()?.findUsers });
      this.refs.async_search.refs.input.setState({ value: textValue });

      this.refs.async_search.refs.input._element?.querySelector("input")?.focus();
      this.refs.async_search.refs.input._element
        ?.querySelector("input")
        ?.setSelectionRange(textValue.length, textValue.length);
    };

    super({
      onSend,
      onUsers,
      onSearch,
      addUser,
    });
  }

  async componentDidMount() {
    window.router.onUpdate(async () => {
      await window.socketChat.updateConnection().then(() => {
        window.socketChat.getOld();
      });
    });

    window.store.on("changed", () => {
      const newStore = window.store.getState();
      const prevStore = window.store.getPrevState();

      console.log(window.store.getState());

      if (
        !isEqual(
          {
            messages: newStore.messages,
            users: newStore.users,
          },
          { messages: prevStore.messages, users: prevStore.users }
        )
      ) {
        this.setState({
          mess: window.store.getState()?.messages,
          users: window.store.getState()?.users,
        });
      }
    });

    await chatsStore.getChats();
    this.setState({ chats: chatsStore.currentChats(), mess: window.store.getState()?.messages });
  }

  render() {
    // language=hbs
    return `
        <div class="chat-page w-full">
            {{{Chats}}}
            <section class="chat">
                {{#each mess}}
                    {{{ Message this=this id="id"}}}
                {{/each}}

                <div class="chat__send-message send-message">
                    {{{ TextArea name="message" required=true class="send-message__input"
                                 ref="textArea"}}}
                    {{{ Button onClick=onSend class="send-message__button" text=">>"}}}
                </div>
            </section>
            {{{ Button onClick=onUsers className="users-button" text="Участники"}}}
            {{#if isUser}}

                {{{ Button onClick=addUser className="add-users-button"
                           text="Добавить пользователя"}}}
                {{#if isAddUser}}
                    {{{AsyncSearch onchange=onSearch resultCard="UserCard" ref="async_search"
                                   storeName="findUsers"}}}

                {{/if}}
                <section class="users">
                    {{#each users}}
                        {{{UserCard props=this}}}
                    {{/each}}
                </section>
            {{/if}}
        </div>
    `;
  }
}

export default Chat;
