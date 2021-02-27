import React from "react";
import { Link } from "react-router-dom";

export default [
  {
    id: "what-is-this",
    q: "What is this?",
    a: (
      <>
        BFBB Decomp is an ongoing project to reverse engineer the source code
        for the 2003 videogame{" "}
        <a href="https://en.wikipedia.org/wiki/SpongeBob_SquarePants:_Battle_for_Bikini_Bottom">
          Spongebob Squarepants: Battle for Bikini Bottom
        </a>{" "}
        for Nintendo GameCube. The game&apos;s assembly code is studied and
        manually{" "}
        <a href="https://www.hex-rays.com/products/decompiler/compare/compare_vs_disassembly/">
          decompiled
        </a>{" "}
        by contributors into C++ source code. This code can then be recompiled
        to create a perfectly matching copy of the game executable down to the
        last bit.
      </>
    ),
  },
  {
    id: "are-you-done-yet",
    q: "When will you be done?",
    a: (
      <>
        Firstly, check our <Link to="progress">progress page</Link> to see where
        we currently are at, as well as an estimation of when we will be done.
        This is a difficult question to answer. Decompilation projects tend to
        take a long time, a few years is almost a given. A lot of factors
        influence the speed. Progress will likely be slower as we near the end.
        This is due to the fact that the remaining functions will naturally be
        more difficult as they were avoided and put off for later.
      </>
    ),
  },
  {
    id: "pc-port-when",
    q: "When will there be a PC port?",
    a: (
      <>
        A PC port is out of the scope of this project. However, a separate
        project to port BFBB to PC is highly likely once all (or a sufficient
        amount) of source code has been decompiled thanks to the effort of this
        project. You can expect work to begin on a PC port whenever{" "}
        <Link to="progress">our progress</Link> is near 100%.
      </>
    ),
  },
  {
    id: "what-about-modding",
    q: "Is this useful for modding?",
    a: (
      <>
        Yes, but there are some major caveats that limit its usefulness right
        now. The biggest caveat is that the game&apos;s code cannot be
        &quot;shifted&quot; around. There is a lot of hardcoded information and
        addresses (think compiler generated jump tables) which cannot be shifted
        or the game will crash or behave unpredictably. However, this can be
        avoided and mods can be made with some effort. By inserting your new
        code after everything else, you can patch an assembly function to hook
        into your custom function. This is tedious however, but works.
      </>
    ),
  },
  {
    id: "why-gamecube",
    q: "Why choose the GameCube version?",
    a: (
      <>
        The GameCube version was chosen over the Xbox and PS2 versions for this
        project because it&apos;s the only platform we have the tools to work
        with. It&apos;s very difficult to find compilers and other necessary
        tools to create a functioning project like this. We were fortunate
        enough to be able to find a compiler for GameCube. Minor details that
        are missing in the GameCube version can be added back as the source code
        is available to modify.
      </>
    ),
  },
  {
    id: "why-though",
    q: "Why do this?",
    a: (
      <>
        There are many reasons why having source code to this game is important:
        <ul>
          <li>Preserving the history and source code of a fan favorite game</li>
          <li>Porting the original game to PC and other platforms</li>
          <li>
            Studying the source code can help glitch hunters and speedrunners
            understand the mechanics of the game
          </li>
        </ul>
      </>
    ),
  },
];
