import Highcharts from "highcharts";
import Heatmap from "highcharts/modules/heatmap";

Heatmap(Highcharts);

function getPointCategoryName(point, dimension) {
  var series = point.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis.categories[point[isY ? "y" : "x"]];
}

function getHeatmapData() {
  const data = [];
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

    accessibility: {
      point: {
        descriptionFormatter: function (point) {
          var ix = point.index + 1,
            xName = getPointCategoryName(point, "x"),
            yName = getPointCategoryName(point, "y"),
            val = point.value;
          return ix + ". " + xName + " sales " + yName + ", " + val + ".";
        },
      },
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
        return (
          "<b>" +
          getPointCategoryName(this.point, "x") +
          "</b> sold <br><b>" +
          this.point.value +
          "</b> items on <br><b>" +
          getPointCategoryName(this.point, "y") +
          "</b>"
        );
      },
    },

    series: [
      {
        name: "File Decompilation Status",
        borderWidth: 0.1,
        data: getHeatmapData(),
      },
    ],
  });
  return chart;
}
