import { FUNCTIONS } from "../../data/functions";

const sum = (array) => array.reduce((a, b) => a + b, 0);

const formatPercent = (float) => {
  return Math.round(float * 100) / 100;
};

export function getFunctionsInBounds(start, end) {
  return Object.keys(FUNCTIONS)
    .filter((address) => {
      const int = parseInt(address, 16);
      return int >= start && int < end;
    })
    .map((addr) => FUNCTIONS[addr]);
}

export function getStateAtCommit(id) {
  const allFunctions = Object.keys(FUNCTIONS);
  const doneFunctions = allFunctions.filter((addr) => {
    const commit = FUNCTIONS[addr].commit;
    return commit != null && commit <= id;
  });

  const funcPercent = formatPercent(
    (doneFunctions.length / allFunctions.length) * 100
  );
  const linesDone = sum(doneFunctions.map((addr) => FUNCTIONS[addr].lines));
  const linesTotal = sum(allFunctions.map((addr) => FUNCTIONS[addr].lines));
  const state = {
    funcs: allFunctions.length,
    funcsDone: doneFunctions.length,
    funcsPercent: funcPercent,
    lines: linesTotal,
    linesDone,
    linesPercent: formatPercent((linesDone / linesTotal) * 100),
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
