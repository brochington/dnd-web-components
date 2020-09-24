import { World } from "@brochington/ecstatic";
import DNDOverlord from "dom-elements/DNDOverlord";
import { Components } from "components";
import Systems from 'systems';

export function getOverlord(el: HTMLElement): DNDOverlord {
  const overlord = el.closest<DNDOverlord>("dnd-overlord");

  return overlord || new DNDOverlord();
}

export function getWorld(el: HTMLElement): World<Components> {
  return getOverlord(el).world;
}

export function getSystems(el: HTMLElement): Systems {
  return getOverlord(el).systems;
}

