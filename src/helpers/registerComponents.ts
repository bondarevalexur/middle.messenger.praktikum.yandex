import { registerComponent } from "../core";
import Button from "../pages/components/Button";
import Link from "../pages/components/Link";
import Input from "../pages/components/Input";
import ChatCard from "../pages/components/ChatCard";
import UserCard from "../pages/components/UserCard";
import DataValue from "../pages/components/DataValue";
import Message from "../pages/components/Message";
import TextArea from "../pages/components/TextArea";
import Chat from "../pages/Chat";
import Error404 from "../pages/Error404";
import Error500 from "../pages/Error500";
import Profile from "../pages/Profile";
import Chats from "../pages/Chats";
import CreateProfile from "../pages/CRProfile";
import Login from "../pages/Login";
import AsyncSearch from "../pages/components/AsyncSearch";

export const registerComponents = () => {
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
