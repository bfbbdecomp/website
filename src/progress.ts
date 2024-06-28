import progress from "../json/progress.json";

export const ProgressReport = progress;

export type Unit = (typeof ProgressReport.units)[number];

const fn = ProgressReport.units[0].functions;

export type GameFunction = (typeof fn)[number];
