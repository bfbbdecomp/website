import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="progress">
              Progress
            </Link>
            {/*
            <Link className="navbar-item" to="functions">
              Functions
            </Link>
            */}
            <Link className="navbar-item" to="faq">
              FAQ
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="button"
                  href="https://www.github.com/bfbbdecomp/"
                >
                  <span className="icon">
                    <i className="fab fa-github"></i>
                  </span>
                  <span>GitHub</span>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="button is-discord"
                  href="https://discord.gg/zEr6u3mRWe"
                >
                  <span className="icon">
                    <i className="fab fa-discord"></i>
                  </span>
                  <span>Discord</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
