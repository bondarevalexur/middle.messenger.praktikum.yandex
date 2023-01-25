import EventBus from "./EventBus";

export const defaultState: AppState = {
  appIsInited: false,
  isLoading: false,
  loginFormError: null,
  user: null,
  isLogin: false,
};
export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: any
) => void;

export type Action<State> = (dispatch: Dispatch<State>, state: State, payload: any) => void;

export class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;
  private prevState: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.prevState = defaultState;
    this.set(defaultState);

    return this;
  }

  public getState() {
    return this.state;
  }

  public getPrevState() {
    return this.prevState;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit("changed", prevState, nextState);
  }

  public dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    // console.log(nextStateOrAction);
    this.prevState = this.state;
    // console.log(nextStateOrAction, payload);
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}

export default new Store<AppState>(defaultState);
