import { Progress, Tooltip } from "@mantine/core";
import { prettyPercent } from "./helpers";
import { PercentPush } from "./percent_push";
import { useNavigate } from "react-router-dom";

type ProgressBarData = {
  percentage: number;
  label?: string;
  color?: string;
};

export type ProgressBarProps = {
  current: ProgressBarData;
  fuzzy?: ProgressBarData;
  size?: number;
  milestones?: PercentPush[];
};

export function ProgressBar(props: ProgressBarProps) {
  const navigate = useNavigate();
  const { current, fuzzy, size, milestones = [] } = props;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Progress.Root size={size ?? 25}>
        <Tooltip
          label={
            current.label ??
            prettyPercent(current.percentage) + " Perfectly Matching"
          }
        >
          <Progress.Section
            animated={current.percentage === 100 ? false : true}
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

      {/* Milestone lines */}
      {milestones &&
        milestones.map((push) => {
          const tip =
            push.milestone +
            "% Milestone Reached on " +
            push.date_reached.toDateString() +
            "! 🏆";
          return (
            <Tooltip
              style={{ "--tooltip-color": push.text_color }}
              color={push.bg_color}
              label={tip}
            >
              <div
                onClick={() => navigate("/contributors")}
                key={push.milestone}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${push.milestone}%`,
                  width: 10,
                  backgroundColor: push.bg_color, // or any color you want
                  borderLeft: "1px solid black",
                  borderRight: "1px solid black",
                  transform: "translateX(-50%)",
                }}
              />
            </Tooltip>
          );
        })}
    </div>
  );
}
