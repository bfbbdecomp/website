export type Contributor = {
  github_username: string;
};

export type PercentPush = {
  milestone: number;
  date_reached: Date;
  bg_color: string;
  text_color: string;
  contributors: Contributor[];
};

export const PERCENT_PUSHES: PercentPush[] = [
  {
    milestone: 40,
    bg_color: "#ffb303",
    text_color: "black",
    date_reached: new Date(2025, 4, 15), // month is zero index based, nice meme
    contributors: [
      {
        github_username: "daft7",
      },
      {
        github_username: "JoshSanch",
      },
      {
        github_username: "escape209",
      },
      {
        github_username: "SquareMan",
      },
      {
        github_username: "energydrink02",
      },
      {
        github_username: "0x5abe",
      },
      {
        github_username: "tgsm",
      },
      {
        github_username: "LivewireCB",
      },
      {
        github_username: "velkog",
      },
    ],
  },
];
