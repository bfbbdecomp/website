import { formatDistanceToNow, add, format, differenceInDays } from "date-fns";
import { COMMITS } from "../../data/commits";
import { getCommitIDByHash } from "./commits";
import { getStateAtCommit } from "./functions";

export function getTimeEstimate(days) {
  const today = Date.now();
  const goal = Math.round(today / 1000) - days * 24 * 60 * 60; // days;

  const closest = COMMITS.reduce((prev, curr) => {
    return Math.abs(curr.time - goal) < Math.abs(prev.time - goal)
      ? curr
      : prev;
  });

  const daysPassed = differenceInDays(
    Date.now(),
    new Date(closest.time * 1000)
  );

  const stateThen = getStateAtCommit(getCommitIDByHash(closest.hash));
  const stateNow = getStateAtCommit(COMMITS.length);

  const difference = stateNow.linesDone - stateThen.linesDone;
  const remaining = stateNow.lines - stateNow.linesDone;
  const daysNeeded = Math.round((daysPassed * remaining) / difference);
  const doneDate = add(Date.now(), { days: daysNeeded });
  const doneDateString = format(doneDate, "LLLL d, yyyy");
  const timeBetweenString = formatDistanceToNow(doneDate, Date.now());

  const data = {
    daysPassed,
    remaining,
    doneDate,
    doneDateString,
    timeBetweenString,
    daysNeeded,
    difference,
  };

  return data;
}
