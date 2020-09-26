import React, { Suspense, lazy } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

const PayloadScreen = lazy(() => import("./screens/PayloadScreen/Payload"));

const HistoryScreen = lazy(() => import("./screens/HistoryScreen/History"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/history" exact component={HistoryScreen} />
          <Route path="/payloads" exact component={PayloadScreen} />
          <Redirect from="/" to="/payloads" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
