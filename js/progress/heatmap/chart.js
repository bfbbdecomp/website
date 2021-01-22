import Highcharts from "highcharts";
import Heatmap from "highcharts/modules/heatmap";
import { COMMITS } from "../../../data/commits";
import { getFilesStateAtCommit } from "../../helpers/files";

Heatmap(Highcharts);

function round(float) {
  return Math.round(float * 10000) / 100;
}

function getHeatmapData() {
  const data = [];
  const id = COMMITS.length - 1;
  const state = getFilesStateAtCommit(id);
  state.sort((a, b) => a.path.localeCompare(b.path));
  let column = 0;
  let row = 0;
  for (const file of state) {
    const point = file;
    point.x = column;
    point.y = row;
    point.value = (point.linesDone / point.totalLines) * 100;
    data.push(point);
    column++;
    if (column >= 15) {
      column = 0;
      row++;
    }
  }
  // [x, y, value]
  return data;
}

export function makeHeatmap() {
  const chart = Highcharts.chart("heatmap", {
    chart: {
      type: "heatmap",
    },

    title: {
      text: "File Progress",
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      visible: false,
    },

    yAxis: {
      visible: false,
      reversed: true,
    },

    colorAxis: {
      min: 0,
      max: 100,
      minColor: "#FFFFFF",
      maxColor: Highcharts.getOptions().colors[0],
      labels: {
        enabled: true,
        step: 4,
        formatter: (obj) => {
          return obj.pos ? "C++<br>(100%)" : "Asm<br>(0%)";
        },
      },
      reversed: false,
    },

    legend: {
      align: "right",
      layout: "vertical",
      margin: 0,
      verticalAlign: "top",
      y: 25,
      symbolHeight: 280,
    },

    plotOptions: {
      heatmap: {
        // In case of wanting to make clickable
        //cursor: "pointer",
      },
    },

    tooltip: {
      formatter: function () {
        const fd = this.point.functionsDone.toLocaleString();
        const fs = this.point.totalFunctions.toLocaleString();
        const fp = round(this.point.functionsDone / this.point.totalFunctions);
        const ld = this.point.linesDone.toLocaleString();
        const ls = this.point.totalLines.toLocaleString();
        const lp = round(this.point.linesDone / this.point.totalLines);
        let tip = `<b>${this.point.path}</b><br>
        ${fd}/${fs} Functions (${fp}%)
        <br>
        ${ld}/${ls} Lines (${lp}%)
        `;
        if (fd == fs) {
          // not working for some reason?
          tip = '<span style="color:green">' + tip + "</span>";
        }
        console.log(tip);
        return tip;
      },
    },

    series: [
      {
        name: "File Decompilation Status",
        borderWidth: 0.2,
        data: getHeatmapData(),
      },
    ],
  });
  return chart;
}
