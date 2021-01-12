import Highcharts from "highcharts/highstock";

export function makeTimeline() {
  // create the chart
  const chart = Highcharts.stockChart("timeline", {
    title: {
      text: "Decompilation Progress",
    },

    /*
    subtitle: {
      text: "Using ordinal X axis",
    },
    */

    credits: {
      enabled: false,
    },

    xAxis: {
      gapGridLineWidth: 0,
    },

    rangeSelector: {
      buttons: [
        {
          type: "hour",
          count: 1,
          text: "1h",
        },
        {
          type: "day",
          count: 1,
          text: "1D",
        },
        {
          type: "all",
          count: 1,
          text: "All",
        },
      ],
      selected: 1,
      inputEnabled: false,
    },

    series: [
      {
        name: "AAPL",
        type: "area",
        data: null,
        gapSize: 5,
        tooltip: {
          valueDecimals: 2,
        },
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        threshold: null,
      },
    ],
  });

  return chart;
}
