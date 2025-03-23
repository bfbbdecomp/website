import { ReportUnit } from "./progress";
import { Anchor, Group, Stack, Text } from "@mantine/core";
import { ProgressBar, ProgressBarProps } from "./ProgressBar";
import { FunctionList, GithubLink } from "./FunctionList";
import { GameFunctions } from "./Functions";

type SourceFileInfoProps = {
  unit: ReportUnit;
};

export function SourceFileInfo({ unit }: SourceFileInfoProps) {
  const num = (thing: string | undefined) =>
    thing ? Number(thing) : undefined;
  const matched_code = num(unit.measures.matched_code);
  const total_code = num(unit.measures.total_code);
  const matched_data = num(unit.measures.matched_data);
  const total_data = num(unit.measures.total_data);

  const perfectMatch = ((matched_code ?? 1) / (total_code ?? 1)) * 100;
  const fuzzyMatch = unit.measures.fuzzy_match_percent;

  const dataMatch = unit.measures.total_data
    ? ((matched_data ?? 1) / (total_data ?? 1)) * 100
    : 100;

  const fns = GameFunctions.filter((x) => x.path === unit.name);

  const progressInfo: ({ name: string } & ProgressBarProps)[] = [
    {
      name: "Code",
      size: 30,
      current: {
        percentage: perfectMatch,
      },
      fuzzy: {
        percentage: fuzzyMatch,
      },
    },
    {
      name: "Data",
      size: 30,
      current: {
        color: "blue",
        percentage: dataMatch,
      },
    },
  ];

  return (
    <Stack>
      <div style={{ textAlign: "center" }}>
        <Anchor href={GithubLink(unit.name)} target="_blank">
          <h2>{unit.name}</h2>
        </Anchor>
      </div>
      <div>
        {progressInfo.map((info, id) => (
          <div key={id} style={{ marginBottom: "0.5rem" }}>
            <Text size={"lg"}>{info.name}</Text>
            <Group grow gap={"xl"}>
              <div key={id} style={{ textAlign: "center" }}>
                <ProgressBar {...info} />
              </div>
            </Group>
          </div>
        ))}
      </div>
      <FunctionList functions={fns} pageSize={7} />
    </Stack>
  );
}
