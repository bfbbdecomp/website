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

  let stateThen = getStateAtCommit(getCommitIDByHash(closest.hash));
  const stateNow = getStateAtCommit(COMMITS.length);

  /*
    for some reason the progress script has a bug and adds commits with
    no difference in progress when it shouldn't... not sure why.
    instead of fixing this bug, here's a ghetto hack
    that just selects the last commit that was different.
  */
  let i = 0;
  while (stateNow.linesDone == stateThen.linesDone) {
    stateThen = getStateAtCommit(COMMITS.length - i);
    i += 1;
  }

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
