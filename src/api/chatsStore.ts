import { requests } from "../core/HTTPservise";
import parseResp from "../helpers/parse";
import parse from "../helpers/parse";

export interface ICreateChat {
  title: string;
}

export const chatsStore = {
  currentChats: () => window.store.getState()?.chats,
  getChats: async () => {
    const res = await requests.get("/chats");

    if (res.status === 200) {
      const data = await parseResp(res.response);
      window.store.dispatch({ chats: data });
    }
  },
  createChat: async (data: ICreateChat) => {
    const res = await requests.post("/chats", data);

    if (res.status === 200) {
      alert("чат создан успешно");
      chatsStore.getChats();
    }
  },
  deleteChat: async (chatId: number) => {
    const res = await requests.delete("/user/profile", { chatId });
    if (res.status === 200) {
      alert("Чат удален");
    }
  },
  getArchiveChats: async (data: Indexed) => {
    const res = await requests.get(
      `/chats/archive?offset=${data?.offset}&limit=${data?.limit}&title=${data?.title}`
    );
    if (res.status === 200) {
      const data = parseResp(res.response);
    }
  },
  archiveChat: async (chatId: number) => {
    const res = await requests.post("/chats/archive", { chatId });
    if (res.status === 200) {
      console.log("archiveChat");
    }
  },
  unarchiveChat: async (chatId: number) => {
    const res = await requests.post("/chats/unarchive", { chatId });
    if (res.status === 200) {
      console.log("unarchiveChat");
    }
  },
  setChatAvatar: async (data: Indexed) => {
    const res = await requests.put("/chats/avatar", data);
    if (res.status === 200) {
      console.log("setChatAvatar");
    }
  },
  addUser: async (data: Indexed) => {
    const res = await requests.put("/chats/users", data);
    if (res.status === 200) {
      window.store.dispatch({
        users: window.store.getState().findUsers.find((user: Indexed) => user.id !== data.users[0]),
      });
    }
  },
  deleteUser: async (data: Indexed) => {
    const res = await requests.delete("/chats/users", data);
    if (res.status === 200) {
      window.store.dispatch({
        users: window.store.getState().users.filter((user: Indexed) => user.id !== data.users[0]),
      });
    }
  },
  getChatUsers: async (chatId: number | string) => {
    const res = await requests.get(`/chats/${chatId}/users`);
    if (res.status === 200) {
      const data = await parse(res.response);
      window.store.dispatch({ users: data });
    }
  },
};
