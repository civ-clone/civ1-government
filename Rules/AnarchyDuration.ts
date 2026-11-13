// Moved to base-government-change (civ-clone/web-renderer#1008): this path re-exports the same class, which
//  civ1-wonder's Pyramids register rules of and `revolution()` asks.
export type { RevolutionCause } from '@civ-clone/base-government-change/Rules/AnarchyDuration';
export {
  AnarchyDuration,
  default,
} from '@civ-clone/base-government-change/Rules/AnarchyDuration';
