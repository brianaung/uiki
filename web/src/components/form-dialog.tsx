import { Page } from "../@types/types";
import { useState } from "react";

export const Form = ({
  title,
  data,
  onSubmit,
  onCancel,
}: {
  title: string;
  data?: Page;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) => {
  const [titleValue, setTitleValue] = useState(data?.title ?? "");
  const [bodyValue, setBodyValue] = useState(data?.body ?? "");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitleValue(e.target.value);
    if (e.target.value !== "" && bodyValue !== "") {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyValue(e.target.value);
    if (e.target.value !== "" && titleValue !== "") {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  return (
    <section>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <div>
          <textarea
            name="title"
            defaultValue={data?.title ?? ""}
            rows={1}
            cols={80}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <textarea
            name="body"
            defaultValue={data?.body ?? ""}
            rows={20}
            cols={80}
            onChange={handleBodyChange}
          />
        </div>
        <div>
          <input type="submit" value="Save" disabled={isSubmitDisabled} />
          <button onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </section>
  );
};
