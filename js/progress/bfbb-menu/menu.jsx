import React from "react";
import "./menu.css";

import Bubble from "./menu-components/bubbles/basebubble";
import Counter from "./menu-components/counter/counter"
import AreaSelector from "./menu-components/area-selector/area-selector"
import SpatulaSelector from "./menu-components/spatula-selector/spatula-selector"

export default class Menu extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="menu">
          <div class="caustics"></div>
          <div class="inner-content">
            <div class="top-row">
              <div class="bubbles">
                <Bubble class="bubble" profileImg="https://github.com/identicons/pslehisl.png"></Bubble>
                <Bubble class="bubble" profileImg="https://avatars0.githubusercontent.com/u/5638426?s=460&u=1c4a9f676e848e4edc7da2832c35d3d99bedc780&v=4"></Bubble>
                <Bubble class="bubble" profileImg="https://avatars2.githubusercontent.com/u/2074518?s=460&u=997bb336a3890e3b0e33b61913e4cd17d7bd55a5&v=4"></Bubble>
                <Bubble class="bubble" profileImg="https://avatars2.githubusercontent.com/u/15368682?s=460&u=b0cc63f5bf5bc25b5637c32c7cbc2dbf8f95af08&v=4"></Bubble>
                <Bubble class="bubble" profileImg="https://avatars0.githubusercontent.com/u/22335998?s=460&u=f5cf38fa26e2a66eb662b111f554a4b9d2624dc0&v=4"></Bubble>
              </div>
              <div class="spatula-count">
                <Counter type='spatula' count={5}></Counter>
              </div>
              <div class="shiny-count">
                <Counter type='shiny' count={174}></Counter>
              </div>
            </div>
            <div class="menu-body">
              <AreaSelector></AreaSelector>
              <SpatulaSelector></SpatulaSelector>
            </div>
            <div class="bottom-row">
              <div class="sock-count">
                <Counter type='sock' count={2}></Counter>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
