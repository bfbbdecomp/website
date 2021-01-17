import Highcharts from "highcharts/highstock";
import { getCommitFromID } from "../../helpers/commits";
import {
  getDecompCommits,
  getDecompiledStateAtCommit,
} from "../../helpers/functions";

function generateTimelineData() {
  const data = [];

  // get all commits where something was decompiled.
  const commits = getDecompCommits();
  // console.log(commits);
  for (const id of commits) {
    const commit = getCommitFromID(id);
    // console.log(commit);
    const state = getDecompiledStateAtCommit(id);
    console.log(id, state);
    const dataPoint = [
      commit.time * 1000, // UNIX time, convert to Milliseconds
      state.linesDone,
    ];
    data.push(dataPoint);
  }

  console.log(data);
  return data;
}

export function generateGarbageData() {
  const data = [];
  let date = Date.UTC(2020, 0, 15, 10, 30);
  let percent = 0.0;
  for (let i = 0; i < Math.round(365 * 1.5); i++) {
    data.push([date, percent]);
    let add = Math.random() * 0.2;
    if (Math.random() > 0.45) {
      add = 0;
    }
    percent += add;
    date += 1000 * 60 * 60 * 24;
  }
  // list of lists
  // [1318425600000,407.1385,407.48,407.081,407.4799]
  return data;
}

export function makeTimeline() {
  // create the chart
  const chart = Highcharts.stockChart("timeline", {
    title: {
      text: "Decompilation Progress",
    },

    credits: {
      enabled: false,
    },

    scrollbar: {
      //enabled: false,
    },

    rangeSelector: {
      buttons: [
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
      selected: 5,
      inputEnabled: false,
    },

    series: [
      {
        name: "Assembly",
        type: "area",
        data: generateTimelineData(),
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
