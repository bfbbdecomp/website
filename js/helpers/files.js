import { FILES } from "../../data/files";
import { getFunctionsInBounds } from "./functions";

export function getFilesStateAtCommit(id) {
  const state = [];

  for (const file of FILES) {
    const data = {
      path: file.path,
      totalFunctions: 0,
      totalLines: 0,
      linesDone: 0,
      functionsDone: 0,
    };

    const start = parseInt(file.start, 16);
    const end = parseInt(file.end, 16);
    const funcs = getFunctionsInBounds(start, end);

    for (const func of funcs) {
      data.totalFunctions++;
      data.totalLines += func.lines;
      if (func.commit != null && func.commit <= id) {
        data.linesDone += func.lines;
        data.functionsDone++;
      }
    }
    state.push(data);
  }

  return state;
}
