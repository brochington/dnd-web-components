import { World } from "@brochington/ecstatic";
import { Components } from "components";
import Systems from "systems";
import { world, systems } from "../world";
import DNDContext from "dom-elements/DNDContext";

export function getDNDContext(el: HTMLElement): DNDContext | null {
  return el.closest<DNDContext>("dnd-context");
}

export function getWorld(el: HTMLElement): World<Components> {
  const context = getDNDContext(el);

  return context !== null ? context.world : world;
}

export function getSystems(el: HTMLElement): Systems {
  const context = getDNDContext(el);

  return context !== null ? context.systems : systems;
}

export function getContext(
  el: HTMLElement
): {
  world: World<Components>;
  systems: Systems;
} {
  const context = getDNDContext(el);

  return {
    world: context !== null ? context.world : world,
    systems: context !== null ? context.systems : systems,
  };
}
