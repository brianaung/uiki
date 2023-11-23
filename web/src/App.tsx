import { Route } from "wouter";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("./pages/landing-page"));
const ViewPage = lazy(() => import("./pages/view-page"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Route path="/" component={LandingPage} />
      <Route path="/view/:title" component={ViewPage} />
    </Suspense>
  );
}

export default App;
