import {
  Text,
  Group,
  Select,
  Stack,
  Container,
  ComboboxItem,
} from "@mantine/core";
import { ProgressReport, Unit } from "./progress";
import { prettyPercent } from "./helpers";
import { ProgressBar } from "./ProgressBar";
import { FileHeatmap } from "./FileHeatmap";

import "./css/app.css";
import { SourceFileInfo } from "./File";
import { useState } from "react";

enum FileSortType {
  FuzzyPercent = "fuzzy",
  MatchedCode = "matched",
  AvgFunctionSize = "avgFnSize",
  CodeSize = "size",
}

const sortSelections: Record<FileSortType, ComboboxItem> = {
  [FileSortType.FuzzyPercent]: {
    label: "Partial + Matching Code",
    value: FileSortType.FuzzyPercent,
  },
  [FileSortType.MatchedCode]: {
    label: "Matching Code",
    value: FileSortType.MatchedCode,
  },
  [FileSortType.CodeSize]: {
    label: "Total Code Size",
    value: FileSortType.CodeSize,
  },
  [FileSortType.AvgFunctionSize]: {
    label: "Average Function Size",
    value: FileSortType.AvgFunctionSize,
  },
};

export function OverallProgress() {
  const total = ProgressReport.matched_code_percent;
  const [unit, setUnit] = useState<Unit | undefined>(ProgressReport.units[0]);
  const [sortType, setSortType] = useState<FileSortType | null>(null);

  const gcUnits = ProgressReport.units.filter((x) =>
    x.name.toLowerCase().includes("/gc/")
  );
  const xUnits = ProgressReport.units.filter((x) =>
    x.name.toLowerCase().includes("/x/")
  );
  const gameUnits = ProgressReport.units.filter((x) =>
    x.name.toLowerCase().includes("/game/")
  );

  const allFolders = [
    {
      name: "GameCube Specific Code",
      units: gcUnits,
    },
    {
      name: "Core Game Engine",
      units: xUnits,
    },
    {
      name: "BFBB Game Code",
      units: gameUnits,
    },
  ];

  const onFileClick = (name: string) => {
    const unit = ProgressReport.units.find((x) => x.name === name);
    setUnit(unit);
  };

  function sortUnits(units: Unit[]): Unit[] {
    if (!sortType) return units;

    const sorts: Record<FileSortType, (a: Unit, b: Unit) => number> = {
      [FileSortType.CodeSize]: (a, b) => b.total_code - a.total_code,
      [FileSortType.FuzzyPercent]: (a, b) =>
        b.fuzzy_match_percent - a.fuzzy_match_percent,
      [FileSortType.MatchedCode]: (a, b) => b.matched_code - a.matched_code,
      [FileSortType.AvgFunctionSize]: (a, b) => {
        return (
          b.total_code / b.total_functions - a.total_code / a.total_functions
        );
      },
    };

    const sortFn = sorts[sortType];

    return units.sort((a, b) => sortFn(a, b));
  }

  return (
    <Container id="main" size={"lg"}>
      <Stack gap={"md"}>
        <div>
          <h1>Battle for Bikini Bottom is {prettyPercent(total)} decompiled</h1>
          <ProgressBar />
        </div>
        <Group grow gap={"lg"}>
          <Stack gap={"sm"}>
            <div>
              <Text>File Sorting Method</Text>
              <Select
                data={Object.values(sortSelections)}
                value={sortType}
                onChange={(value) => setSortType(value as FileSortType)}
              ></Select>
            </div>
            {allFolders.map((folder, index) => (
              <FileHeatmap
                key={index}
                folderName={folder.name}
                units={sortUnits(folder.units)}
                onClick={onFileClick}
              />
            ))}
          </Stack>
          {unit && <SourceFileInfo unit={unit} />}
        </Group>
      </Stack>
    </Container>
  );
}
