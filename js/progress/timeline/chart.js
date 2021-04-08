import Highcharts from "highcharts/highstock";
import Exporting from "highcharts/modules/exporting";
import { getCommitFromID } from "../../helpers/commits";
import { getDecompCommits, getStateAtCommit } from "../../helpers/functions";

Exporting(Highcharts);

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

export function makeTimeline(options) {
  // create the chart
  const data = generateTimelineData();
  const chart = Highcharts.stockChart("timeline", {
    title: {
      // text: "Decompilation Progress",
    },
    /*
    chart: {
      height: "50%",
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 1000,
          },
          chartOptions: {
            chart: {
              height: 450,
            },
          },
        },
      ],
    },
    */

    credits: {
      enabled: false,
    },

    legend: {
      enabled: true,
    },

    scrollbar: {
      enabled: true,
    },

    xAxis: {
      // makes the X-axis date appear in even intervals.
      // includes days with missing data.
      ordinal: !options.showDowntime, // false,
    },

    yAxis: {
      title: {
        // text: "Percent Complete",
      },
      labels: {
        align: "left",
        formatter: (point) => {
          return point.value + "%";
        },
      },
    },

    rangeSelector: {
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1d",
        },
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
      selected: 7,
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
        color: "#fff56c",
        lineColor: "#aead0d",
        marker: {
          fillColor: "#aead0d",
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
        color: "#ed7f8c",

        // makes it so the y axis changes upon zooming
        threshold: null,
      },
    ],
  });

  return chart;
}
