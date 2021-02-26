import React from "react";

export default [
  {
    id: "what-is-this",
    q: "What is this?",
    a: `This is a...`,
  },
  {
    id: "test",
    q: "foo bar baz",
    a: (
      <React.Fragment>
        test<b>foo</b>
      </React.Fragment>
    ),
  },
];
