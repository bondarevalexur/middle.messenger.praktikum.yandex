import Block from "../../../core/Block";

import "./button.scss";

interface ButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
}

class Button extends Block {
  constructor({ text, onClick, className }: ButtonProps) {
    super({ text, className, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
            <button id="{{id}}" class="partial--button {{className}}">{{text}}</button>`;
  }
}

export default Button;
