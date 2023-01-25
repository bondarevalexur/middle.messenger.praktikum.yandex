import { expect } from "chai";
import Router from "./Router";

describe("core/Router", () => {
  const router = Router;

  it("is start", () => {
    expect(window.location.pathname).to.eq("/");
  });

  it("correctly call go", () => {
    router.go("/chat");
    expect(window.location.pathname).to.eq("/chat");
  });

  it("set routes to window history", () => {
    expect(window.history.length).to.eq(2);
  });

  it("not call callback if url is wrong", () => {
    router.go("/err");
    expect(window.location.pathname).to.eq("/error404");
  });
});
