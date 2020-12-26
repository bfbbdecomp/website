import Highcharts from "highcharts";
import Heatmap from "highcharts/modules/heatmap";
import Exporting from "highcharts/modules/exporting";
import { commit, heatData } from "../data/heatchart.js";
import { formatDistanceToNowStrict } from "date-fns";

const commitDate = formatDistanceToNowStrict(commit.time * 1000, {
    addSuffix: true
})

const tag = commit.commit.substring(0, 10);

// have to do this to get heatmaps to work for some dumb reason
//Exporting(Highcharts);
Heatmap(Highcharts);

// https://github.com/highcharts/highcharts/issues/13222
Exporting(Highcharts);

// i really hate javascript
// just thought I should throw that out there
// every line of JS I write makes me want to cry a little more inside

function normalize(n1, n2) {
    const percentage = (n1 / n2) * 100;
    return Math.round(percentage * 1000) / 1000;
}

/*
    points in the heatmap have the following base properties:
    x, y, and value. Any other info is for the sake of info
*/
function generateData() {
    return heatData;
}

// point.x, point.y, point.value

export function getChart(id) {
    Highcharts.chart(id, {
        chart: {
            type: "heatmap",
            //height: "70%",
        },
        credits: {
            enabled: false // am I an asshole?
        },
        title: {
            text: 'Individual File Progress'
        },
        subtitle: {
            text: `${commitDate} - Commit: ${tag}`
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: false,
            reversed: true
        },
        colorAxis: {
            min: 0,
            max: 100,
            minColor: '#222222',
            maxColor: '#31e649',
            labels: {
                enabled: true,
                step: 4,
                formatter: (obj) => {
                    return (obj.pos == 0) ? 'Asm<br>(0%)' : 'C++<br>(100%)'
                }
            },
            reversed: false
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 280
        },
        tooltip: {
            formatter: function () {
                //console.log(this.point)
                return `<b>${this.point.file}</b><br>
                ${this.point.doneFuncs}/${this.point.funcs.toLocaleString()} functions
                (${this.point.funcPercent}%)
                <br>
                ${this.point.doneLines}/${this.point.lines.toLocaleString()} lines
                (${this.point.linePercent}%)
                `;
            }
        },
        series: [{
            name: 'Sales per employee',
            borderWidth: 0.15,
            borderColor: "#555555",
            //boostThreshold: 0,
            data: generateData()
        }],
        responsive: {
            rules: [{
                condition: {
                    //maxWidth: 500
                },
                chartOptions: {
                }
            }]
        }
    });
}