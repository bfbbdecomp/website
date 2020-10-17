import { timeSeries } from "./data/timechart.js";
import { formatDistanceToNow, add, format, differenceInDays } from "date-fns";


function getComparePoint() {
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const result = timeSeries.find((point) => {
        const pDate = new Date(point["time"] * 1000);
        return pDate >= since;
    });
    return result;
}

function getLastChange(from) {
    const rev = [].concat(timeSeries).reverse();
    return rev.find((p) => {
        return p["linesDone"] != from["linesDone"]
    });
}

export function getEstimate() {
    const latest = timeSeries[timeSeries.length - 1];
    let then = getComparePoint();
    if (!then) {
        then = getLastChange(latest);
    }
    console.log(then);
    console.log(latest);
    const diff = latest.linesDone - then.linesDone;
    const daysPassed = differenceInDays(
        Date.now(),
        new Date(then["time"] * 1000)
    );
    const remaining = latest.linesTotal - latest.linesDone;
    const daysNeeded = Math.round((daysPassed * remaining) / diff);
    const doneDate = add(Date.now(), {days: daysNeeded});
    const doneDateString = format(doneDate, "LLLL d, yyyy");
    const timeBetweenString = formatDistanceToNow(doneDate, Date.now());

    const data = {
        daysPassed,
        remaining,
        doneDate,
        doneDateString,
        timeBetweenString,
        daysNeeded,
        diff
    };

    return data;
}