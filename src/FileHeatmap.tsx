import { ReportUnit } from "./progress";
import "./css/heatmap.css";
import { Tooltip, Text } from "@mantine/core";
import { prettyPercent } from "./helpers";
import { FileMetricData } from "./FileMetric";

type HeatmapProps = {
  folderName: string;
  filteredUnits: ReportUnit[];
  allUnits: ReportUnit[];
  onClick: (name: string) => void;
  metric: FileMetricData;
};

export function FileHeatmap({
  folderName,
  onClick,
  filteredUnits,
  allUnits,
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

  const fileInfos: FileInfo[] = filteredUnits.map((unit) => {
    const value = metric.value(unit);
    const info: FileInfo = {
      name: unit.name,
      value: !metric.percentage ? prettyPercent(value) : value.toString(),
      percentage: metric.percentage ? metric.percentage(unit, allUnits) : value,
    };
    return info;
  });

  const getColor = (percentage: number): string => {
    return metric.gradient
      .mode("rgb")(percentage / 100)
      .hex();
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
