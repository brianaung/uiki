import { Route, Switch } from "wouter";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const LoginPage = lazy(() => import("./pages/login-page"));
const LandingPage = lazy(() => import("./pages/landing-page"));
const ViewPage = lazy(() => import("./pages/view-page"));
const EditPage = lazy(() => import("./pages/edit-page"));
const CreatePage = lazy(() => import("./pages/create-page"));

function App() {
  return (
    <Switch>
      <Suspense fallback={<p>Loading...</p>}>
        <QueryClientProvider client={queryClient}>
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />

          <Route path="/new" component={CreatePage} />
          <Route path="/view/:title" component={ViewPage} />
          <Route path="/edit/:title" component={EditPage} />
        </QueryClientProvider>
      </Suspense>
    </Switch>
  );
}

export default App;
