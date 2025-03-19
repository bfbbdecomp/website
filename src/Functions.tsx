import { ProgressReport } from "./progress";
import { useState } from "react";
import {
  Card,
  Text,
  Container,
  Group,
  MultiSelect,
  Select,
  Stack,
  TextInput,
  Flex,
} from "@mantine/core";
import { FileFunction, FileName, FunctionList } from "./FunctionList";
import { prettyPercent } from "./helpers";

export const GameFunctions: FileFunction[] = ProgressReport.units.flatMap((x) =>
  x.functions.map((fn) => ({ ...fn, path: x.name }))
);

const FileNames = [...new Set(GameFunctions.map((x) => FileName(x.path)))];
const Opcodes = [...new Set(GameFunctions.flatMap((x) => x.opcodes))]
  .filter((x) => x !== undefined)
  .sort((a, b) => a.localeCompare(b));

enum FnSort {
  Size = "Size",
  Matched = "Matched",
  Address = "Address",
  Name = "Name",
  Labels = "Labels",
}

const sortFunctions: Record<
  FnSort,
  (a: FileFunction, b: FileFunction) => number
> = {
  [FnSort.Address]: (a, b) => Number(a.address) - Number(b.address),
  [FnSort.Labels]: (a, b) => (b.labels ?? 0) - (a.labels ?? 0),
  [FnSort.Matched]: (a, b) => b.fuzzy_match_percent - a.fuzzy_match_percent,
  [FnSort.Name]: (a, b) => a.name.localeCompare(b.name),
  [FnSort.Size]: (a, b) => b.size - a.size,
};

type Stat = {
  title: string;
  value: string;
};

function StatisticsCard({ title, value }: Stat) {
  return (
    <Card shadow="sm" padding="lg">
      <Text fw={500}>{title}</Text>
      <Text size="xl" fw={700}>
        {value}
      </Text>
    </Card>
  );
}

export function Functions() {
  const [searchText, setSearchText] = useState("");
  const [fileFilter, setFileFilter] = useState<string[]>([]);
  const [sortFn, setSortFn] = useState<FnSort>();
  const [opcodeFilter, setOpcodeFilter] = useState<string[]>([]);

  const search = searchText.toLowerCase();

  const filteredItems = GameFunctions.filter(
    (x) =>
      !searchText ||
      x.name.toLowerCase().includes(search) ||
      x.path.toLowerCase().includes(search) ||
      (x.demangled_name && x.demangled_name.toLowerCase().includes(search))
  )
    .filter((x) => !fileFilter.length || fileFilter.includes(FileName(x.path)))
    .filter(
      (x) =>
        !opcodeFilter.length || x.opcodes?.some((o) => opcodeFilter.includes(o))
    );
  const items = sortFn
    ? filteredItems.sort(sortFunctions[sortFn])
    : filteredItems;

  const sum = (xs: number[]) => xs.reduce((tot, a) => tot + a, 0);

  const selectionCodeSize = sum(items.map((x) => x.size));
  const fuzzyPercent =
    sum(items.map((x) => x.fuzzy_match_percent * x.size)) / selectionCodeSize;
  const fuzzyCode = (fuzzyPercent * selectionCodeSize) / 100;

  const percentageOfGameCode =
    (selectionCodeSize / ProgressReport.total_code) * 100;

  const matchingFns = items.filter((x) => x.fuzzy_match_percent === 100);
  const totalFns = items.length;

  const stats: Stat[] = [
    {
      title: "Total Code",
      value: selectionCodeSize.toLocaleString(),
    },
    {
      title: "Matched Code",
      value: fuzzyCode.toLocaleString(),
    },
    {
      title: "Matched Code %",
      value: prettyPercent(fuzzyPercent),
    },
    {
      title: "% of Game Code",
      value: prettyPercent(percentageOfGameCode),
    },
  ];

  const fnStats: Stat[] = [
    {
      title: "Functions",
      value: totalFns.toLocaleString(),
    },
    {
      title: "Matched Functions",
      value: matchingFns.length.toLocaleString(),
    },
    {
      title: "Matched Functions %",
      value: prettyPercent((matchingFns.length / totalFns) * 100),
    },
    {
      title: "Files",
      value: new Set([...items.map((x) => x.path)]).size.toLocaleString(),
    },
  ];

  return (
    <Container fluid>
      <Group align={"flex-start"} grow justify={"center"}>
        <div>
          <Stack>
            <Group grow>
              <TextInput
                value={searchText}
                onChange={(event) => setSearchText(event.currentTarget.value)}
                label="Search"
                placeholder="Filter by Function name or path"
              />
              <MultiSelect
                label="File Filter"
                placeholder="Filter by Files"
                data={FileNames}
                onChange={setFileFilter}
                searchable
              />
            </Group>
            <Group grow>
              <MultiSelect
                label="Opcode Filter"
                placeholder="Filter Functions by Opcode(s)"
                data={Opcodes}
                onChange={setOpcodeFilter}
                searchable
              />
              <Select
                label="Sort Method"
                data={Object.entries(FnSort).map(([key, data]) => ({
                  label: data,
                  value: key,
                }))}
                value={sortFn}
                onChange={(value) => setSortFn(value as FnSort)}
              />
            </Group>
            {items.length > 0 && (
              <Stack>
                <Flex gap={"lg"}>
                  {stats.map((x) => (
                    <StatisticsCard key={x.title} {...x} />
                  ))}
                </Flex>
                <Flex gap={"lg"}>
                  {fnStats.map((x) => (
                    <StatisticsCard key={x.title} {...x} />
                  ))}
                </Flex>
              </Stack>
            )}
          </Stack>
        </div>
        <div>
          <FunctionList functions={items} pageSize={10} />
        </div>
      </Group>
    </Container>
  );
}
