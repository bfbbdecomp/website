import { COMMITS } from "../../data/commits";

export function getCommitFromID(id) {
  return COMMITS[id];
}

export function getCommitIDByHash(hash) {
  let i = 0;
  for (i = 0; i < COMMITS.length; i++) {
    if (COMMITS[i].hash == hash) {
      return i;
    }
  }
  return -1;
}
