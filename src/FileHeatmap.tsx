import { Unit } from "./progress";
import "./css/heatmap.css";
import { Tooltip, Text } from "@mantine/core";
import { prettyPercent } from "./helpers";
import { FileMetricData } from "./OverallProgress";

type HeatmapProps = {
  folderName: string;
  units: Unit[];
  onClick: (name: string) => void;
  metric: FileMetricData;
};

export function FileHeatmap({
  folderName,
  onClick,
  units,
  metric,
}: HeatmapProps) {
  type FileInfo = {
    name: string;
    percentage: number;
    value: string;
  };

  type FileInfoGridProps = {
    units: FileInfo[];
  };

  const fileInfos: FileInfo[] = units.map((unit) => ({
    name: unit.name,
    percentage: metric.accessor(unit),
    value: "hey",
  }));

  const getColor = (percentage: number): string => {
    return metric.gradient.mode("lab")(percentage).hex();
  };

  const UnitGrid: React.FC<FileInfoGridProps> = ({ units }) => {
    return (
      <div className="grid-container">
        {units.map((unit, index) => (
          <Tooltip
            key={index}
            label={
              <div>
                <div>{unit.name}</div>
                <div>
                  {unit.value} - {metric.description}
                </div>
              </div>
            }
          >
            <div
              key={index}
              onClick={() => onClick(unit.name)}
              className="grid-item"
              style={{ backgroundColor: getColor(unit.percentage) }}
            ></div>
          </Tooltip>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Text fw={700} size={"lg"}>
        {folderName}
      </Text>
      <UnitGrid units={fileInfos} />
    </div>
  );
}
