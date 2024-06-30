import { Group, Select, Stack, Container, TextInput } from "@mantine/core";
import { ProgressReport, Unit } from "./progress";
import { prettyPercent } from "./helpers";
import { ProgressBar } from "./ProgressBar";
import { FileHeatmap } from "./FileHeatmap";

import "./css/app.css";
import { SourceFileInfo } from "./File";
import { useState } from "react";
import { FileMetric, metricData } from "./FileMetric";

export function OverallProgress() {
  const total = ProgressReport.matched_code_percent;
  const [unit, setUnit] = useState<Unit | undefined>(ProgressReport.units[0]);
  const [sortMetric, setSortMetric] = useState<FileMetric | null>(null);
  const [highlightMetric, setHighlightMetric] = useState<FileMetric | null>(
    FileMetric.FuzzyPercent
  );
  const [fileFilter, setFileFilter] = useState("");
  const [functionFilter, setFunctionFilter] = useState("");

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

  function getUnits(units: Unit[]): Unit[] {
    // Filter units by filename
    const fileFiltered = !fileFilter
      ? units
      : units.filter((u) =>
          u.name.toLowerCase().includes(fileFilter.toLowerCase())
        );

    // filter by function name
    const filtered = !functionFilter
      ? fileFiltered
      : fileFiltered.filter((u) =>
          u.functions
            .flatMap((fn) => fn)
            .some(
              (fn) =>
                fn.name.toLowerCase().includes(functionFilter.toLowerCase()) ||
                fn.demangled_name
                  ?.toLowerCase()
                  .includes(functionFilter.toLowerCase())
            )
        );

    // filter by the current selected metric sort if it is selected
    if (!sortMetric) return filtered;
    const { value } = metricData[sortMetric];
    return filtered.sort((a, b) => value(b) - value(a));
  }

  return (
    <Container id="main" size={"lg"}>
      <Stack gap={"md"}>
        <div>
          <h1>Battle for Bikini Bottom is {prettyPercent(total)} decompiled</h1>
          <ProgressBar />
        </div>
        <Group grow gap={"lg"} align={"flex-start"}>
          <Stack gap={"sm"}>
            <Group grow>
              <TextInput
                value={fileFilter}
                onChange={(event) => setFileFilter(event.currentTarget.value)}
                label="File Name Filter"
                placeholder="Filter by file name"
              />
              <TextInput
                value={functionFilter}
                onChange={(event) =>
                  setFunctionFilter(event.currentTarget.value)
                }
                label="Function Name Filter"
                placeholder="Filter by function name"
              />
            </Group>
            <Group grow>
              <Select
                label="File Sort Metric"
                data={Object.entries(metricData).map(([key, data]) => ({
                  label: data.description,
                  value: key,
                }))}
                value={sortMetric}
                onChange={(value) => setSortMetric(value as FileMetric)}
              />
              <Select
                label="Highlight Metric"
                data={Object.entries(metricData).map(([key, data]) => ({
                  label: data.description,
                  value: key,
                }))}
                value={highlightMetric}
                onChange={(value) => setHighlightMetric(value as FileMetric)}
              />
            </Group>
            <div>
              {allFolders.map((folder, index) => (
                <FileHeatmap
                  key={index}
                  folderName={folder.name}
                  filteredUnits={getUnits(folder.units)}
                  allUnits={folder.units}
                  onClick={onFileClick}
                  metric={
                    metricData[highlightMetric ?? FileMetric.FuzzyPercent]
                  }
                />
              ))}
            </div>
          </Stack>
          {unit && <SourceFileInfo unit={unit} />}
        </Group>
      </Stack>
    </Container>
  );
}
