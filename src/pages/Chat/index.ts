import Block from "../../core/Block";

import "./chat.scss";

import { data } from "../../data/data";

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

    window.store.on("changed", () => {
      const newStore: any = window.store.getState();
      const prevStore: any = window.store.getPrevState();

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
      data,
      onSend,
      onUsers,
      onSearch,
      addUser,
    });
  }

  async componentDidMount() {
    await chatsStore.getChats();
    this.setState({ chats: chatsStore.currentChats() });

    await window.socketChat.getOld();
  }

  render() {
    // language=hbs
    return `
        <div class="chat-page w-full">
            {{{ Link text="Профиль" href="/profile"
                     className="w-full text-16 ml-20 mb-40 profile-link"}}}
            {{{ Link text="Чаты" href="/chats"
                     className="w-full text-16 ml-100 mb-40 profile-link"}}}
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
