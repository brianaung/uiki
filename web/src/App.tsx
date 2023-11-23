import { Route } from "wouter";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const LandingPage = lazy(() => import("./pages/landing-page"));
const ViewPage = lazy(() => import("./pages/view-page"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QueryClientProvider client={queryClient}>
        <Route path="/" component={LandingPage} />
        <Route path="/view/:title" component={ViewPage} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
