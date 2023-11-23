import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useParams } from "wouter";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import { Dialog } from "@headlessui/react";
import { PageTemplate } from "./page-template";

type Page = {
  title: string;
  body: string;
};

const ViewPage = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [_, setLocation] = useLocation();

  /* query initial page data */
  const { isLoading, error, data } = useQuery({
    queryKey: ["pageData", params.title],
    queryFn: async ({ queryKey }): Promise<Page> =>
      await fetch(
        `${import.meta.env.VITE_UIKI_SERVER_URL}/view/${queryKey[1]}`,
      ).then(async (res) => await res.json()),
  });

  /* handle edit and save form */
  let [isOpen, setIsOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await fetch(`${import.meta.env.VITE_UIKI_SERVER_URL}/save`, {
        method: "POST",
        body: formData,
      });
      return formData.get("title");
    },
    onSuccess: (title) => {
      if (title !== params.title) {
        // if page title is updated, reroute
        setLocation(`/view/${title}`);
      } else {
        // else, refetch page data by invalidating
        queryClient.invalidateQueries({ queryKey: ["pageData", params.title] });
      }
      setIsOpen(false);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    if (params.title) {
      formData.append("oldTitle", params.title);
    }
    mutation.mutate(formData);
  };

  /* handle delete */
  const deletion = useMutation({
    mutationFn: async () =>
      await fetch(
        `${import.meta.env.VITE_UIKI_SERVER_URL}/delete/${params.title}`,
      ),
    onSuccess: () => setLocation("/"), // return home on success
  });

  return (
    <PageTemplate
      children={
        <>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Error />
          ) : data ? (
            <article>
              <button onClick={() => setIsOpen(!isOpen)}>edit</button>
              <button onClick={() => deletion.mutate()}>delete</button>
              <h2>{data.title}</h2>
              <p>{data.body}</p>
              <Form
                data={data}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onSubmit={handleSubmit}
              />
            </article>
          ) : (
            <></>
          )}
        </>
      }
    />
  );
};

const Form = ({
  data,
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  data: Page;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>Editing {data.title}</Dialog.Title>
        <form onSubmit={onSubmit}>
          <div>
            <textarea
              name="title"
              defaultValue={data.title}
              rows={1}
              cols={80}
            />
          </div>
          <div>
            <textarea
              name="body"
              defaultValue={data.body}
              rows={20}
              cols={80}
            />
          </div>
          <div>
            <input type="submit" value="Save" />
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ViewPage;
