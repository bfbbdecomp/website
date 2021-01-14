import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./app";
import Progress from "./progress/progress";
import FAQ from "./faq/faq";

// Router Switch renders the first page which matches
// the current url, therefore the default page must be last.
const page = (
  <Router>
    <Switch>
      {/* <Route path="/menu">
        <App page={Menu} />
      </Route> */}
      <Route path="/progress">
        <App page={Progress} />
      </Route>
      <Route path="/faq">
        <App page={FAQ} />
      </Route>
      <Route path="/">
        <App page={Progress} />
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(page, document.querySelector("#app"));
