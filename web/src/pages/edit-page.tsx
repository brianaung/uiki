import { Form } from "../components/form-dialog";
import { useParams } from "wouter";
import { useHistory } from "../hooks/useHistory";
import { usePageFormMutation } from "../hooks/usePageFormMutation";

const EditPage = () => {
  const params = useParams();
  const [_, setLocation, data] = useHistory();

  /* handle edit and save form */
  const mutation = usePageFormMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // prepare formdata and then mutate
    const formData = new FormData(e.currentTarget);
    if (params.title) {
      formData.append("oldTitle", params.title);
    }
    mutation.mutate(formData);
  };

  return (
    <Form
      title="Editing Page"
      onSubmit={handleSubmit}
      onCancel={() =>
        setLocation(`/view/${encodeURIComponent(params.title as string)}`)
      }
      data={data}
    />
  );
};

export default EditPage;
