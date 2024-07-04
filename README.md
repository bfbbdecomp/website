# BFBB Decompilation Website

A website to track the progress and show other data related to the [BFBB Decompilation Project](https://github.com/bfbbdecomp/bfbb).

It is written in
[TypeScript](https://www.typescriptlang.org/)
using
[React](https://react.dev/) and
[Mantine](https://mantine.dev/).
It also uses
[C#](https://dotnet.microsoft.com/en-us/languages/csharp)
to pre-process the progress/asm data before building the website.

## Development

1. Install [nodejs](https://nodejs.org/en) and [dotnet](https://dotnet.microsoft.com/en-us/).

Go to the [latest workflow runs](https://github.com/bfbbdecomp/bfbb/actions/workflows/build.yml)
of BFBB. The main workflow builds the game and saves an artifact called `progress.json`. Download this zip file and extract it.

2. Move the extracted `progress.json` into [/artifacts](./artifacts/)

3. Run the commands in [build.py](./build.py).
   You can run them individually or with `python build.py`

4. Start a development server with `npm run dev`
