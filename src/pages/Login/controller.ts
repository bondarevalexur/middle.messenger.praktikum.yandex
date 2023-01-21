import Auth, { SigninData } from "../../api/Auth";

async function controller(data: Indexed) {
  const resp = await Auth.signin(
    data as SigninData
    //   {
    //   login: "JB007",
    //   password: "password007",
    // }
  );

  if (resp.status === 200 || resp.status === 400) {
    const response = await Auth.read();
    const data = await JSON.parse(response.response);
    window.store.dispatch({ user: data });
    window.router.go("/profile");
  }
}

export default controller;
