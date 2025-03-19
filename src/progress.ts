import progress from "../json/progress.json";

export const ProgressReport = progress as unknown as Report;

export type Report = {
  total_code: number;
  total_data: number;
  total_functions: number;
  matched_code: number;
  matched_data: number;
  matched_functions: number;
  fuzzy_match_percent: number;
  matched_code_percent: number;
  matched_data_percent: number;
  matched_functions_percent: number;
  units: Unit[];
};

export type ReportItem = {
  name: string;
  demangled_name?: string;
  address?: string;
  size: number;
  fuzzy_match_percent: number;
  opcodes?: string[];
  labels?: number;
};

export type Unit = {
  name: string;
  fuzzy_match_percent: number;
  total_code: number;
  matched_code: number;
  total_data: number;
  matched_data: number;
  total_functions: number;
  matched_functions: number;
  complete?: boolean;
  module_name?: string;
  module_id?: number;
  sections: ReportItem[];
  functions: ReportItem[];
};
