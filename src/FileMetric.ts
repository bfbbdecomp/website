import chroma from "chroma-js";
import { Unit } from "./progress";

export type FileMetricData = {
  description: string;
  value: (unit: Unit) => number;
  percentage?: (unit: Unit, units: Unit[]) => number;
  gradient: chroma.Scale;
};

export enum FileMetric {
  FuzzyPercent = "fuzzy",
  MatchedPercent = "matched-percent",
  MatchedCode = "matched",
  AvgFunctionSize = "avgFnSize",
  CodeSize = "size",
}

// const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);
const max = (arr: number[]) => Math.max(...arr);

export const metricData: Record<FileMetric, FileMetricData> = {
  [FileMetric.FuzzyPercent]: {
    description: "Close Match %",
    value: (unit) => unit.fuzzy_match_percent,
    gradient: chroma.scale(["red", "green"]),
  },
  [FileMetric.MatchedPercent]: {
    description: "Perfect Match %",
    value: (unit) => (unit.matched_code / unit.total_code) * 100,
    gradient: chroma.scale(["red", "green"]),
  },
  [FileMetric.MatchedCode]: {
    description: "Perfect Match Size",
    value: (unit) => unit.matched_code,
    percentage: (unit, units) =>
      (unit.matched_code / max(units.flatMap((x) => x.matched_code))) * 100,
    gradient: chroma.scale(["pink", "darkblue"]),
  },
  [FileMetric.CodeSize]: {
    description: "Code Size",
    value: (unit) => unit.total_code,
    percentage: (unit, units) =>
      (unit.total_code / max(units.flatMap((x) => x.total_code))) * 100,
    gradient: chroma.scale(["pink", "darkblue"]),
  },
  [FileMetric.AvgFunctionSize]: {
    description: "Average Function Size",
    value: (unit) => Math.floor(unit.total_code / unit.total_functions),
    percentage: (unit, units) =>
      (unit.total_code /
        unit.total_functions /
        max(units.flatMap((x) => x.total_code / x.total_functions))) *
      100,
    gradient: chroma.scale(["pink", "darkblue"]),
  },
};
