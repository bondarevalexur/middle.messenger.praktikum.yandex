import Block from "./Block";
import { routes } from "../index";
import EventBus from "./EventBus";
import e from "express";

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = "";

  root.append(block.getContent()!);

  return root;
}

class Route {
  private block: Block | null = null;
  public shouldAuthorized: boolean;

  constructor(
    private pathname: string,
    private readonly blockClass: typeof Block,
    private readonly query: string,
    shouldAuthorized?: boolean
  ) {
    this.shouldAuthorized = shouldAuthorized ?? false;
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({});

      render(this.query, this.block);
      return;
    }
  }
}

export class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private history = window.history;

  public updateListeners: Array<() => void>;

  constructor(private readonly rootQuery: string) {
    this.updateListeners = [];

    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public onUpdate(listener: () => void) {
    this.updateListeners.push(listener);
  }

  public use({
    pathname,
    block,
    shouldAuthorized,
  }: {
    pathname: string;
    block: any;
    shouldAuthorized: boolean;
  }) {
    const route = new Route(pathname, block, this.rootQuery, shouldAuthorized);
    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    if (route.shouldAuthorized) {
      // console.log(window.store.getState());
      window.store.getState()?.user?.id && route.render();
    } else {
      route.render();
    }

    this.updateListeners.forEach((listener) => listener());
  }

  public go(pathname: string) {

    if (routes.find((route) => route.pathname === pathname.split("?")[0])) {
      this.history.pushState({}, "", pathname);
      this._onRoute(pathname);
    } else {
      this.history.pushState({}, "", "/error404");
      this._onRoute("/error404");
    }
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router("#app");
