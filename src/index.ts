import { renderDOM } from "./core";

import Test from "./pages/Test";

import "./app.scss";
import { registerComponents } from "./helpers/registerComponents";

registerComponents();

document.addEventListener("DOMContentLoaded", () => {
  const App = new Test();

  renderDOM(App);
});
