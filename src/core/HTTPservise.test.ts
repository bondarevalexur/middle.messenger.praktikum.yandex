import HTTPTransport from "./HTTPservise";
import { expect } from "chai";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
const window = dom.window;
describe("core/HTTPTransport", () => {
  const requests = new HTTPTransport("https://ya-praktikum.tech/api/v2");

  it("should return cookie error", async () => {
    await requests.get("/auth/user").then(({ response }) => {
      const error = JSON.parse(response).reason;
      expect(error).to.eq("Cookie is not valid");
    });
  });

  it("should return login error", async () => {
    await requests
      .post("/auth/signin", {
        login: "doremi123",
        password: "nonono",
      })
      .then(({ response }) => {
        const error = JSON.parse(response).reason;
        expect(error).to.eq("Login or password is incorrect");
      });
  });

  it("should login", async () => {
    await requests
      .post("/auth/signin", {
        login: "jbond",
        password: "12345678q",
      })
      .then(({ status, response }) => {
        expect(status).to.eq(200);
        expect(response).to.eq("OK");
      });
  });
  it("should return user info", async () => {
    await requests
      .post("/auth/signin", {
        login: "jbond",
        password: "12345678q",
      })
      .then(() => {});
    await requests
      .get("/auth/user")
      .then(({ response }) => JSON.parse(response).login)
      .then((userLogin) => {
        expect(userLogin).to.eq("jbond");
      });
  });
});
