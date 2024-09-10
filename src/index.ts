import { DependencyContainer } from "./di";
import { BootstrapService } from "./services";

const bootstrap = DependencyContainer.resolve(BootstrapService);
bootstrap.start();
