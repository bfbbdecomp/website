import { Progress, Tooltip } from "@mantine/core";
import { ProgressReport } from "./progress";
import { prettyPercent } from "./helpers";

export function ProgressBar() {
  const matchPercent = ProgressReport.matched_code_percent;
  const fuzzyPercent = ProgressReport.fuzzy_match_percent;

  return (
    <div>
      <Progress.Root size={40}>
        <Tooltip label={prettyPercent(matchPercent) + " Perfectly Matching"}>
          <Progress.Section value={matchPercent} color="green" />
        </Tooltip>
        <Tooltip label={prettyPercent(fuzzyPercent) + " Partialy Matching"}>
          <Progress.Section
            animated
            value={fuzzyPercent - matchPercent}
            color="yellowgreen"
          />
        </Tooltip>
      </Progress.Root>
    </div>
  );
}
