import { Progress, Tooltip } from "@mantine/core";
import { prettyPercent } from "./helpers";

type ProgressBarData = {
  percentage: number;
  label?: string;
  color?: string;
};

export type ProgressBarProps = {
  current: ProgressBarData;
  fuzzy?: ProgressBarData;
  size?: number;
};

export function ProgressBar(props: ProgressBarProps) {
  const { current, fuzzy, size } = props;

  return (
    <div>
      <Progress.Root size={size ?? 25}>
        <Tooltip
          label={
            current.label ??
            prettyPercent(current.percentage) + " Perfectly Matching"
          }
        >
          <Progress.Section
            value={current.percentage}
            color={current.color ?? "green"}
          />
        </Tooltip>
        {fuzzy !== undefined && (
          <Tooltip
            label={
              fuzzy.label ?? prettyPercent(fuzzy.percentage) + " Fuzzy Match"
            }
          >
            <Progress.Section
              animated
              value={fuzzy.percentage - current.percentage}
              color={fuzzy.color ?? "yellowgreen"}
            />
          </Tooltip>
        )}
      </Progress.Root>
    </div>
  );
}
