import chroma from "chroma-js";
import { ReportUnit } from "./progress";

export type FileMetricData = {
  description: string;
  value: (unit: ReportUnit) => number;
  percentage?: (unit: ReportUnit, units: ReportUnit[]) => number;
  gradient: chroma.Scale;
};

export enum FileMetric {
  FuzzyPercent = "fuzzy",
  MatchedPercent = "matched-percent",
  MatchedCode = "matched",
  AvgFunctionSize = "avgFnSize",
  CodeSize = "size",
  FunctionCount = "total-functions",
  //Complete = "complete",
  TotalData = "total-data",
  MatchedDataPercent = "matched-data-percent",
}

// const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);
const max = (arr: number[]) => Math.max(...arr);

export const metricData: Record<FileMetric, FileMetricData> = {
  [FileMetric.FuzzyPercent]: {
    description: "Fuzzy Match %",
    value: (unit) => unit.measures.fuzzy_match_percent,
    gradient: chroma.scale(["red", "lime"]),
  },
  [FileMetric.MatchedPercent]: {
    description: "Perfect Match %",
    value: (unit) =>
      unit.measures.total_code
        ? (Number(unit.measures.matched_code) /
            Number(unit.measures.total_code)) *
          100
        : 100,
    gradient: chroma.scale(["red", "lime"]),
  },
  [FileMetric.MatchedCode]: {
    description: "Perfect Match Size",
    value: (unit) => Number(unit.measures.matched_code),
    percentage: (unit, units) =>
      (Number(unit.measures.matched_code) /
        max(units.flatMap((x) => Number(x.measures.matched_code)))) *
      100,
    gradient: chroma.scale(["lightgray", "darkgreen"]),
  },
  [FileMetric.CodeSize]: {
    description: "Code Size",
    value: (unit) => Number(unit.measures.total_code),
    percentage: (unit, units) =>
      (Number(unit.measures.total_code) /
        max(units.flatMap((x) => Number(x.measures.total_code)))) *
      100,
    gradient: chroma.scale(["pink", "darkblue"]),
  },
  [FileMetric.AvgFunctionSize]: {
    description: "Average Function Size",
    value: (unit) =>
      unit.measures.total_functions
        ? Math.floor(
            Number(unit.measures.total_code) / unit.measures.total_functions
          )
        : 0,
    percentage: (unit, units) =>
      // yeah, this is kind of ugly, but we have to keep from dividing against 0
      unit.measures.total_functions
        ? (Number(unit.measures.total_code) /
            unit.measures.total_functions /
            max(
              units.flatMap((x) =>
                x.measures.total_functions
                  ? Number(x.measures.total_code) / x.measures.total_functions
                  : 0
              )
            )) *
          100
        : 0,

    gradient: chroma.scale(["yellow", "darkblue"]),
  },
  [FileMetric.FunctionCount]: {
    description: "Function Count",
    value: (unit) => unit.functions?.length ?? 0,
    percentage: (unit, units) =>
      (unit.functions?.length ??
        0 / max(units.flatMap((x) => x.functions?.length ?? 1))) * 100,
    gradient: chroma.scale(["pink", "black"]),
  },
  [FileMetric.TotalData]: {
    description: "Total Data",
    value: (unit) => Number(unit.measures.total_data),
    percentage: (unit, units) =>
      (Number(unit.measures.total_data) /
        max(units.flatMap((x) => Number(x.measures.total_data)))) *
      100,
    gradient: chroma.scale(["lightgray", "maroon"]),
  },
  [FileMetric.MatchedDataPercent]: {
    description: "Matched Data %",
    value: (unit) =>
      unit.measures.total_data
        ? (Number(unit.measures.matched_data) /
            Number(unit.measures.total_data)) *
          100
        : 100,
    gradient: chroma.scale(["lightgray", "maroon"]),
  },
  /*
  [FileMetric.Complete]: {
    description: "Completed",
    value: (unit) => (unit.complete ? 100 : 0),
    gradient: chroma.scale(["red", "lime"]),
  },
  */
};
