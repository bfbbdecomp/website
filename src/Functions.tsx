import { GameFunction, ProgressReport } from "./progress";
import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_ColumnDef,
} from "mantine-react-table";
import { Button, Container } from "@mantine/core";

const GameFunctions: GameFunction[] = ProgressReport.units.flatMap(
  (x) => x.functions
);

const data = GameFunctions.slice();

export function Functions() {
  const columns = useMemo<MRT_ColumnDef<GameFunction>[]>(
    () => [
      {
        accessorKey: "fuzzy_match_percent",
        header: "Match %",
      },
      {
        accessorKey: "size",
        header: "Size",
      },
      {
        accessorKey: "demangled_name",
        header: "Demangled Name",
      },
      {
        accessorKey: "name",
        header: "Full Name",
        Cell: ({ renderedCellValue }) => (
          <Button
            onClick={() =>
              navigator.clipboard.writeText(renderedCellValue?.toString() ?? "")
            }
          >
            Copy
          </Button>
        ),
      },
      {
        accessorKey: "address",
        header: "Address",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
  });

  return (
    <Container fluid>
      <MantineReactTable table={table} />
    </Container>
  );
}
