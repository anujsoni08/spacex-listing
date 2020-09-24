import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const PayloadScreen = lazy(() => import("./screens/PayloadScreen/Payload"));

const HistoryScreen = lazy(() => import("./screens/HistoryScreen/History"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/history" component={HistoryScreen} exact />
        <Route path="/payloads" component={PayloadScreen} exact />
        <Redirect from="*" to="/payloads" />
      </Switch>
    </Suspense>
  );
}

export default App;
