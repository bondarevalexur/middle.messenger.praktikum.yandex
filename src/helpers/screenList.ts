import Chat from "../pages/Chat";
import Chats from "../pages/Chats";

import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Error404 from "../pages/Error404";
import Error500 from "../pages/Error500";

import { Block } from "../core";
import CRProfile from "../pages/CRProfile";
import ChangePassword from "../pages/ChangePassword";

export enum Screens {
  Chat = "/chat",
  Chats = "/chats",
  CreateProfile = "/create-profile",
  Profile = "/profile",
  Login = "/login",
  Error404 = "/error404",
  Error500 = "/error500",
  ChangePassword = "/change-password",
}

const map: Record<Screens, any> = {
  [Screens.Chat]: Chat,
  [Screens.Chats]: Chats,
  [Screens.CreateProfile]: CRProfile,
  [Screens.Profile]: Profile,
  [Screens.Login]: Login,
  [Screens.Error404]: Error404,
  [Screens.Error500]: Error500,
  [Screens.ChangePassword]: ChangePassword,
};

export const getScreenComponent = (screen: Screens): Block<any> => {
  return map[screen];
};
