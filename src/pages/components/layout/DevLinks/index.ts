import Block from "../../../../core/Block";

import "./style.scss";

interface DevPartialsProps {}

class DevLinks extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    // language=hbs
    return `
            <header class="devPartialHeader">
                <ul>
                    <li class="devPartialHeader__links">{{{ Link text="Login" href="/login"}}}</li>
                    <li class="devPartialHeader__links">{{{ Link text="CreateProfile" href="/createProfile"}}}</li>
                    <li class="devPartialHeader__links">{{{ Link text="Error500" href="/error500"}}}</li>
                    <li class="devPartialHeader__links">{{{ Link text="Error404" href="/error404"}}}</li>
                    <li class="devPartialHeader__links">{{{ Link text="Profile" href="/profile"}}}</li>
                    <li class="devPartialHeader__links">{{{ Link text="Chats" href="/chats"}}}
                    <li class="devPartialHeader__links">{{{ Link text="Chat" href="/chat"}}}</li>
                </ul>
            </header>`;
  }
}

export default DevLinks;
