import React from "react";
import GameFAQ from "./decomp";
import ContributeFAQ from "./contribute";
import GeneralFAQ from "./general";
import DecompFAQ from "./game";

const sections = {
  general: {
    name: "General",
    qa: GeneralFAQ,
  },
  /*
  decomp: {
    name: "Decompilation",
    qa: DecompFAQ,
  },
  */
  contribute: {
    name: "Contributing",
    qa: ContributeFAQ,
  },
  /*
  game: {
    name: "Game",
    qa: GameFAQ,
  },
  */
};

export default class FAQ extends React.Component {
  state = {
    section: "general",
  };

  setSection(name) {
    this.setState({ section: name });
  }

  render() {
    return (
      <div>
        <section className="hero">
          <div className="hero-body">
            <p className="title">Frequently Asked Questions</p>
          </div>
        </section>

        <div className="columns">
          <div className="column is-one-fifth">
            <aside className="menu">
              <ul className="menu-list">
                {Object.keys(sections).map((key) => {
                  const name = sections[key].name;
                  const selected = key == this.state.section;
                  return (
                    <li key={key}>
                      <a
                        onClick={() => {
                          this.setSection(key);
                        }}
                        className={selected ? "is-active" : ""}
                      >
                        {name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
          <div className="column">
            <div className="content px-3">
              {sections[this.state.section].qa.map((qa) => {
                return (
                  <div key={qa.id} className="mb-4">
                    <div className="has-text-weight-semibold is-size-5">
                      {qa.q}
                    </div>
                    <p className="py-1">{qa.a}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/**/}
      </div>
    );
  }
}
