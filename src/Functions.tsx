import { GameFunction, ProgressReport } from "./progress";
import { useEffect, useState } from "react";
import {
  Anchor,
  Container,
  Group,
  MultiSelect,
  Pagination,
  Select,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { ProgressBar, ProgressBarProps } from "./ProgressBar";
import { prettyPercent } from "./helpers";

type FileFunction = GameFunction & { path: string };

const GameFunctions: FileFunction[] = ProgressReport.units.flatMap((x) =>
  x.functions.map((fn) => ({ ...fn, path: x.name }))
);

const FileName = (path: string): string => {
  return path.split("/").slice(-1)[0];
};

export function GithubLink(path: string): string {
  return (
    "https://github.com/bfbbdecomp/bfbb/blob/main/src/" +
    path.replace("main/", "") +
    ".cpp"
  );
}

const FileNames = [...new Set(GameFunctions.map((x) => FileName(x.path)))];
const Opcodes = [...new Set(GameFunctions.flatMap((x) => x.opcodes))].sort(
  (a, b) => a.localeCompare(b)
);

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
  [FnSort.Address]: (a, b) => b.address.localeCompare(a.address),
  [FnSort.Labels]: (a, b) => b.labels - a.labels,
  [FnSort.Matched]: (a, b) => b.fuzzy_match_percent - a.fuzzy_match_percent,
  [FnSort.Name]: (a, b) => a.name.localeCompare(b.name),
  [FnSort.Size]: (a, b) => b.size - a.size,
};

const FunctionInfo = (fn: FileFunction) => {
  const progress: ProgressBarProps = {
    size: 20,
    current: {
      percentage: fn.fuzzy_match_percent,
      label: prettyPercent(fn.fuzzy_match_percent) + " Match",
    },
  };
  return (
    <div style={{ marginBottom: "1.5rem", fontFamily: "monospace" }}>
      <Text fw={700}>{fn.demangled_name}</Text>
      <Text>
        <Anchor href={GithubLink(fn.path)} target="_blank">
          {FileName(fn.path)}
        </Anchor>{" "}
        / {fn.address} / size: {fn.size} / labels: {fn.labels}
      </Text>
      <ProgressBar {...progress} />
    </div>
  );
};

export function Functions() {
  const FNS_PER_PAGE = 15;
  const [activePage, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [fileFilter, setFileFilter] = useState<string[]>([]);
  const [sortFn, setSortFn] = useState<FnSort>();
  const [opcodeFilter, setOpcodeFilter] = useState<string[]>([]);
  const index = (activePage - 1) * FNS_PER_PAGE;

  const filteredItems = GameFunctions.filter(
    (x) =>
      !searchText || x.name.toLowerCase().includes(searchText.toLowerCase())
  )
    .filter((x) => !fileFilter.length || fileFilter.includes(FileName(x.path)))
    .filter(
      (x) =>
        !opcodeFilter.length || x.opcodes.some((o) => opcodeFilter.includes(o))
    );
  const sortedItems = sortFn
    ? filteredItems.sort(sortFunctions[sortFn])
    : filteredItems;
  const totalPages = Math.ceil(sortedItems.length / FNS_PER_PAGE);
  const items = sortedItems.slice(index, index + FNS_PER_PAGE);

  useEffect(() => {
    if (activePage > totalPages) setPage(1);
  }, [searchText, fileFilter, opcodeFilter]);

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
                placeholder="Filter by Function name"
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
          </Stack>
        </div>
        <div>
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setPage}
            withEdges
            mb="sm"
          />
          {items.map((fn, key) => (
            <FunctionInfo {...fn} key={key} />
          ))}
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setPage}
            withEdges
            mt="sm"
          />
        </div>
      </Group>
    </Container>
  );
}
