import { useQuery } from "react-query";
import { useParams } from "wouter";
import { Loading } from "../components/loading";
import { Error } from "../components/error";

type Page = {
  title: string;
  body: string;
};

const ViewPage = () => {
  const params = useParams();

  const fetchPageData = async (): Promise<Page> =>
    await fetch(`http://localhost:4000/view/${params.title}`).then(
      async (res) => await res.json(),
    );

  const { isLoading, error, data } = useQuery("pageData", fetchPageData);

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : data ? (
        <article>
          <button onClick={handleEdit}>edit</button>
          <button onClick={handleDelete}>delete</button>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </article>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewPage;
