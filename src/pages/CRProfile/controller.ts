import { userStore } from "../../api/userStore";

function controller(getComponent: any) {
  const onButton = async (e: MouseEvent) => {
    e.preventDefault();

    const data: Indexed = {};
    const errors = Object.values(getComponent().children).map((child: any) => {
      child?.trigger && child?.trigger();
      return child?.getError && child?.getError();
    });

    if (errors.filter((error) => Boolean(error))?.length < 1) {
      Object.entries(getComponent().refs)?.forEach(([key, input]: any) => {
        if (key !== "secondPassword") {
          data[key] = input.state.value;
        }
      });

      if (window.store.getState()?.user?.id) {
        await userStore.update(data);
      } else {
        await userStore.create(data);
      }
    }
  };

  return onButton;
}

export default controller;
