import Block from "./Block";
import { expect } from "chai";

describe("core/Block", () => {
  type TestProps = { mockProp?: number; id?: string };

  class TestBlock extends Block<TestProps> {
    render(): string {
      return "<div>{{id}}</div>";
    }
  }

  const block = new TestBlock({ mockProp: 10, id: "TestBlock" });

  it("get content", () => {
    expect(block.element?.innerHTML).to.eq("TestBlock");
  });

  it("setting new state", () => {
    block.setState({ mockProp: 11 });
    expect(block.getState().mockProp).to.eq(11);
  });

  it("update content", () => {
    block.setProps({ id: "NewBlock" });
    expect(block.element?.innerHTML).to.eq("NewBlock");
  });
});
