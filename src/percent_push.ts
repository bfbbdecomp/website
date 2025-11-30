export type Contributor = {
  github_username: string;
};

export type PercentPush = {
  milestone: number;
  date_reached?: Date;
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
  {
    milestone: 50,
    bg_color: "#f1c40f",
    text_color: "black",
    date_reached: new Date(2025, 9, 28), // month is zero index based, nice meme
    contributors: [
      {
        github_username: "JoshSanch",
      },
      {
        github_username: "SquareMan",
      },
      {
        github_username: "daft7",
      },
      {
        github_username: "escape209",
      },
      {
        github_username: "LivewireCB",
      },
      {
        github_username: "LSLees1347",
      },
      {
        github_username: "bluisblu",
      },
      {
        github_username: "mattbruv",
      },
    ],
  },
  {
    milestone: 60,
    bg_color: "#f1c40f",
    text_color: "black",
    date_reached: new Date(2025, 10, 29), // month is zero index based, nice meme
    contributors: [
      {
        github_username: "bluisblu",
      },
      {
        github_username: "seilweiss",
      },
      {
        github_username: "JoshSanch",
      },
      {
        github_username: "LivewireCB",
      },
      {
        github_username: "daft7",
      },
      {
        github_username: "LSLees1347",
      },
      {
        github_username: "escape209",
      },
      {
        github_username: "energydrink02",
      },
    ],
  },
  {
    milestone: 70,
    bg_color: "gray",
    text_color: "black",
    // date_reached: new Date(2025, 9, 28), // month is zero index based, nice meme
    contributors: [],
  },
];
