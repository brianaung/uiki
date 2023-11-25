import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "wouter";
import { Loading } from "../components/loading";
import { Error as ErrorMessage } from "../components/error";
import { Dialog } from "@headlessui/react";
import { PageTemplate } from "./page-template";
import { Page } from "../@types/types";
import { useHistory } from "../hooks/useHistory";

const ViewPage = () => {
  const params = useParams();
  const [_, setLocation] = useHistory();

  /* query initial page data */
  const { isLoading, error, data } = useQuery({
    queryKey: ["pageData", encodeURIComponent(params.title as string)],
    queryFn: async ({ queryKey }): Promise<Page> =>
      await fetch(
        `${import.meta.env.VITE_UIKI_SERVER_URL}/view/${queryKey[1]}`,
      ).then(async (res) => await res.json()),
  });

  /* handle delete */
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const deletion = useMutation({
    mutationFn: async () =>
      await fetch(
        `${import.meta.env.VITE_UIKI_SERVER_URL}/delete/${encodeURIComponent(
          params.title as string,
        )}`,
      ).then(async (res) => {
        if (!res.ok) {
          throw new Error(await res.text());
        }
      }),
    onSuccess: () => setLocation("/"), // return home on success
    onError: (err) => alert(err),
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
            <ErrorMessage />
          ) : data ? (
            <article>
              <button
                onClick={() =>
                  setLocation(`/edit/${encodeURIComponent(data.title)}`, data)
                }
              >
                edit
              </button>
              <button onClick={() => setIsDeleteOpen(!isDeleteOpen)}>
                delete
              </button>
              <h2>{data.title}</h2>
              <p>{data.body}</p>
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
