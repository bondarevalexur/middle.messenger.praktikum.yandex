import Block from "../../core/Block";

import "./error500.scss";

class Error500 extends Block {
  render() {
    // language=hbs
    return `
            <div class="error-500">
                <h1 class="text-52 text-mid_orange">500</h1>
                <h3 class="text-32 text-light_orange">Скоро поправим</h3>
            </div>
        `;
  }
}

export default Error500;
