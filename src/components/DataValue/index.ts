import Block from "../../core/Block";

import "./style.scss";

interface DataValueProps {
  labelClass: string[];
  valueClass: string[];
  className: string[];
  value: string;
  label: string;
  id: string;
}

class DataValue extends Block {
  constructor(props: DataValueProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `<p class="partial--dataValue {{className}}" id="{{id}}">
            <span class="{{labelClass}}">{{label}}</span>
            <span class="{{valueClass}}">{{value}}</span>
        </p>`;
  }
}

export default DataValue;
