import React from "react";
import QA from "./qa";

export default class FAQ extends React.Component {
  render() {
    return (
      <div>
        <section className="hero">
          <div className="hero-body">
            <p className="title">Frequently Asked Questions</p>
          </div>
        </section>
        {QA.map((qa) => {
          return (
            <div key={qa.id}>
              <p className="title is-4">{qa.q}</p>
              <p className="subtitle">{qa.a}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
