import Auth, { SignupData } from "../../api/Auth";

async function controller(data: Indexed[]) {
  const formData: Indexed = {};
  data.forEach((item) => {
    if (item.name !== "secondPassword") {
      formData[item.name] = item.value;
    }
  });

  const resp: any = await Auth.signup(formData as SignupData);

  if (resp.status === 200) {
    alert("Профиль создан");
    // Auth.read().then(() => {
    //   window.router.go("/profile");
    // });
  } else {
    alert("Произошла ошибка");
  }
}

export default controller;
