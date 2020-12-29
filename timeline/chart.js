import Highcharts from "highcharts";
import { timeSeries } from "../data/timechart";

function normalize(n1, n2) {
    const percentage = (n1 / n2) * 100;
    return Math.round(percentage * 1000) / 1000;
}

function formatLine(source) {
    return {
        x: source["time"] * 1000, // js time is in Milliseconds
        y: normalize(source["linesDone"], source["linesTotal"]),
        lines: source["linesTotal"],
        done: source["linesDone"],
        commit: source["commit"]
    }
}

function formatFunction(source) {
    return {
        x: source["time"] * 1000,
        y: normalize(source["functionsDone"], source["functionsTotal"]),
        lines: source["functionsTotal"],
        done: source["functionsDone"],
        commit: source["commit"]
    }
}

function getFunctionSeries() {
    const series = timeSeries.map(formatFunction);
    return series;
}

function getLineSeries() {
    const series = timeSeries.map(formatLine);
    return series;
}

export function getChart(divID) {
    // console.log(divID);
    return Highcharts.chart(divID, {
        chart: {
            type: 'area',
            //height: "70%"
        },
        exporting: {
            enabled: true
        },
        title: {
            text: 'BFBB Decompilation Progress'
        },
        yAxis: {
            title: {
                text: 'Percentage Complete'
            },
            labels: {
                formatter: function() {
                    return this.value + "%";
                }
            }
        },
        xAxis: {
            title: {
                text: "Date"
            },
            type: "datetime"
        },
        legend: {
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                label: {
                    connectorAllowed: false
                },
            }
        },
        series: [
            {
                tooltip: {
                    // "this" in this context is the data point object
                    pointFormatter: function() {
                        const commit = this.commit.substring(0, 10);
                        const done = this.done.toLocaleString();
                        const total = this.lines.toLocaleString();
                        const totalSpats = 100
                        const spats = Math.floor(this.y / 100 * totalSpats);
                        return `${done}/${total} lines (${this.y}%).<br>
                                ${spats}/${totalSpats} golden spatulas <br>
                                commit: ${commit} </br>`;
                    }
                },
                color: "#fff56c",
                lineColor: "#aead0d",
                marker: {
                    fillColor: "#aead0d"
                },
                name: 'Decompiled Lines of Assembly',
                data: getLineSeries()
            },
            {
                tooltip: {
                    // "this" in this context is the data point object
                    pointFormatter: function() {
                        const commit = this.commit.substring(0, 10);
                        const done = this.done.toLocaleString();
                        const total = this.lines.toLocaleString();
                        const totalSocks = 80;
                        const socks = Math.floor(this.y / 100 * totalSocks);
                        return `${done}/${total} functions (${this.y}%).<br>
                                ${socks}/${totalSocks} of patrick's socks <br>
                                commit: ${commit} </br>`;
                    }
                },
                type: "line",
                visible: false,
                color: "#ed7f8c",
                /*
                lineColor: "#BD6570",
                marker: {
                    fillColor: "#BD6570"
                },*/
                name: 'Decompiled Functions',
                data: getFunctionSeries()
            },
        ],
        responsive: {
            rules: [{
                condition: {
                    //maxWidth: 500
                },
                chartOptions: {
                    legend: {
                    }
                }
            }]
        },
        credits: {
            enabled: false // lol
        }
    });
}
