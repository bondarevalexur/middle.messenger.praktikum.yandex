import { requests } from "../core/HTTPservise";
import { userStore } from "./userStore";
import parse from "../helpers/parse";

class chatApi {
  public socket: WebSocket | undefined;
  public updateListeners: void[];

  constructor() {
    this.updateListeners = [];
  }

  async updateConnection() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const chatId = urlSearchParams.get("id");

    if (chatId) {
      await requests
        .post(`/chats/token/${chatId}`)
        .then((res) => {
          return JSON.parse(res.response);
        })
        .then((res) => {
          return new WebSocket(
            `wss://ya-praktikum.tech/ws/chats/${userStore.current()?.id}/${chatId}/${res.token}`
          );
        })
        .then((socket) => {
          socket.addEventListener("qa", (e) => {});
          this.socket = socket;
          this.addListeners();
        })
        .catch(() => {
          console.log("SocketError");
        });
    }
  }

  onUpdate(listener: void) {
    this.updateListeners.push(listener);
  }

  async addListeners() {
    this.socket?.addEventListener("open", async () => {
      console.log("Соединение установлено");
    });

    this.socket?.addEventListener("close", (event: any) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket?.addEventListener("message", async (event: any) => {
      // console.log("Получены данные", event.data);
      console.log("Получены данные");
      const data = await parse(event.data);
      if (Array.isArray(data)) {
        // this.updateListeners.forEach((listener: any) => listener(data));
        await window.store.dispatch({ messages: data.reverse() });
      } else {
        await window.store.dispatch({
          messages: [...window.store.getState().messages, data],
        });
      }
      // await window.store.dispatch({ messages: data });
    });

    this.socket?.addEventListener("error", (event: any) => {
      console.log("Ошибка", event.message);
    });
  }

  send(message: string, callback: () => void) {
    this.waitForConnection(() => {
      this.socket?.send(message);
      if (typeof callback !== "undefined") {
        callback();
      }
    }, 1000);
  }

  waitForConnection(callback: () => void, interval: number) {
    if (this.socket?.readyState === 1) {
      callback();
    } else {
      let that = this;
      setTimeout(function () {
        that.waitForConnection(callback, interval);
      }, interval);
    }
  }

  async getOld() {
    await this.updateConnection();
    this.send(
      JSON.stringify({
        content: "0",
        type: "get old",
      }),
      () => {
        console.log("callback");
      }
    );
  }

  sendMessage(text: string) {
    this.send(
      JSON.stringify({
        content: text,
        type: "message",
      }),
      () => {}
    );
  }
}

export default chatApi;
