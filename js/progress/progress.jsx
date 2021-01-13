import React from "react";
import Menu from "./bfbb-menu/menu";

const contributors = [
  {
    name: "pslehisl",
    profileImg: "https://github.com/identicons/pslehisl.png",
    profileUrl: "https://github.com/pslehisl",
  },
  {
    name: "mattbruv",
    profileImg:
      "https://avatars0.githubusercontent.com/u/5638426?s=460&u=1c4a9f676e848e4edc7da2832c35d3d99bedc780&v=4",
    profileUrl: "https://github.com/mattbruv",
  },
  {
    name: "stravant",
    profileImg:
      "https://avatars2.githubusercontent.com/u/2074518?s=460&u=997bb336a3890e3b0e33b61913e4cd17d7bd55a5&v=4",
    profileUrl: "https://github.com/stravant",
  },
  {
    name: "DarkRTA",
    profileImg:
      "https://avatars2.githubusercontent.com/u/15368682?s=460&u=b0cc63f5bf5bc25b5637c32c7cbc2dbf8f95af08&v=4",
    profileUrl: "https://github.com/DarkRTA",
  },
  {
    name: "Gota7",
    profileImg:
      "https://avatars0.githubusercontent.com/u/22335998?s=460&u=f5cf38fa26e2a66eb662b111f554a4b9d2624dc0&v=4",
    profileUrl: "https://github.com/Gota7",
  },
];

export default class Progress extends React.Component {
  render() {
    return (
      <>
        <div>Progress Page!</div>
        <Menu
          contributors={contributors}
          spatulaCount={5}
          shinyCount={20274}
          sockCount={10}
          collectableCount={25}
          collectableTotal={121}
          commitCount={174}
          contributorCount={8}
          pullRequestCount={1}
        ></Menu>
      </>
    );
  }
}
