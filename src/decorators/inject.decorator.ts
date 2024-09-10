import "reflect-metadata";

export function Inject(): ParameterDecorator {
  return function (target, key, index) {
    const type = Reflect.getMetadata(
      "design:paramtypes",
      target,
      key as string
    )?.[index];
    const injectTokens: Record<number, any> =
      Reflect.getMetadata("inject:tokens", target) || {};
    injectTokens[index] = type;
    Reflect.defineMetadata("inject:tokens", injectTokens, target);
  };
}
