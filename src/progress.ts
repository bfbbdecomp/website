import progress from "../json/progress.json";

export const ProgressReport = progress as unknown as Report;

// Project progress report
export type Report = {
  units: ReportUnit[]; // Units within this report
  version: number; // Report version
  categories: ReportCategory[]; // Progress categories

  // BFBB custom recalculations after report unit filtering
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
};

// Progress info for a report or unit
export type Measures = {
  fuzzy_match_percent: number; // Overall match percent, including partially matched functions and data
  total_code?: string; // Total size of code in bytes
  matched_code?: string; // Fully matched code size in bytes
  matched_code_percent: number; // Fully matched code percent
  total_data: string; // Total size of data in bytes
  matched_data?: string; // Fully matched data size in bytes
  matched_data_percent: number; // Fully matched data percent
  total_functions: number; // Total number of functions
  matched_functions: number; // Fully matched functions
  matched_functions_percent: number; // Fully matched functions percent
  complete_code: string; // Completed (or "linked") code size in bytes
  complete_code_percent: number; // Completed (or "linked") code percent
  complete_data: string; // Completed (or "linked") data size in bytes
  complete_data_percent: number; // Completed (or "linked") data percent
  total_units: number; // Total number of units
  complete_units: number; // Completed (or "linked") units
};

// Progress category
export type ReportCategory = {
  id: string; // The ID of the category
  name: string; // The name of the category
  measures: Measures; // Progress info for this category
};

// A unit of the report (usually a translation unit)
export type ReportUnit = {
  name: string; // The name of the unit
  measures: Measures; // Progress info for this unit
  sections?: ReportItem[]; // Sections within this unit
  functions?: ReportItem[]; // Functions within this unit
  metadata?: ReportUnitMetadata; // Extra metadata for this unit
};

// Extra metadata for a unit
export type ReportUnitMetadata = {
  complete?: boolean; // Whether this unit is marked as complete (or "linked")
  module_name?: string; // The name of the module this unit belongs to
  module_id?: number; // The ID of the module this unit belongs to
  source_path?: string; // The path to the source file of this unit
  progress_categories: string[]; // Progress categories for this unit
  auto_generated?: boolean; // Whether this unit is automatically generated (not user-provided)
};

// A section or function within a unit
export type ReportItem = {
  name: string; // The name of the item
  size: string; // The size of the item in bytes
  fuzzy_match_percent: number; // The overall match percent for this item
  metadata?: ReportItemMetadata; // Extra metadata for this item

  // Some extra metadata we're going to add for BFBB related decomp website
  opcodes?: string[];
  labels?: number;
};

// Extra metadata for an item
export type ReportItemMetadata = {
  demangled_name?: string; // The demangled name of the function
  virtual_address?: string; // The virtual address of the function or section
};
