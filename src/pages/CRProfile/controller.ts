import { userStore } from "../../api/userStore";
import { Block } from "../../core";
import Input from "../Input";

function controller(getComponent: () => Block) {
  const onButton = async (e: MouseEvent) => {
    e.preventDefault();

    const data: Indexed = {};
    const errors = Object.values(getComponent().getChildren()).map((child: Block) => {
      if (child instanceof Input) {
        child?.trigger();
        return child?.getError();
      }
    });

    if (errors.filter((error) => Boolean(error))?.length < 1) {
      Object.entries(getComponent().getRefs())?.forEach(([key, input]: any) => {
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
