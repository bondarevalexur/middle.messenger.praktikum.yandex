import { registerComponent } from "../core";
import Main from "../components/layout/Main";
import Header from "../components/layout/Header";
import DevLinks from "../components/layout/DevLinks";
import Button from "../components/Button";
import Link from "../components/Link";
import Input from "../components/Input";
import ChatCard from "../components/ChatCard";
import UserCard from "../components/UserCard";
import DataValue from "../components/DataValue";
import Message from "../components/Message";
import TextArea from "../components/TextArea";
import Chat from "../pages/Chat";
import Error404 from "../pages/Error404";
import Error500 from "../pages/Error500";
import Profile from "../pages/Profile";
import Chats from "../pages/Chats";
import CreateProfile from "../pages/CRProfile";
import Login from "../pages/Login";
import AsyncSearch from "../components/AsyncSearch";

export const registerComponents = () => {
  registerComponent(Main);
  registerComponent(Header);
  registerComponent(DevLinks);

  registerComponent(Button);
  registerComponent(Link);
  registerComponent(Input);
  registerComponent(ChatCard);
  registerComponent(AsyncSearch);
  registerComponent(UserCard);
  registerComponent(DataValue);
  registerComponent(Message);
  registerComponent(TextArea);

  registerComponent(Chat);
  registerComponent(Error404);
  registerComponent(Error500);
  registerComponent(Profile);
  registerComponent(Chats);
  registerComponent(CreateProfile);
  registerComponent(Login);
};
