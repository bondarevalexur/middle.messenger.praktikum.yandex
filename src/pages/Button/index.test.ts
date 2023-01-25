import sinon from "sinon";
import Button from "./index";
import { expect } from "chai";

describe("Button", () => {
  it("should render", () => {
    new Button({});
  });

  it("element should return button", () => {
    const button = new Button({});
    const element = button.element;
    expect(element).to.be.instanceof(window.HTMLButtonElement);
  });

  it("check event click", () => {
    const onClick = sinon.spy();
    const button = new Button({ onClick });

    const element = button.element as HTMLButtonElement;
    element.click();
    expect(onClick.calledOnce).to.eq(true);
  });
});
