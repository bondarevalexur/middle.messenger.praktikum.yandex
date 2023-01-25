import Block from "../../core/Block";

import "./error404.scss";

class Error404 extends Block {
  static componentName = "Error404";
  render() {
    // language=hbs
    return `
            <div class="error-404">
                <h1 class="text-52 text-mid_orange">404</h1>
                <h3 class="text-32 text-light_orange"> Hе туда попали</h3>
            </div>
        `;
  }
}

export default Error404;
