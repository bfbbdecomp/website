import sample from "../json/sample.json";
import progress from "../json/progress.json";

/*
    Usually TS would be able to infer the type of the progress import
    and we would get intellisense. However, this file has grown to be
    quite huge, so what I realized is that the TS intellisense server
    in VS code won't take the time to parse it after a certain size.
    It will type it as {}.
    Because I'm lazy and don't want to manually write out type definitions,
    I'm just generating a smaller version of it which the intellisense will
    parse just fine, and then typing the big file as that.

    see https://github.com/microsoft/TypeScript/issues/42761#issuecomment-778368320
*/
type Report = typeof sample;
export const ProgressReport = progress as Report;

export type Unit = (typeof ProgressReport.units)[number];

const fn = ProgressReport.units[0].functions;

export type GameFunction = (typeof fn)[number];
