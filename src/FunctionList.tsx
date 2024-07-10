import { ActionIcon, Anchor, Pagination, Text, Tooltip } from "@mantine/core";
import { GameFunction } from "./progress";
import { ProgressBar, ProgressBarProps } from "./ProgressBar";
import { prettyPercent } from "./helpers";
import { useEffect, useState } from "react";
import { IconAdjustments, IconClipboardCopy } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export type FileFunction = GameFunction & { path: string };

export const FileName = (path: string): string => {
  return path.split("/").slice(-1)[0];
};

export function GithubLink(path: string): string {
  return (
    "https://github.com/bfbbdecomp/bfbb/blob/main/src/" +
    path.replace("main/", "") +
    ".cpp"
  );
}

type FunctionListProps = {
  functions: FileFunction[];
  pageSize: number;
};

const FunctionInfo = (fn: FileFunction) => {
  const progress: ProgressBarProps = {
    size: 20,
    current: {
      percentage: fn.fuzzy_match_percent,
      label: prettyPercent(fn.fuzzy_match_percent) + " Match",
    },
  };

  function copyClipboard(value: string) {
    navigator.clipboard.writeText(value);
    notifications.show({
      title: "Mangled Name Copied",
      message: value,
    });
  }

  return (
    <div style={{ marginBottom: "1.5rem", fontFamily: "monospace" }}>
      <Text fw={700}>{fn.demangled_name ?? fn.name}</Text>
      <Text>
        <ActionIcon variant="subtle" onClick={() => copyClipboard(fn.name)}>
          <Tooltip label="Copy Mangled Name">
            <IconClipboardCopy width={"70%"} height={"70%"} />
          </Tooltip>
        </ActionIcon>{" "}
        <Anchor href={GithubLink(fn.path)} target="_blank">
          {FileName(fn.path)}
        </Anchor>{" "}
        / {fn.address} / size: {fn.size} / labels: {fn.labels}
      </Text>
      <ProgressBar {...progress} />
    </div>
  );
};

export function FunctionList({ functions, pageSize }: FunctionListProps) {
  const FNS_PER_PAGE = pageSize;
  const [activePage, setPage] = useState(1);

  const index = (activePage - 1) * FNS_PER_PAGE;
  const totalPages = Math.ceil(functions.length / FNS_PER_PAGE);
  const items = functions.slice(index, index + FNS_PER_PAGE);

  useEffect(() => {
    if (activePage > totalPages) setPage(totalPages);
    if (activePage == 0 && totalPages > 0) setPage(1);
  }, [totalPages]);

  return (
    <>
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
    </>
  );
}
