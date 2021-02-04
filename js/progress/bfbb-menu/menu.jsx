import React from "react";
import ReactTooltip from "react-tooltip";
import "./menu.css";

import Bubble from "./menu-components/bubbles/bubble";
import Counter from "./menu-components/counter/counter";
import SpatulaSelector from "./menu-components/spatula-selector/spatula-selector";
import InfoText from "./menu-components/info-text/info-text";

import tank_amb from "./sounds/menu_tank_amb.wav";

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ambience: new Audio(tank_amb),
    };
  }

  componentDidMount() {
    const ambience = this.state.ambience; 
    ambience.volume = 0.2;
    ambience.loop = true;
    ambience.play();
  }

  componentWillUnmount() {
    const ambience = this.state.ambience; 
    ambience.pause();
    ambience.currentTime = 0;
  }

  render() {
    const contributors = this.props.contributors;
    const spatulaCount = this.props.spatulaCount;
    const shinyCount = this.props.shinyCount;
    const sockCount = this.props.sockCount;
    const collectableCount = this.props.collectableCount;
    const collectableTotal = this.props.collectableTotal;

    const commitCount = this.props.commitCount;
    const contributorCount = this.props.contributorCount;
    const pullRequestCount = this.props.pullRequestCount;

    return (
      <div className="container">
        <ReactTooltip />
        <div className="menu">
          <div className="caustics"></div>
          <div className="inner-content">
            <div className="top-row">
              <div className="bubbles">
                {contributors.map((contributor, index) => (
                  <Bubble
                    profileImg={contributor.profileImg}
                    alt={contributor.name}
                    profileUrl={contributor.profileUrl}
                    key={index}
                  ></Bubble>
                ))}
              </div>
              <div className="spatula-count" data-tip="Percent Decompiled">
                <Counter type="spatula" count={spatulaCount}></Counter>
              </div>
              <div
                className="shiny-count"
                data-tip="Lines of Assembly Decompiled"
              >
                <Counter type="shiny" count={shinyCount}></Counter>
              </div>
            </div>
            <div className="menu-body">
              <SpatulaSelector spatulaCount={spatulaCount}></SpatulaSelector>
            </div>
            <div className="bottom-row">
              <div className="collectable-count" data-tip="Files Decompiled">
                <Counter
                  type="collectable"
                  count={collectableCount}
                  total={collectableTotal}
                ></Counter>
              </div>
              <div className="sock-count" data-tip="Function Count">
                <Counter type="sock" count={sockCount}></Counter>
              </div>
            </div>
            <div className="info-texts">
              <div id="commits">
                <InfoText amount={commitCount} color="#ba2c2f">
                  total commits
                </InfoText>
              </div>
              <div id="contribs">
                <InfoText amount={contributorCount} color="#118ed2">
                  total contributors
                </InfoText>
              </div>
              <div id="pullreqs">
                <InfoText amount={pullRequestCount} color="#1c911f">
                  active pull requests
                </InfoText>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
