export async function logIn() {
  await window.localStorage.setItem("keyLog", "123");
}

export async function logOut() {
  await window.localStorage.removeItem("keyLog");
}

export function getIsLog() {
  return Boolean(window.localStorage.getItem("keyLog"));
}
