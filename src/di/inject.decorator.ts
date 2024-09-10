import "reflect-metadata";

export function Inject(): ParameterDecorator {
  return function (target: any, key: string | symbol, index: number) {
    const injectTokens: { [P: number]: string } =
      Reflect.getMetadata("inject:tokens", target, key) || {};
    injectTokens[index] = target.constructor;
    Reflect.defineMetadata("inject:tokens", injectTokens, target, key);
  };
}
