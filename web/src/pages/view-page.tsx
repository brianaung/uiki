import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useParams } from "wouter";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import { Dialog } from "@headlessui/react";
import { PageTemplate } from "./page-template";
import { Page } from "../@types/types";

const ViewPage = () => {
  const params = useParams();
  const [_, setLocation] = useLocation();
  const queryClient = useQueryClient();

  /* query initial page data */
  const { isLoading, error, data } = useQuery({
    queryKey: ["pageData", params.title],
    queryFn: async ({ queryKey }): Promise<Page> =>
      await fetch(
        `${import.meta.env.VITE_UIKI_SERVER_URL}/view/${queryKey[1]}`,
      ).then(async (res) => await res.json()),
  });

  /* handle edit and save form */
  let [isFormOpen, setIsFormOpen] = useState(false);
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
      setIsFormOpen(false);
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
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const deletion = useMutation({
    mutationFn: async () =>
      await fetch(
        `${import.meta.env.VITE_UIKI_SERVER_URL}/delete/${params.title}`,
      ),
    onSuccess: () => setLocation("/"), // return home on success
  });
  const handleDelete = () => {
    deletion.mutate();
  };

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
              <button onClick={() => setIsFormOpen(!isFormOpen)}>edit</button>
              <button onClick={() => setIsDeleteOpen(!isDeleteOpen)}>
                delete
              </button>
              <h2>{data.title}</h2>
              <p>{data.body}</p>
              <FormDialog
                data={data}
                isOpen={isFormOpen}
                setIsOpen={setIsFormOpen}
                onSubmit={handleSubmit}
              />
              <DeleteDialog
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
                handleDelete={handleDelete}
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

const FormDialog = ({
  data,
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  data: Page;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => (
  <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
    <Dialog.Panel>
      <Dialog.Title>Editing {data.title}</Dialog.Title>
      <form onSubmit={onSubmit}>
        <div>
          <textarea name="title" defaultValue={data.title} rows={1} cols={80} />
        </div>
        <div>
          <textarea name="body" defaultValue={data.body} rows={20} cols={80} />
        </div>
        <div>
          <input type="submit" value="Save" />
        </div>
      </form>
    </Dialog.Panel>
  </Dialog>
);

const DeleteDialog = ({
  isOpen,
  setIsOpen,
  handleDelete,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}) => (
  <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
    <Dialog.Panel>
      <Dialog.Title>Delete page</Dialog.Title>
      <Dialog.Description>
        This will permanently delete this page.
      </Dialog.Description>

      <p>
        Are you sure you want to delete this page? All of your data will be
        permanently removed. This action cannot be undone.
      </p>

      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
    </Dialog.Panel>
  </Dialog>
);

export default ViewPage;
