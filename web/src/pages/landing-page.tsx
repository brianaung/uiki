import { useMutation, useQuery } from "react-query";
import { Link, useLocation } from "wouter";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import { PageTemplate } from "./page-template";
import { Page } from "../@types/types";
import { useState } from "react";
import { FormDialog } from "../components/form-dialog";

const LandingPage = () => {
  /* query all pages data initially */
  const fetchAllPagesData = async (): Promise<Page[]> =>
    await fetch(import.meta.env.VITE_UIKI_SERVER_URL).then(
      async (res) => await res.json(),
    );
  const { isLoading, error, data } = useQuery(
    "allPagesData",
    fetchAllPagesData,
  );

  /* handling new page creation */
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [_, setLocation] = useLocation();
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await fetch(`${import.meta.env.VITE_UIKI_SERVER_URL}/save`, {
        method: "POST",
        body: formData,
      });
      // return title here so it can be accessed inside onSuccess
      return formData.get("title");
    },
    onSuccess: (title) => {
      setLocation(`/view/${title}`);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // prepare formdata and then mutate
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

  return (
    <PageTemplate
      children={
        <>
          <h2>Welcome.</h2>
          <button onClick={() => setIsFormOpen(!isFormOpen)}>new</button>
          <FormDialog
            title="Creating new page."
            isOpen={isFormOpen}
            setIsOpen={setIsFormOpen}
            onSubmit={handleSubmit}
          />
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
