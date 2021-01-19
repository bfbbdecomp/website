import Highcharts from "highcharts/highstock";
import { getCommitFromID } from "../../helpers/commits";
import { getDecompCommits, getStateAtCommit } from "../../helpers/functions";

function generateTimelineData() {
  const funcData = [];
  const lineData = [];

  // get all commits where something was decompiled.
  const commits = getDecompCommits();
  // console.log(commits);
  for (const id of commits) {
    const commit = getCommitFromID(id);
    const state = getStateAtCommit(id);
    const time = commit.time * 1000; // UNIX time, convert to Milliseconds
    //console.log(id, state);

    const dataPointLine = {
      x: time,
      y: state.linesPercent,
      linesDone: state.linesDone.toLocaleString(),
      linesTotal: state.lines.toLocaleString(),
      //name: commit.hash.substring(0, 7),
    };

    const dataPointFunc = {
      x: time,
      y: state.funcsPercent,
      funcsDone: state.funcsDone.toLocaleString(),
      funcsTotal: state.funcs.toLocaleString(),
      // name: commit.hash.substring(0, 7),
    };

    lineData.push(dataPointLine);
    funcData.push(dataPointFunc);
  }

  return {
    funcData,
    lineData,
  };
}

export function makeTimeline() {
  // create the chart
  const data = generateTimelineData();
  const chart = Highcharts.stockChart("timeline", {
    title: {
      text: "Decompilation Progress",
    },

    credits: {
      enabled: false,
    },

    legend: {
      enabled: true,
    },

    scrollbar: {
      enabled: false,
    },

    xAxis: {
      // makes the X-axis date appear in even intervals.
      // includes days with missing data.
      ordinal: false,
    },

    yAxis: {
      title: {
        // text: "Percent Complete",
      },
      labels: {
        formatter: (point) => {
          return point.value + "%";
        },
      },
    },

    rangeSelector: {
      buttons: [
        {
          type: "week",
          count: 1,
          text: "1w",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "year",
          count: 1,
          text: "1Y",
        },
        {
          type: "ytd",
          text: "YTD",
        },
        {
          type: "all",
          text: "All",
        },
      ],
      selected: 1,
      inputEnabled: false,
    },

    tooltip: {
      /*
      // Custom formatting for the bottom part
      formatter: function () {
        return "TODO";
      },
      */
    },

    series: [
      {
        name: "Decompiled Lines of Assembly",
        type: "area",
        data: data.lineData,
        tooltip: {
          valueDecimals: 2,
          pointFormatter: function () {
            //console.log(this);
            const template = `<span style="color:${this.color}">\u25CF</span>
            Assembly: <b>${this.y}%</b>
            <br>
            ${this.linesDone}/${this.linesTotal} lines
            `;
            //console.log(str);
            return template;
          },
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

        // makes it so the y axis changes upon zooming
        threshold: null,
      },
      {
        name: "Decompiled Functions",
        type: "line",
        // showInNavigator: true,
        visible: false,
        data: data.funcData,
        tooltip: {
          valueDecimals: 2,
          pointFormatter: function () {
            //console.log(this);
            const template = `<span style="color:${this.color}">\u25CF</span>
            Functions: <b>${this.y}%</b>
            <br>
            ${this.funcsDone}/${this.funcsTotal} functions
            `;
            //console.log(str);
            return template;
          },
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

        // makes it so the y axis changes upon zooming
        threshold: null,
      },
    ],
  });

  return chart;
}
