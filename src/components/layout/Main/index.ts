import Block from "../../../core/Block";

import "./style.scss";

class Main extends Block {
  constructor(props: any) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="screen screen_theme_full">
                <div class="screen__header">
                    {{{DevLinks}}}
                    {{{Header}}}
                </div>
                <div class="screen__content" data-layout=1>
                </div>
            </div>
        `;
  }
}

export default Main;
