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
  FunctionCount = "total-functions",
  Complete = "complete",
  TotalData = "total-data",
  MatchedDataPercent = "matched-data-percent",
}

// const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);
const max = (arr: number[]) => Math.max(...arr);

export const metricData: Record<FileMetric, FileMetricData> = {
  [FileMetric.FuzzyPercent]: {
    description: "Fuzzy Match %",
    value: (unit) => unit.fuzzy_match_percent,
    gradient: chroma.scale(["red", "lime"]),
  },
  [FileMetric.MatchedPercent]: {
    description: "Perfect Match %",
    value: (unit) =>
      unit.total_code ? (unit.matched_code / unit.total_code) * 100 : 100,
    gradient: chroma.scale(["red", "lime"]),
  },
  [FileMetric.MatchedCode]: {
    description: "Perfect Match Size",
    value: (unit) => unit.matched_code,
    percentage: (unit, units) =>
      (unit.matched_code / max(units.flatMap((x) => x.matched_code))) * 100,
    gradient: chroma.scale(["lightgray", "darkgreen"]),
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
    value: (unit) =>
      unit.total_functions
        ? Math.floor(unit.total_code / unit.total_functions)
        : 0,
    percentage: (unit, units) =>
      // yeah, this is kind of ugly, but we have to keep from dividing against 0
      unit.total_functions
        ? (unit.total_code /
            unit.total_functions /
            max(
              units.flatMap((x) =>
                x.total_functions ? x.total_code / x.total_functions : 0
              )
            )) *
          100
        : 0,

    gradient: chroma.scale(["yellow", "darkblue"]),
  },
  [FileMetric.FunctionCount]: {
    description: "Function Count",
    value: (unit) => unit.functions.length,
    percentage: (unit, units) =>
      (unit.functions.length / max(units.flatMap((x) => x.functions.length))) *
      100,
    gradient: chroma.scale(["pink", "black"]),
  },
  [FileMetric.TotalData]: {
    description: "Total Data",
    value: (unit) => unit.total_data,
    percentage: (unit, units) =>
      (unit.total_data / max(units.flatMap((x) => x.total_data))) * 100,
    gradient: chroma.scale(["lightgray", "maroon"]),
  },
  [FileMetric.MatchedDataPercent]: {
    description: "Matched Data %",
    value: (unit) =>
      unit.total_data ? (unit.matched_data / unit.total_data) * 100 : 100,
    gradient: chroma.scale(["lightgray", "maroon"]),
  },
  [FileMetric.Complete]: {
    description: "Completed",
    value: (unit) => (unit.complete ? 100 : 0),
    gradient: chroma.scale(["red", "lime"]),
  },
};
