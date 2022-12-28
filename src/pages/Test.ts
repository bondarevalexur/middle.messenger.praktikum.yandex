import Block from "../core/Block";

import Error404 from "./Error404";

import { routsNames } from "../routs";

class Test extends Block {
  render(): string {
    const location = window.location;

    let Page = "Error404";

    if (Object.keys(routsNames).includes(location.pathname)) {
      Page = routsNames[location.pathname];
    }

    // language=hbs
    return `
            {{#Main}}
                {{{${Page}}}}
            {{/Main}}
            `;
  }
}

export default Test;
