import { useQuery } from "react-query";
import { Link } from "wouter";
import { Loading } from "../components/loading";
import { Error } from "../components/error";

type Page = {
  title: string;
  body: string;
};

const LandingPage = () => {
  const fetchAllPagesData = async (): Promise<Page[]> =>
    await fetch(`http://localhost:4000`).then(async (res) => await res.json());

  const { isLoading, error, data } = useQuery(
    "allPagesData",
    fetchAllPagesData,
  );

  return (
    <>
      <h2>This is the landing page.</h2>
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
  );
};

export default LandingPage;
