import Block from "../../core/Block";

import "./input.scss";

interface InputProps {
  onChange?: (e: InputEvent | any) => void;
  validate?: (input: InputEvent | any) => void;
  type?: "text" | "password" | "email";
  placeholder?: string;
  value?: string | any;
  error?: string;
  name?: string;
  label?: string;
  className?: string;
  ref?: string;
  required?: boolean;
}

class Input extends Block {
  constructor({
    onChange = () => {},
    type = "text",
    name,
    label,
    placeholder,
    className,
    ref,
    required = false,
    validate = () => {},
  }: InputProps) {
    const onChangeName = (e: InputEvent) => {
      e?.preventDefault();
      const input = this.getContent()?.querySelector("input");

      this.setState({
        value: input?.value,
      });

      onChange(this);
      validate(this);

      if (required) {
        if (!Boolean(this.state.value)) {
          this.setState({ error: "Ошибка: не может быть пустым" });
        } else {
          this.setState({ error: null });
        }
      }

      const newInput = this.getContent()?.querySelector("input");
      newInput?.focus();
      newInput?.setSelectionRange(
        newInput?.value.length,
        newInput?.value.length
      );
    };

    super({
      type,
      placeholder,
      name,
      label,
      className,
      events: { input: onChangeName },
      ref,
      required,
    });
  }

  getError() {
    console.log(this.state.error);
    return this.state.error;
  }

  trigger() {
    this.props?.events?.input();
  }

  protected render(): string {
    console.log();
    // language=hbs
    return `
            <p class="partial--wrapper {{className}}">
                <label class="partial--label-input" for="{{name}}">{{label}}</label>
                <input class="partial--input" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}"
                       required="{{required}}"
                       id="{{name}}" value="{{this.value}}">
                <span class="input__error p4">{{this.error}}</span>
            </p>
        `;
  }
}

export default Input;
