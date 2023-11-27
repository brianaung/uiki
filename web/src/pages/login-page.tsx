import { useMutation } from "react-query";
import { useAuthContext } from "../hooks/useAuthContext";

const LoginPage = () => {
  const auth = useAuthContext();

  /* handle edit and save form */
  const mutation = useMutation({
    mutationFn: async (formData: FormData) =>
      await fetch(`${import.meta.env.VITE_UIKI_SERVER_URL}/login`, {
        method: "POST",
        body: formData,
      }),
    onSuccess: async (res) => console.log(await res.text()),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    mutation.mutate(new FormData(e.currentTarget));
  };

  return (
    <>
      <section>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input name="username" />
          </div>
          <div>
            <input name="password" />
          </div>
          <div>
            <input type="submit" value="Save" />
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
