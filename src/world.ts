import { World } from "@brochington/ecstatic";
import { Components } from "./components";
import Systems from "./systems";

export const world = new World<Components>();
export const systems = new Systems(world);