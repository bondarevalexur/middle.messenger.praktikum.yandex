import Block from "../../core/Block";

import "./style.scss";

interface TextAreaProps {
  onChange?: (e: InputEvent | Indexed) => void;
  validate?: (input: InputEvent | Indexed) => void;
  placeholder?: string;
  value?: string | Block | Indexed;
  error?: string;
  name?: string;
  label?: string;
  className?: string;
  ref?: string;
  required?: boolean;
}

class TextArea extends Block {
  static componentName = "TextArea";
  constructor({
    onChange = () => {},
    name,
    label,
    placeholder,
    className,
    ref,
    required = false,
    validate = () => {},
  }: TextAreaProps) {
    const onChangeName = (e?: InputEvent) => {
      e?.preventDefault();
      if (e) {
        if (e.data) {
          if (this.state.value) {
            this.setState({
              value: this.state.value + e.data,
            });
          } else {
            this.setState({
              value: e.data,
            });
          }
        } else if (e?.inputType === "deleteContentBackward") {
          if (this.state.value) {
            this.setState({
              value: this.state.value.slice(0, -1),
            });
          } else {
            this.setState({
              value: null,
            });
          }
        }
      }

      onChange(this);
      validate(this);

      if (required && !e && !Boolean(this.state.value)) {
        this.setState({ error: "Ошибка: не может быть пустым" });
      } else {
        this.state.error && this.setState({ error: null });
      }

      const newInput = this.getContent()?.querySelector("textarea");

      newInput?.focus();
      newInput?.setSelectionRange(newInput?.value?.length, newInput?.value?.length);
    };

    super({
      placeholder,
      name,
      label,
      className,
      events: { input: onChangeName },
      ref,
      validate,
      required,
    });
  }

  trigger() {
    this.props?.events?.input();
  }

  render() {
    // language=hbs
    return `<p class="partial--textArea"><span class="partial--textArea__error p4">{{this.error}}</span>
            <textarea
                    placeholder="{{placeholder}}"
                    required="{{required}}"
                    class="partial--textArea__field {{className}}"
                    label="{{label}}"
                    name="{{name}}"
            >{{this.value}}</textarea>
        </p>
        `;
  }
}

export default TextArea;
