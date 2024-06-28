import { Unit } from "./progress";
import "./css/heatmap.css";
import { Tooltip, Text } from "@mantine/core";
import { prettyPercent } from "./helpers";

type HeatmapProps = {
  folderName: string;
  units: Unit[];
  onClick: (name: string) => void;
};

export function FileHeatmap({ folderName, onClick, units }: HeatmapProps) {
  type FileInfo = {
    name: string;
    percentage: number;
  };

  type FileInfoGridProps = {
    units: FileInfo[];
  };

  const fileInfos: FileInfo[] = units.map((unit) => ({
    name: unit.name,
    percentage: unit.total_code
      ? (unit.matched_code / unit.total_code) * 100
      : 100,
  }));

  const getColor = (percentage: number): string => {
    // Map percentage to a color (e.g., using a gradient from red to green)
    const red = Math.min(255, (100 - percentage) * 2.55);
    const green = Math.min(255, percentage * 2.55);
    return `rgb(${red}, ${green}, 0)`;
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
                <div>{prettyPercent(unit.percentage)}</div>
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
