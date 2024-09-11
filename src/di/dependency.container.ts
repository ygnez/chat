import "reflect-metadata";

export type Constructable<T = any> = { new (...args: any[]): T };
export type Token<T = any> = Constructable<T>;

class Container {
  private readonly deps: Map<Token, any> = new Map<Token, any>();

  get<T = any>(token: Token<T>) {
    const dep: Constructable<T> | undefined = this.deps.get(token);

    if (!dep) {
      const instance = this.resolve<T>(token);
      this.deps.set(token, instance);
    }

    const instance = this.deps.get(token);
    if (instance) {
      return instance;
    }

    return this.resolve(token);
  }

  resolve<T = any>(token: Token<T>): T {
    const constructorParamTypes = Reflect.getMetadata(
      "design:paramtypes",
      token
    );
    const injectTokens: Token[] = Reflect.getMetadata("inject:tokens", token);

    const constructorParamInstances: any[] = [];
    for (const i in constructorParamTypes) {
      const injectToken: Token = constructorParamTypes[i];

      if (!injectToken) {
        throw `Cannot resolve dependency of ${token} at index ${i}`;
      }

      if (injectTokens[i] && injectToken === injectTokens[i]) {
        constructorParamInstances.push(this.get(injectToken));
      }
    }

    return new token(...constructorParamInstances);
  }

  register<T = any>(token: Token, instance?: T) {
    this.deps.set(token, instance);
  }
}

export const DependencyContainer = new Container();
