import { Form } from "../components/form-dialog";
import { useLocation } from "wouter";
import { usePageFormMutation } from "../hooks/usePageFormMutation";

const CreatePage = () => {
  const [_, setLocation] = useLocation();

  /* handle save form */
  const mutation = usePageFormMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

  return (
    <Form
      title="Creating New Page"
      onSubmit={handleSubmit}
      onCancel={() => setLocation("/")}
    />
  );
};

export default CreatePage;
