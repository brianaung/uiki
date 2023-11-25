import { useQuery } from "react-query";
import { Link, useLocation } from "wouter";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import { PageTemplate } from "./page-template";
import { Page } from "../@types/types";

// TODO: handle errors gracefully (across the whole app)
const LandingPage = () => {
  const [_, setLocation] = useLocation();

  /* query all pages data initially */
  const { isLoading, error, data } = useQuery({
    queryKey: ["allPagesData"],
    queryFn: async (): Promise<Page[]> =>
      await fetch(import.meta.env.VITE_UIKI_SERVER_URL).then(
        async (res) => await res.json(),
      ),
  });

  return (
    <PageTemplate
      children={
        <>
          <h2>Welcome.</h2>
          <button onClick={() => setLocation("/new")}>create new page</button>
          <ul>
            {isLoading ? (
              <Loading />
            ) : error ? (
              <Error />
            ) : data ? (
              data.map((v, idx) => (
                <li key={idx}>
                  <Link href={`/view/${v.title}`}>{v.title}</Link>
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </>
      }
    />
  );
};

export default LandingPage;
