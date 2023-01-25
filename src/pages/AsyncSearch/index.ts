import Block from "../../core/Block";

import "./input.scss";

class AsyncSearch extends Block {
  static componentName = "AsyncSearch";
  constructor(props: Indexed) {
    super({ ...props });
  }

  protected render(): string {
    // language=hbs
    return `
        <section class="search-wrapper">
            {{{ Input onChange=onchange label="" ref="input" name="search" type="text" id="search"
                      res="search"
                      class="mb-20"}}}

            {{#each result }}
                {{{UserCard props=this isHideActions=true}}}
            {{/each}}

        </section>
    `;
  }
}

export default AsyncSearch;
