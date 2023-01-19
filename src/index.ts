import "./app.scss";
import { registerComponents } from "./helpers/registerComponents";
import { defaultState, Store } from "./core/Store";

import Router from "./core/Router";
import { getScreenComponent, Screens } from "./helpers";
import Auth from "./api/Auth";
import chatApi from "./api/Chat";

registerComponents();

declare global {
  interface Window {
    store: any;
    router: any;
    socketChat: any;
  }
}

export const routes = [
  {
    pathname: "/login",
    block: getScreenComponent(Screens.Login),
    shouldAuthorized: false,
  },
  {
    pathname: "/profile",
    block: getScreenComponent(Screens.Profile),
    shouldAuthorized: true,
  },
  {
    pathname: "/create-profile",
    block: getScreenComponent(Screens.CreateProfile),
    shouldAuthorized: false,
  },
  {
    pathname: "/chats",
    block: getScreenComponent(Screens.Chats),
    shouldAuthorized: true,
  },
  {
    pathname: "/chat",
    block: getScreenComponent(Screens.Chat),
    shouldAuthorized: false,
  },
  {
    pathname: "/error404",
    block: getScreenComponent(Screens.Error404),
    shouldAuthorized: false,
  },
  {
    pathname: "/error500",
    block: getScreenComponent(Screens.Error500),
    shouldAuthorized: false,
  },
  {
    pathname: "/change-password",
    block: getScreenComponent(Screens.ChangePassword),
    shouldAuthorized: true,
  },
];

async function initApp() {
  const response = await Auth.read();

  if (response.status === 401) {
    // Router.go("/login");
  } else {
    const data = await JSON.parse(response.response);
    await window.store.dispatch({ user: data });

    window.router.go(
      window.location.pathname !== "/"
        ? window.location.pathname + window.location.search
        : "/profile"
    );
  }
  window.socketChat = await new chatApi();
}

document.addEventListener("DOMContentLoaded", async () => {
  const store = new Store<AppState>(defaultState);

  Router.use(routes[0])
    .use(routes[1])
    .use(routes[2])
    .use(routes[3])
    .use(routes[4])
    .use(routes[5])
    .use(routes[6])
    .use(routes[7]);

  window.router = Router;
  window.store = store;

  /**
   * Инициализируем роутер
   */
  Router.start();
  await initApp();
});
