import { PieChart, PieChartCell } from "@mantine/charts";
import { Unit } from "./progress";
import { Anchor, Group, Stack, Text } from "@mantine/core";
import { prettyPercent } from "./helpers";

type Info = {
  name: string;
  total: number;
  current: number;
};

export function SourceFileInfo({ unit }: { unit: Unit }) {
  const perfectMatch = (unit.matched_code / unit.total_code) * 100;
  const fuzzyMatch = unit.fuzzy_match_percent - perfectMatch;
  const remaining = 100 - unit.fuzzy_match_percent;

  const infos: Info[] = [
    {
      name: "Code",
      current: unit.matched_code,
      total: unit.total_code,
    },
    {
      name: "Functions",
      current: unit.matched_functions,
      total: unit.total_functions,
    },
    {
      name: "Data",
      current: unit.matched_data,
      total: unit.total_data,
    },
  ];

  const pieData: PieChartCell[] = [
    {
      color: "green",
      name: "Perfect Match",
      value: perfectMatch,
    },
    {
      color: "yellowgreen",
      name: "Partially Matching",
      value: fuzzyMatch,
    },
    {
      color: "red",
      name: "Unmatched Code",
      value: remaining,
    },
  ];

  return (
    <div>
      <Anchor
        href={
          // https://github.com/bfbbdecomp/bfbb/blob/main/src/SB/Game/zActionLine.cpp
          "https://github.com/bfbbdecomp/bfbb/blob/main/src/" +
          unit.name.replace("main/", "") +
          ".cpp"
        }
        target="_blank"
      >
        <h2>{unit.name}</h2>
      </Anchor>
      <div style={{ marginBottom: "2rem" }}>
        <Group grow gap={"xl"}>
          {infos.map((info, id) => (
            <div key={id} style={{ textAlign: "center" }}>
              <Text size="xl" fw={700}>
                {info.name}
              </Text>
              <Text size="xl" fw={700}>
                {info.total
                  ? prettyPercent((info.current / info.total) * 100)
                  : "100%"}
              </Text>
              <Text>
                {info.current} / {info.total}
              </Text>
            </div>
          ))}
        </Group>
      </div>
      <Stack align="center">
        <Text size="xl">Code Breakdown</Text>
        <PieChart
          size={400}
          withLabelsLine
          withTooltip
          // tooltipDataSource="segment"
          labelsPosition="inside"
          labelsType="percent"
          withLabels
          data={pieData}
        />
      </Stack>
    </div>
  );
}
