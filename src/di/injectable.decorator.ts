import { DependencyContainer } from "./dependency.container";

export function Injectable(): ClassDecorator {
  return function (target: any) {
    DependencyContainer.register(target);
  };
}
