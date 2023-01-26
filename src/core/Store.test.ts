import Store from "./Store";
import { expect } from "chai";
import sinon from 'sinon';

describe("core/Store", () => {
  const store = Store;
  it("should set state", () => {
    store.dispatch({ isLogin: true });
    expect(store.getState().isLogin).to.eq(true);
  });

  it("should emit event after store was update", () => {
    const callBack = sinon.fake();

    store.on("changed", callBack);
    store.set({ isLogin: true });

    expect(callBack.callCount).to.eq(1);
  });
});
