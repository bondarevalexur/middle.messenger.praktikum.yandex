import Block from "../../core/Block";

import "./link.scss";

interface LinkProps {
  text: string | Block | Indexed;
  href: string;
  id?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

class Link extends Block {
  static componentName = "Link";

  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // props?.href && window.location.replace((window.location.pathname, props.href));
      props?.href && window.router.go(props?.href);
      props?.onClick && props?.onClick(e);
    };

    super({ ...props, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `<a href="{{href}}" id="{{id}}" class="partial--link {{className}}">{{text}}</a>
    `;
  }
}

export default Link;
