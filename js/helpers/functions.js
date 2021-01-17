import { FUNCTIONS } from "../../data/functions";
import { API } from "../../data/api";

const sum = (array) => array.reduce((a, b) => a + b, 0);

const formatPercent = (float) => {
  return Math.round(float * 100) / 100;
};

export function getDecompiledStateAtCommit(id) {
  const funcs = Object.keys(FUNCTIONS).filter((addr) => {
    const commit = FUNCTIONS[addr].commit;
    return commit != null && commit <= id;
  });
  const linesDone = sum(funcs.map((addr) => FUNCTIONS[addr].lines));
  const state = {
    funcs: API.functions,
    funcsDone: funcs.length,
    linesDone: formatPercent((linesDone / API.lines) * 100),
  };
  return state;
}

export function getDecompCommits() {
  const commits = new Set();
  for (const key in FUNCTIONS) {
    const commit = FUNCTIONS[key].commit;
    if (commit != null) {
      commits.add(commit);
    }
  }
  const result = [...commits];
  result.sort((a, b) => a - b);
  return result;
}
