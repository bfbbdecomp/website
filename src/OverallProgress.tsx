import { Text, Group, Select, Stack, Container } from "@mantine/core";
import { ProgressReport, Unit } from "./progress";
import { prettyPercent } from "./helpers";
import { ProgressBar } from "./ProgressBar";
import { FileHeatmap } from "./FileHeatmap";

import "./css/app.css";
import { SourceFileInfo } from "./File";
import { useState } from "react";

type FileMetricData = {
  description: string;
  accessor: (unit: Unit) => number;
};

enum FileMetric {
  FuzzyPercent = "fuzzy",
  MatchedCode = "matched",
  AvgFunctionSize = "avgFnSize",
  CodeSize = "size",
}

const metricData: Record<FileMetric, FileMetricData> = {
  [FileMetric.FuzzyPercent]: {
    description: "Matching + Partially Matching Code",
    accessor: (unit) => unit.fuzzy_match_percent,
  },
  [FileMetric.MatchedCode]: {
    description: "Matched Code",
    accessor: (unit) => unit.matched_code,
  },
  [FileMetric.CodeSize]: {
    description: "Total Code",
    accessor: (unit) => unit.total_code,
  },
  [FileMetric.AvgFunctionSize]: {
    description: "Average Function Size",
    accessor: (unit) => unit.total_code / unit.total_functions,
  },
};

export function OverallProgress() {
  const total = ProgressReport.matched_code_percent;
  const [unit, setUnit] = useState<Unit | undefined>(ProgressReport.units[0]);
  const [sortType, setSortType] = useState<FileMetric | null>(null);

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
    const { accessor } = metricData[sortType];
    return units.sort((a, b) => accessor(b) - accessor(a));
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
                data={Object.entries(metricData).map(([key, data]) => ({
                  label: data.description,
                  value: key,
                }))}
                value={sortType}
                onChange={(value) => setSortType(value as FileMetric)}
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
