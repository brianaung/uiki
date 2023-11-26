import { useQuery } from "react-query";
import { Link, useLocation } from "wouter";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import { PageTemplate } from "./page-template";
import { Page } from "../@types/types";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

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

  const { user, login, logout } = useAuthContext();
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <PageTemplate
      children={
        <>
          <h2>Welcome.</h2>
          <button onClick={() => setLocation("/new")}>create new page</button>
          <button onClick={() => login()}>login</button>
          <button onClick={() => logout()}>logout</button>
          <ul>
            {isLoading ? (
              <Loading />
            ) : error ? (
              <Error />
            ) : data ? (
              data.map((v, idx) => (
                <li key={idx}>
                  <Link href={`/view/${encodeURIComponent(v.title)}`}>
                    {v.title}
                  </Link>
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
