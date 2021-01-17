import { COMMITS } from "../../data/commits";

export function getCommitFromID(id) {
  return COMMITS[id];
}
