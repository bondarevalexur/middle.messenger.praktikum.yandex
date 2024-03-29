declare global {
  export type Nullable<T> = T | null | undefined;
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };

  export interface Window {
    store: any;
    router: any;
    socketChat: any;
  }

  export type AppState = {
    appIsInited: boolean;
    isLoading: boolean;
    loginFormError: string | null;
    user: User | null;
    isLogin: boolean;
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };
}

export {};
