import { Dialog } from "@headlessui/react";
import { Page } from "../@types/types";

export const FormDialog = ({
  title,
  data,
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  title: string;
  data?: Page;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => (
  <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
    <Dialog.Panel>
      <Dialog.Title>{title}</Dialog.Title>
      <form onSubmit={onSubmit}>
        <div>
          <textarea
            name="title"
            defaultValue={data?.title ?? ""}
            rows={1}
            cols={80}
          />
        </div>
        <div>
          <textarea
            name="body"
            defaultValue={data?.body ?? ""}
            rows={20}
            cols={80}
          />
        </div>
        <div>
          <input type="submit" value="Save" />
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </form>
    </Dialog.Panel>
  </Dialog>
);
