import { Constructable, DependencyContainer } from "../di";

export function Injectable(): ClassDecorator {
  return function (target) {
    DependencyContainer.register(target as unknown as Constructable);
    Reflect.defineMetadata("injectable", true, target);
  };
}
