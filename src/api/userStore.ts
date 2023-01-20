import { requests } from "../core/HTTPservise";
import parse from "../helpers/parse";

export const userStore = {
  current: () => window.store.getState()?.user,
  get: async (data: Indexed) => {
    const res = await requests.get("/auth/user", data);
    if (res.status === 200) {
      try {
        const data = await JSON.parse(res.response);
        window.store.dispatch({ user: data });
      } catch (e) {}
    }
  },
  updateUserData: async () => {
    const res = await requests.get("/auth/user");
    if (res.status === 200) {
      try {
        const data = await JSON.parse(res.response);
        window.store.dispatch({ user: data });
        window.store.eventBus().emit("changed");
      } catch (e) {}
    }
  },
  create: async (data: Indexed) => {
    await requests
      .post("/auth/signup", data)
      .then((res) => {
        if (res.status === 200) {
          alert("аккаунт создан успешно");
          window.router.go("/login");
        }
        if (res.status === 409) {
          alert("Пользователь с таким логином уже существует");
        }
      })
      .catch(() => {
        alert("произошла ошибка, попробуйте снова");
      });
  },
  update: async (data: Indexed) => {
    const res = await requests.put("/user/profile", data);
    if (res.status === 200) {
      alert("данные обновлены");
    }
  },

  sendAvatar: async (data: Indexed) => {
    const res = await requests.put("/user/profile/avatar", data, {});
    if (res.status === 200) {
      alert("Аватар обновлен");
      await userStore.updateUserData();
    }
  },

  findUsers: async (data: Indexed) => {
    const res = await requests.post("/user/search", data);

    if (res.status === 200) {
      const users = await parse(res.response);
      window.store.dispatch({ findUsers: users });
    }
  },
};
